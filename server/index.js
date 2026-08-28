// Petit serveur Node autonome, dédié UNIQUEMENT au formulaire de contact
// (POST /api/contact). Le reste du site (arnaudban.fr) reste un export
// statique Next.js servi directement par nginx — voir README.md à la racine
// du repo et server/README.md pour le détail du déploiement (nginx fait un
// reverse proxy de /api/ vers ce process, qui n'écoute qu'en local).
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const app = express();

// Nginx est le seul reverse proxy devant ce process (voir server/README.md) :
// on lui fait confiance pour le premier hop afin que express-rate-limit
// s'appuie sur X-Forwarded-For plutôt que sur l'IP du proxy local.
app.set("trust proxy", 1);

app.use(express.json({ limit: "10kb" }));

const allowedOrigins = (process.env.ALLOWED_ORIGIN || "https://arnaudban.fr")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["POST", "GET"],
  })
);

// Anti-spam / anti-abus basique : 5 essais par IP toutes les 15 minutes.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de tentatives, réessayez plus tard." },
});

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // STARTTLS sur le port 587, pas de TLS implicite
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, message, company } = req.body || {};

  // Honeypot : champ invisible pour un humain, souvent rempli par les bots.
  // On répond succès sans rien envoyer, pour ne pas leur signaler le piège.
  if (company) {
    return res.status(200).json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.length > 100
  ) {
    return res.status(400).json({ error: "Nom invalide." });
  }
  if (!isValidEmail(email) || email.length > 200) {
    return res.status(400).json({ error: "Email invalide." });
  }
  if (
    typeof message !== "string" ||
    message.trim().length < 10 ||
    message.length > 5000
  ) {
    return res.status(400).json({ error: "Message invalide (10 à 5000 caractères)." });
  }

  try {
    await transporter.sendMail({
      from: `"Formulaire arnaudban.fr" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
      replyTo: `"${name}" <${email}>`,
      subject: `Nouveau message de ${name} via arnaudban.fr`,
      text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Échec d'envoi du mail de contact :", err);
    res.status(502).json({ error: "Échec de l'envoi, réessayez plus tard." });
  }
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Serveur de contact à l'écoute sur le port ${port}`);
});
