import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const moderat = localFont({
  src: [{ path: "../public/fonts/Moderat-Regular.woff2", style: "normal" }],
  variable: "--font-moderat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arnaud Ban - Réalisateur & Monteur Vidéo",
  description: "Découvrez Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon. Contactez-le pour vos projets audiovisuels.",
  keywords: ["réalisateur", "monteur", "étalonnage", "vidéo", "Avignon", "audiovisuel"],
  authors: [{ name: "Arnaud Ban" }],
  creator: "Arnaud Ban",
  publisher: "Arnaud Ban",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://arnaudban.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://arnaudban.com",
    title: "Arnaud Ban | Réalisateur & Monteur Vidéo",
    description: "Découvrez Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon.",
    siteName: "Arnaud Ban",
    images: [
      {
        url: "/assets/DOUG.png",
        width: 1200,
        height: 630,
        alt: "Arnaud Ban - Réalisateur & Monteur Vidéo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arnaud Ban | Réalisateur & Monteur Vidéo",
    description: "Découvrez Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon.",
    images: ["/assets/DOUG.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={moderat.variable}>
      <body className="min-h-screen bg-background text-foreground font-sans">
        <ThemeProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
