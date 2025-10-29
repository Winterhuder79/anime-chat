import type { Metadata } from "next";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";

export const metadata: Metadata = {
  title: "Demon Slayer Chat - Interaktive Story",
  description: "Erlebe eine interaktive Story im Demon Slayer Universum. Wähle deinen Charakter und tauche ein!",
  manifest: "/manifest.json",
  themeColor: "#0a0a0a",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased bg-black text-white">
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
