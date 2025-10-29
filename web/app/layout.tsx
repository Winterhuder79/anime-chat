import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";

export const metadata: Metadata = {
  title: "Demon Slayer Chat - Interaktive Story",
  description: "Erlebe eine interaktive Story im Demon Slayer Universum. Wähle deinen Charakter und tauche ein!",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Demon Slayer",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased bg-black text-white">
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
