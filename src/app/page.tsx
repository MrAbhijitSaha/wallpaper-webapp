import WallpaperCard from "@/components/Cards/WallpaperCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Starter Fullstack",
  description: "Production grade Fullstack Next.js starter template",
};

const page = () => {
  return (
    <section className="grid h-dvh grid-cols-4 place-items-center gap-4">
      <WallpaperCard />
      <WallpaperCard />
      <WallpaperCard />
      <WallpaperCard />
      <WallpaperCard />
      <WallpaperCard />
      <WallpaperCard />
      <WallpaperCard />
    </section>
  );
};

export default page;
