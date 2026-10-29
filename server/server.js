
const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// 1. Configuration CORS
app.use(cors({
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://ameni56.github.io"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json({ limit: "10kb" }));

// 2. Vérifier le démarrage du serveur
console.log("=== DÉMARRAGE DU SERVEUR ===");
console.log("PORT défini :", process.env.PORT || 3000);
console.log("GMAIL_USER présent :", Boolean(process.env.GMAIL_USER));
console.log(
  "GMAIL_APP_PASSWORD présent :",
  Boolean(process.env.GMAIL_APP_PASSWORD)
);
console.log(
  "CONTACT_RECEIVER présent :",
  Boolean(process.env.CONTACT_RECEIVER)
);

// 3. Vérifier que l'API fonctionne
app.get("/api/health", (req, res) => {
  console.log("[HEALTH] Requête reçue");

  res.json({
    success: true,
    message: "API opérationnelle"
  });
});

// 4. Configuration Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// 5. Tester la connexion SMTP au démarrage
transporter.verify()
  .then(() => {
    console.log("[SMTP] Connexion Gmail réussie.");
  })
  .catch((error) => {
    console.error("[SMTP] ÉCHEC DE CONNEXION");
    console.error("Nom :", error.name);
    console.error("Code :", error.code);
    console.error("Commande :", error.command);
    console.error("Réponse SMTP :", error.response);
    console.error("Message :", error.message);
  });

// 6. Réception du formulaire
app.post("/api/contact", async (req, res) => {
  console.log("\n========== NOUVELLE SOUMISSION ==========");
  console.log("[1] Requête POST /api/contact reçue");
  console.log("Origine :", req.headers.origin);
  console.log("Corps reçu :", {
    nomPresent: typeof req.body?.nom === "string",
    emailPresent: typeof req.body?.email === "string",
    messagePresent: typeof req.body?.message === "string"
  });

  try {
    // 7. Validation des champs
    const { nom, email, message } = req.body || {};

    if (
      typeof nom !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !nom.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      console.error("[2] ÉCHEC : champs manquants ou invalides");

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
      console.error("[2] ÉCHEC : format ou longueur invalide");

      return res.status(400).json({
        success: false,
        message: "Les données du formulaire sont invalides."
      });
    }

    console.log("[2] Validation réussie");

    // 8. Vérifier la configuration, sans afficher les secrets
    if (
      !process.env.GMAIL_USER ||
      !process.env.GMAIL_APP_PASSWORD ||
      !process.env.CONTACT_RECEIVER
    ) {
      console.error("[3] ÉCHEC : variable d'environnement manquante");

      return res.status(500).json({
        success: false,
        message: "Configuration du serveur incomplète."
      });
    }

    console.log("[3] Variables d'environnement présentes");
    console.log("[4] Début de l'envoi Gmail...");

    // 9. Envoyer l'e-mail
    const info = await transporter.sendMail({
      from: `"Portfolio Ameni" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: cleanEmail,
      subject: `Nouveau message du portfolio : ${cleanNom}`,
      text: [
        `Nom : ${cleanNom}`,
        `Email : ${cleanEmail}`,
        "",
        "Message :",
        cleanMessage
      ].join("\n")
    });

    console.log("[5] E-MAIL ENVOYÉ");
    console.log("Message ID :", info.messageId);
    console.log("Acceptés :", info.accepted);
    console.log("Refusés :", info.rejected);

    return res.status(200).json({
      success: true,
      message: "Ton message a bien été envoyé !"
    });

  } catch (error) {
    // 10. Diagnostic détaillé
    console.error("\n========== ERREUR D'ENVOI ==========");
    console.error("Nom :", error.name);
    console.error("Code :", error.code);
    console.error("Commande SMTP :", error.command);
    console.error("Réponse SMTP :", error.response);
    console.error("Code de réponse SMTP :", error.responseCode);
    console.error("Message :", error.message);
    console.error("Stack :", error.stack);
    console.error("====================================");

    return res.status(500).json({
      success: false,
      message: "Impossible d'envoyer le message. Réessaie plus tard."
    });
  }
});

// 11. Gestion des erreurs JSON
app.use((error, req, res, next) => {
  console.error("[ERREUR EXPRESS]", error.message);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(400).json({
    success: false,
    message: "Requête invalide."
  });
});

// 12. Démarrage
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
