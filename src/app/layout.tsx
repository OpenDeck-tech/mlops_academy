import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "MLOps Academy";
const siteDescription =
  "Master MLOps. Production-grade ML systems, hands-on. From laptop to production — one pipeline.";

// Set NEXT_PUBLIC_APP_URL (e.g. https://your-domain.com) so Open Graph image URLs are absolute when shared
const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const metadata: Metadata = {
  ...(baseUrl && { metadataBase: new URL(baseUrl) }),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "MLOps Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@MLOps_engineer",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
