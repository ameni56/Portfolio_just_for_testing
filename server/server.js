
const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://ameni56.github.io"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));
//test
app.use(express.json({ limit: "10kb" }));

// Vérifier que le serveur fonctionne.
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API opérationnelle" });
});

// Connexion à Gmail.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Recevoir le formulaire et envoyer l'email.
app.post("/api/contact", async (req, res) => {
  try {
    const { nom, email, message } = req.body;

    // Validation côté serveur.
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

    await transporter.sendMail({
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

    return res.status(200).json({
      success: true,
      message: "Ton message a bien été envoyé !"
    });
  } catch (error) {
    console.error("Erreur complète d'envoi :", error);

    return res.status(500).json({
      success: false,
      message: "Impossible d'envoyer le message. Réessaie plus tard."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
