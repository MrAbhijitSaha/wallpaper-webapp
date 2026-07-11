import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AuraWall",
    short_name: "AuraWall",
    description:
      "Discover and share high-quality wallpapers curated for every screen.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
