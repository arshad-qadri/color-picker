import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Full metadata export for Next.js 15 App Router
export const metadata = {
  title: "Color Explorer | Generate Color Shades & Copy Hex Codes",
  description:
    "Explore beautiful colors and generate shades. Click to copy hex codes. Perfect for designers and developers.",
  keywords: [
    "colors",
    "color shades",
    "hex codes",
    "color picker",
    "design tool",
  ],
  authors: [{ name: "Arshad Qadri", url: "https://arshadqadri.com" }],
  themeColor: "#f3f4f6",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Color Explorer",
    description:
      "Explore beautiful colors and generate shades. Click to copy hex codes.",
    type: "website",
    url: "https://colors.arshadqadri.com/",
    images: [
      {
        url: "https://colors.arshadqadri.com/preview-image.png",
        width: 1200,
        height: 630,
        alt: "Color Explorer Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Explorer",
    description:
      "Explore beautiful colors and generate shades. Click to copy hex codes.",
    images: ["https://colors.arshadqadri.com/preview-image.png"],
  },
  metadataBase: new URL("https://colors.arshadqadri.com/"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Color Explorer",
              url: "https://colors.arshadqadri.com/",
              description:
                "Explore beautiful colors and generate shades. Click to copy hex codes.",
              applicationCategory: "DesignApplication",
              operatingSystem: "Web",
              screenshot: "https://colors.arshadqadri.com/preview-image.png",
            }),
          }}
        />
      </body>
    </html>
  );
}
