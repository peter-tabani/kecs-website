import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteData } from "@/data/site";
import { siteUrl } from "@/lib/site-url";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const description =
  "A private school in Likoni, Mombasa, teaching ECDE, Primary and Junior Secondary since 2013. Natuwe Mbele Daima.";

const schoolSchema = {
  "@context": "https://schema.org",
  "@type": "School",
  "@id": `${siteUrl}/#school`,
  name: siteData.schoolName,
  alternateName: siteData.shortName,
  url: siteUrl,
  logo: `${siteUrl}/images/icon-512.png`,
  image: `${siteUrl}/images/og-cover.jpg`,
  description,
  foundingDate: siteData.founded,
  telephone: siteData.phone,
  email: siteData.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Along Approved-Shelleybeach Road",
    addressLocality: "Likoni",
    addressRegion: "Mombasa",
    addressCountry: "KE",
  },
  areaServed: ["Likoni", "Mombasa"],
};

export const metadata: Metadata = {
  // Lets Next turn the relative image paths below into absolute URLs, which is
  // what WhatsApp and Facebook need when someone shares a link.
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kenya Excellent Centre & School | Private School in Likoni",
    template: "%s | KES Likoni",
  },
  description,
  keywords: [
    "Kenya Excellent Centre and School",
    "KES Likoni",
    "school in Likoni",
    "private school Mombasa",
    "ECDE Mombasa",
    "junior secondary Likoni",
    "CBC school Mombasa",
  ],
  applicationName: siteData.shortName,
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: siteData.schoolName,
    title: "Kenya Excellent Centre and School",
    description,
    url: siteUrl,
    locale: "en_KE",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "The gate of the Kenya Excellent Centre and School, Likoni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenya Excellent Centre and School",
    description,
    images: ["/images/og-cover.jpg"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schoolSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={`${montserrat.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
