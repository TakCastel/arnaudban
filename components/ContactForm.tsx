"use client";

import { useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    hcaptcha?: {
      render: (
        container: HTMLElement,
        params: { sitekey: string; callback?: () => void; "expired-callback"?: () => void }
      ) => string;
      getResponse: (widgetId?: string) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

// Le formulaire est un clap : fond en couleur de texte, texte en couleur de
// fond (bleu/beige en clair, beige/noir en sombre — un clap noir ou blanc,
// comme sur un plateau). Champs soulignés seulement, sans cadre. Le contour
// de focus global est en --foreground, donc invisible sur ce fond : on le
// repasse en --background pour garder un focus clavier lisible.
const fieldClass =
  "w-full bg-transparent text-background border-0 border-b border-background/50 focus:border-background rounded-none px-0 py-2 text-xl md:text-2xl placeholder:text-background/40 focus-visible:outline-background focus-visible:outline-offset-4 transition-colors duration-300";

const labelClass =
  "flex items-baseline gap-3 font-heading uppercase tracking-[0.2em] text-xs md:text-sm mb-3";

const linkClass =
  "underline decoration-1 underline-offset-[0.14em] hover:decoration-2 focus-visible:outline-background";

// Bandes du clap : un dégradé répété plutôt qu'une image, il prend la
// couleur du texte (currentColor) et suit donc le thème.
const clapperStripes = {
  backgroundImage:
    "repeating-linear-gradient(-55deg, currentColor 0 26px, transparent 26px 52px)",
};

/** Coque du clap : bandes en haut, puis le contenu sur l'ardoise. */
function Slate({ children, take }: { children: React.ReactNode; take?: number }) {
  return (
    <div className="bg-foreground text-background">
      <div aria-hidden="true" className="h-8 md:h-12" style={clapperStripes} />
      {/* Ligne d'en-tête de l'ardoise : décor, masqué aux lecteurs d'écran. */}
      <div
        aria-hidden="true"
        className="grid grid-cols-2 border-y border-background/30 font-heading uppercase tracking-[0.2em] text-[0.65rem] md:text-xs"
      >
        <div className="px-4 md:px-8 py-3 md:py-4">
          <span className="opacity-60">Production</span>
          <span className="block text-2xl md:text-4xl tracking-tight mt-1">Votre film</span>
        </div>
        <div className="px-4 md:px-8 py-3 md:py-4 border-l border-background/30">
          <span className="opacity-60">Prise</span>
          <span className="block text-2xl md:text-4xl tracking-tight mt-1">
            {/* Le clap compte les essais à sa façon : la première est la
                bonne, les suivantes se rejouent. */}
            {(take ?? 1) > 1 ? "On la refait" : "La bonne"}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}

type Status = "idle" | "loading" | "success" | "error";

// L'URL de l'API est vide en preview GitHub Pages (pas de backend là-bas,
// voir next.config.js) : dans ce cas on affiche directement le lien mailto
// de secours plutôt qu'un formulaire qui ne pourrait jamais aboutir.
const contactApiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL || "";

// Vide tant qu'Arnaud n'a pas créé son site sur https://dashboard.hcaptcha.com
// (voir README.md) : dans ce cas le widget ne s'affiche pas et on ne bloque
// pas l'envoi dessus — seul le honeypot protège, comme avant. Vérifié une
// seconde fois côté serveur (voir server/index.js), le check client seul ne
// suffit jamais.
const hcaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const captchaContainerRef = useRef<HTMLDivElement>(null);
  const captchaWidgetId = useRef<string | undefined>(undefined);
  // Numéro de prise affiché sur le clap : +1 à chaque envoi. Purement
  // visuel, n'intervient pas dans l'envoi.
  const [take, setTake] = useState(1);
  const hasTried = useRef(false);

  if (!contactApiUrl) {
    return (
      <Slate>
        <div className="px-4 md:px-8 py-8 md:py-12">
          <p className="text-lg md:text-xl leading-relaxed opacity-80 mb-4 max-w-xl">
            Le formulaire n&apos;est pas disponible sur cette préversion.
            Écrivez-moi directement par mail :
          </p>
          <a
            href="mailto:ban.arnaud@outlook.fr"
            className={`${linkClass} text-2xl md:text-4xl [overflow-wrap:anywhere]`}
            aria-label="Envoyer un email à ban.arnaud@outlook.fr"
          >
            ban.arnaud@outlook.fr
          </a>
        </div>
      </Slate>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (hasTried.current) setTake((t) => t + 1);
    hasTried.current = true;
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot : champ caché (voir JSX) que seuls les bots remplissent.
    const company = data.get("company");

    const captchaToken = hcaptchaSiteKey
      ? window.hcaptcha?.getResponse(captchaWidgetId.current)
      : undefined;

    if (hcaptchaSiteKey && !captchaToken) {
      setStatus("error");
      setErrorMessage("Merci de valider la case de vérification avant d'envoyer.");
      return;
    }

    try {
      const res = await fetch(contactApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company,
          captchaToken,
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
    } finally {
      // Un token hCaptcha est à usage unique : on réinitialise le widget pour
      // permettre un nouvel essai, que l'envoi ait réussi ou échoué.
      window.hcaptcha?.reset(captchaWidgetId.current);
    }
  }

  if (status === "success") {
    return (
      <Slate take={take}>
        <div role="status" className="px-4 md:px-8 py-10 md:py-16">
          <p className="font-heading font-bold uppercase leading-[0.86] pt-[0.16em] tracking-tighter text-[12vw] md:text-[6vw]">
            Coupez&nbsp;!
          </p>
          <p className="mt-6 md:mt-8 text-xl md:text-2xl leading-snug max-w-xl">
            Message envoyé, merci ! Je vous réponds au plus vite par mail.
          </p>
        </div>
      </Slate>
    );
  }

  return (
    <Slate take={take}>
      <form onSubmit={handleSubmit} className="relative" noValidate>
        <div className="grid md:grid-cols-2">
          <div className="px-4 md:px-8 pt-6 md:pt-10 pb-6 md:pb-8">
            <label htmlFor="name" className={labelClass}>
              <span aria-hidden="true" className="opacity-60">Prod. —</span>
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

          <div className="px-4 md:px-8 pt-2 md:pt-10 pb-6 md:pb-8 md:border-l border-background/30">
            <label htmlFor="email" className={labelClass}>
              <span aria-hidden="true" className="opacity-60">Contact —</span>
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
        </div>

        <div className="px-4 md:px-8 pt-6 md:pt-8 pb-8 md:pb-10 border-t border-background/30">
          <label htmlFor="message" className={labelClass}>
            <span aria-hidden="true" className="opacity-60">Scène —</span>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            className={`${fieldClass} resize-y leading-snug`}
            placeholder="Parlez-moi de votre projet…"
          />
        </div>

        {/* Honeypot anti-spam : caché visuellement et du clavier/lecteur
            d'écran, un humain ne le remplit jamais. Voir server/index.js. */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="company">Ne pas remplir ce champ</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="px-4 md:px-8 py-6 md:py-8 border-t border-background/30 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-4 min-w-0">
            {hcaptchaSiteKey && (
              <>
                <Script
                  src="https://js.hcaptcha.com/1/api.js"
                  strategy="lazyOnload"
                  onReady={() => {
                    if (captchaContainerRef.current && captchaWidgetId.current === undefined) {
                      captchaWidgetId.current = window.hcaptcha?.render(captchaContainerRef.current, {
                        sitekey: hcaptchaSiteKey,
                      });
                    }
                  }}
                />
                <div ref={captchaContainerRef} />
              </>
            )}

            {status === "error" && (
              <p role="alert" className="text-base md:text-lg font-semibold max-w-md">
                <span aria-hidden="true" className="block font-heading font-normal uppercase tracking-[0.2em] text-xs mb-1 opacity-70">
                  Prise ratée
                </span>
                {errorMessage}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="group shrink-0 self-start md:self-auto inline-flex items-center gap-4 bg-background text-foreground px-6 py-4 font-heading font-bold uppercase tracking-[0.08em] text-2xl md:text-3xl focus-visible:outline-background focus-visible:outline-offset-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Envoi…" : "Envoyer le message"}
            <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-2">
              →
            </span>
          </button>
        </div>
      </form>
    </Slate>
  );
}
