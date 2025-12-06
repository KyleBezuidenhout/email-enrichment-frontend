import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EmailEnrich - Find & Verify Emails At Scale",
  description: "Upload your leads, get verified emails in minutes. 26 email patterns, 99% accuracy, powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
