import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import DemoNotice from "@/components/portfolio/DemoNotice";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dibyasarothi.is-a.dev"),
  title: "Dibya Sarothi Simanta — B2B Software & Backend Systems Engineering",
  description: "Independent software engineering for backend systems, integrations, operational automation, and custom B2B applications. ClientForge is the flagship engineering demonstration.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/logo.jpg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Dibya Sarothi Simanta — Independent Software Engineer",
    description: "Custom B2B software, backend systems, integrations, and operational automation.",
    url: "https://dibyasarothi.is-a.dev",
    siteName: "Dibya Sarothi Simanta — Engineering Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dibya Sarothi Simanta — engineering portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dibya Sarothi Simanta — Independent Software Engineer",
    description: "Custom B2B software, backend systems, integrations, and workflow automation.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${cormorant.variable} font-sans h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <DemoNotice/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
