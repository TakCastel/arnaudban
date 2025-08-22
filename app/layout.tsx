import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const moderat = localFont({
  src: [{ path: "../public/fonts/Moderat-Regular.woff2", style: "normal" }],
  variable: "--font-moderat",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Arnaud Ban - Réalisateur & Monteur Vidéo | Avignon",
    template: "%s | Arnaud Ban"
  },
  description: "Portfolio d'Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon. Découvrez ses projets de court-métrage, clips musicaux et productions audiovisuelles.",
  keywords: [
    "Arnaud Ban",
    "réalisateur",
    "monteur vidéo",
    "étalonnage",
    "Avignon",
    "court-métrage",
    "clip musical",
    "production audiovisuelle",
    "cinéma",
    "vidéo"
  ],
  authors: [{ name: "Arnaud Ban" }],
  creator: "Arnaud Ban",
  publisher: "Arnaud Ban",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://arnaudban.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://arnaudban.com',
    title: 'Arnaud Ban - Réalisateur & Monteur Vidéo | Avignon',
    description: 'Portfolio d\'Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon.',
    siteName: 'Arnaud Ban',
    images: [
      {
        url: '/assets/DOUG.png',
        width: 1200,
        height: 630,
        alt: 'Arnaud Ban - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arnaud Ban - Réalisateur & Monteur Vidéo | Avignon',
    description: 'Portfolio d\'Arnaud Ban, réalisateur indépendant spécialisé en montage et étalonnage vidéo à Avignon.',
    images: ['/assets/DOUG.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-background text-text">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${moderat.variable} font-sans`}>
        {/* Lien de saut pour l'accessibilité */}
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        
        <Header />
        <div id="main-content">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
