"use client";

import { useState } from "react";

const fieldClass =
  "w-full bg-background text-foreground border border-foreground/30 focus:border-foreground px-4 py-3 text-base placeholder:text-foreground/40 transition-colors duration-300";

const linkClass =
  "font-mono font-bold hover:text-foreground/80 transition-colors duration-300 text-foreground underline decoration-2 underline-offset-4 hover:decoration-4";

type Status = "idle" | "loading" | "success" | "error";

// L'URL de l'API est vide en preview GitHub Pages (pas de backend là-bas,
// voir next.config.js) : dans ce cas on affiche directement le lien mailto
// de secours plutôt qu'un formulaire qui ne pourrait jamais aboutir.
const contactApiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL || "";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!contactApiUrl) {
    return (
      <div className="border border-foreground p-8 md:p-10">
        <p className="text-lg text-foreground/70 mb-4">
          Le formulaire n&apos;est pas disponible sur cette préversion.
          Écrivez-moi directement par mail :
        </p>
        <a
          href="mailto:ban.arnaud@outlook.fr"
          className={linkClass}
          aria-label="Envoyer un email à ban.arnaud@outlook.fr"
        >
          ban.arnaud@outlook.fr
        </a>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot : champ caché (voir JSX) que seuls les bots remplissent.
    const company = data.get("company");

    try {
      const res = await fetch(contactApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company,
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(body.error || "Une erreur est survenue, réessayez plus tard.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Impossible de contacter le serveur, réessayez plus tard.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-foreground p-8 md:p-10">
        <p className="text-xl text-foreground">
          Message envoyé, merci ! Je vous réponds au plus vite par mail.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-semibold uppercase tracking-wide text-foreground/60 mb-2">
          Nom
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          className={fieldClass}
          placeholder="Votre nom"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-wide text-foreground/60 mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          className={fieldClass}
          placeholder="vous@exemple.fr"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold uppercase tracking-wide text-foreground/60 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className={`${fieldClass} resize-y`}
          placeholder="Parlez-moi de votre projet…"
        />
      </div>

      {/* Honeypot anti-spam : caché visuellement et du clavier/lecteur
          d'écran, un humain ne le remplit jamais. Voir server/index.js. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Ne pas remplir ce champ</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-foreground bg-background border border-foreground hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Envoi…" : "Envoyer le message"}
      </button>
    </form>
  );
}
