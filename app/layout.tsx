import "./globals.css";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import Header from "@/components/Header";

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
    <html lang="fr" suppressHydrationWarning>
      <body className={`${moderat.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
