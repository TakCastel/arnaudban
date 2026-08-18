import type { Metadata } from "next";
import { Raleway, Antonio } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import SkipToMain from "@/components/SkipToMain";
import ScrollToAnchor from "@/components/ScrollToAnchor";
import PassiveEventsInit from "@/components/PassiveEventsInit";
import DuotoneFilters from "@/components/DuotoneFilters";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway",
  display: "swap",
});

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-antonio",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arnaud Ban - Réalisateur & Monteur Vidéo",
  description:
    "Découvrez Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon. Contactez-le pour vos projets audiovisuels.",
  keywords: [
    "réalisateur",
    "monteur",
    "étalonnage",
    "vidéo",
    "Avignon",
    "audiovisuel",
  ],
  authors: [{ name: "Arnaud Ban" }],
  creator: "Arnaud Ban",
  publisher: "Arnaud Ban",
  icons: {
    // app/favicon.ico (convention Next.js) est déjà servi automatiquement sur
    // /favicon.ico ; on ne le redéclare pas ici pour éviter le conflit de route
    // avec public/favicon.ico (voir suppression de ce fichier ci-dessous).
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://arnaudban.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://arnaudban.fr",
    title: "Arnaud Ban | Réalisateur & Monteur Vidéo",
    description:
      "Découvrez Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon.",
    siteName: "Arnaud Ban",
    images: [
      {
        url: "https://arnaudban.fr/screen-arnaudban.png",
        width: 1200,
        height: 630,
        alt: "Arnaud Ban - Réalisateur & Monteur Vidéo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arnaud Ban | Réalisateur & Monteur Vidéo",
    description:
      "Découvrez Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon.",
    images: ["https://arnaudban.fr/screen-arnaudban.png"],
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
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arnaud Ban",
  jobTitle: "Réalisateur et monteur vidéo",
  url: "https://arnaudban.fr",
  image: "https://arnaudban.fr/screen-arnaudban.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Avignon",
    addressRegion: "Vaucluse",
    addressCountry: "FR",
  },
  knowsAbout: ["Montage vidéo", "Étalonnage", "Réalisation audiovisuelle"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr-FR" className={`${raleway.variable} ${antonio.variable}`}>
      <head>
        {/* Applique le thème sauvegardé avant le premier paint, pour éviter un flash
            visuel sans avoir à bloquer le rendu serveur du reste de la page (voir
            ThemeProvider.tsx : il ne gate plus le rendu sur "mounted"). */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <DuotoneFilters />
        <ThemeProvider>
          <SkipToMain />
          <Header />
          <ScrollToAnchor />
          <PassiveEventsInit />
          <main className="pt-20 flex-grow" role="main" tabIndex={-1}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}