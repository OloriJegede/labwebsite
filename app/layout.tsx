import type { Metadata } from "next";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import AppFooter from "@/components/Headers/AppFooter";

export const metadata: Metadata = {
  title: "LAB Wellness | Transform Your Health & Appearance Naturally",
  description:
    "Expert wellness consultations focused on lifestyle optimization, balanced nutrition, and natural appearance enhancement. Achieve sustainable health transformation through personalized LAB protocols.",
  keywords: [
    "wellness consultation",
    "health optimization",
    "lifestyle medicine",
    "balanced nutrition",
    "natural skincare",
    "hormone balance",
    "stress management",
    "weight loss",
    "anti-aging",
    "holistic health",
  ],
  authors: [{ name: "LAB Wellness" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <ConditionalHeader />
        {children}
        <AppFooter />
      </body>
    </html>
  );
}
