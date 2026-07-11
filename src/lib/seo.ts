import type { Metadata } from "next";

const siteName = "AuraWall";
const defaultDescription =
  "Discover and share high-quality wallpapers curated for every screen, from minimal to cinematic.";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  process.env.BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ??
  "http://localhost:3000";

export const siteConfig = {
  name: siteName,
  url: siteUrl,
  description: defaultDescription,
  keywords: [
    "wallpapers",
    "desktop wallpaper",
    "mobile wallpaper",
    "curated wallpapers",
    "aesthetic backgrounds",
  ],
  ogImage: "/og-image.svg",
};

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  type = "website",
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
} = {}): Metadata {
  const resolvedTitle = title ? `${title} | ${siteName}` : siteName;
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    metadataBase: new URL(siteUrl),
    title: resolvedTitle,
    description,
    keywords: siteConfig.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: canonicalUrl,
      siteName,
      type,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    manifest: "/manifest.webmanifest",
  };
}

export function createJsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data);
}
