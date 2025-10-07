import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SocialCaption",
  description: "Captions that connect. Hashtags that perform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
