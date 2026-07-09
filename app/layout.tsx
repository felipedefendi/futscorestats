import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://futscorestats.vercel.app"),
  title: {
    default: "FutScoreStats — Painel de Estatísticas de Futebol",
    template: "%s · FutScoreStats",
  },
  description:
    "Classificação, forma recente e estatísticas de times do Campeonato Brasileiro Série A, com dados reais via football-data.org. Projeto estatístico — sem odds ou apostas.",
  keywords: [
    "FutScoreStats",
    "estatísticas de futebol",
    "Brasileirão",
    "Campeonato Brasileiro",
    "classificação",
    "Next.js",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "FutScoreStats — Painel de Estatísticas de Futebol",
    description:
      "Classificação, forma recente e estatísticas de times do Campeonato Brasileiro Série A.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "FutScoreStats — Painel de Estatísticas de Futebol",
    description:
      "Classificação, forma recente e estatísticas de times do Campeonato Brasileiro Série A.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
