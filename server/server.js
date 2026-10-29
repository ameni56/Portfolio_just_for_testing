
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "https://ameni56.github.io"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json({ limit: "10kb" }));

// Vérifier que l'API fonctionne.
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API opérationnelle"
  });
});

// Vérifier la configuration sans afficher les secrets.
console.log("=== DÉMARRAGE DU SERVEUR ===");
console.log("RESEND_API_KEY présente :", Boolean(process.env.RESEND_API_KEY));
console.log("CONTACT_RECEIVER présent :", Boolean(process.env.CONTACT_RECEIVER));

app.post("/api/contact", async (req, res) => {
  console.log("\n========== NOUVELLE SOUMISSION ==========");
  console.log("[1] Requête POST /api/contact reçue");

  try {
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_RECEIVER) {
      console.error("[CONFIG] RESEND_API_KEY ou CONTACT_RECEIVER manquante.");

      return res.status(500).json({
        success: false,
        message: "Configuration du serveur incomplète."
      });
    }

    const { nom, email, message } = req.body || {};

    if (
      typeof nom !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !nom.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont obligatoires."
      });
    }

    const cleanNom = nom.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (
      cleanNom.length > 100 ||
      cleanEmail.length > 254 ||
      cleanMessage.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Les données du formulaire sont invalides."
      });
    }

    console.log("[2] Validation réussie.");
    console.log("[3] Envoi via l'API HTTPS Resend...");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Portfolio Ameni <onboarding@resend.dev>",
        to: [process.env.CONTACT_RECEIVER],
        reply_to: cleanEmail,
        subject: `Nouveau message du portfolio : ${cleanNom}`,
        text: [
          `Nom : ${cleanNom}`,
          `Email : ${cleanEmail}`,
          "",
          "Message :",
          cleanMessage
        ].join("\n")
      }),
      signal: AbortSignal.timeout(20000)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("[RESEND] Échec de l'envoi :", {
        status: response.status,
        name: result.name,
        message: result.message
      });

      return res.status(502).json({
        success: false,
        message: "Le service d'envoi n'a pas accepté le message."
      });
    }

    console.log("[4] E-mail accepté par Resend.");
    console.log("Identifiant :", result.id);

    return res.status(200).json({
      success: true,
      message: "Ton message a bien été envoyé !"
    });
  } catch (error) {
    console.error("[ERREUR RESEND]", {
      name: error.name,
      code: error.code,
      message: error.message
    });

    return res.status(500).json({
      success: false,
      message: "Impossible d'envoyer le message. Réessaie plus tard."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
