import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "ProofForge",
  description: "ProofForge public portfolio PWA shell",
  icons: {
    apple: "/apple-touch-icon.png",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const shouldEnableAnalytics = process.env.VERCEL === "1";

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        {shouldEnableAnalytics ? <Analytics /> : null}
      </body>
    </html>
  );
}
