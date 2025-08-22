import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Link from "next/link";

const moderat = localFont({
  src: [{ path: "../public/fonts/Moderat-Regular.woff2", style: "normal" }],
  variable: "--font-moderat",
  display: "swap",
});

export const metadata = { title: "Arnaud Ban", description: "Portfolio" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-background text-text">
      <body className={`${moderat.variable} font-sans`}>
        <Header />
        {children}

        {/* FOOTER */}
        <footer className="w-full bg-background mt-0 py-8 md:py-16 relative z-30">
          <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-128px)] mx-auto">
            <div className="bg-text text-background rounded-2xl overflow-hidden px-4 md:px-8 py-8 md:py-16">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-5xl font-bold mb-16 tracking-tight">À PROPOS</h2>

                <div className="space-y-8 text-xl leading-relaxed">
                  <p className="text-2xl">
                    Salut ! Je m&apos;appelle <span className="font-bold">Arnaud Ban</span> et je suis un réalisateur indépendant qui travaille sur Avignon.
                  </p>

                  <p className="text-xl">
                    Mes spécialités sont le <span className="font-semibold">montage</span> et l&apos;<span className="font-semibold">étalonnage</span>.
                  </p>

                  <p className="text-lg">
                    Pour toute demande professionnelle, merci de me contacter par mail :{' '}
                    <a
                      href="mailto:ban.arnaud@outlook.fr"
                      className="font-medium hover:underline transition-colors duration-300"
                    >
                      ban.arnaud@outlook.fr
                    </a>
                  </p>
                </div>

                {/* Mentions légales */}
                <div className="mt-16 pt-8 border-t border-background/20">
                  <p className="text-sm text-background/70 text-center">
                    <Link
                      href="/mentions-legales"
                      className="hover:underline transition-colors duration-300"
                    >
                      Mentions légales
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
