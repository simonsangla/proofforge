import "./globals.css";

export const metadata = {
  title: "ProofForge",
  description: "ProofForge public portfolio PWA shell"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
