import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

// Load the ABCDiatype font (Regular and Bold only)
const abcdDiatype = localFont({
  src: [
    { path: "./fonts/ABCDiatype-Regular.otf", weight: "400" },
    { path: "./fonts/ABCDiatype-Bold.otf", weight: "700" },
  ],
  variable: "--font-abcd-diatype",
});

// Load the Reckless font (Regular and Medium only)
const reckless = localFont({
  src: [
    { path: "./fonts/RecklessTRIAL-Regular.woff2", weight: "400" },
    { path: "./fonts/RecklessTRIAL-Medium.woff2", weight: "500" },
  ],
  variable: "--font-reckless",
});

export const metadata: Metadata = {
  title: "Exa & o3-mini chat app",
  description: "An opensource chat application built with Exa for web search and openai o3-mini.",
  openGraph: {
    title: "Exa & o3-mini chat app",
    description: "An opensource chat application built with Exa for web search and openai o3-mini.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://exa-o3mini-chat.vercel.app/",
        width: 1200,
        height: 630,
        alt: "Exa & o3-mini chat app"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Exa & o3-mini chat app",
    description: "An opensource chat application built with Exa for web search and openai o3-mini.",
    images: ["https://exa-o3mini-chat.vercel.app/"]
  },
  metadataBase: new URL("https://exa-o3mini-chat.vercel.app/"),
  robots: {
    index: true,
    follow: true
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${abcdDiatype.variable} ${reckless.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

