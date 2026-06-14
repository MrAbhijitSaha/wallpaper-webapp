"use client";

import Masonry from "react-masonry-css";
import WallpaperCard from "../Cards/WallpaperCard";

const WALLPAPERS = [
  {
    id: 1,
    title: "Ethereal Peak",
    category: "Landscape",
    height: 96,
    width: 55,
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Neon Veil",
    category: "Abstract",
    height: 64,
    width: 55,
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Graphite",
    category: "Minimal",
    height: 80,
    width: 55,
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Solar Flare",
    category: "OLED",
    height: 72,
    width: 55,
    img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Brutalism",
    category: "Architecture",
    height: 96,
    width: 55,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Liquid Chrome",
    category: "3D",
    height: 64,
    width: 55,
    img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Liquid Chrome",
    category: "3D",
    height: 64,
    width: 55,
    img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Solar Flare",
    category: "OLED",
    height: 72,
    width: 55,
    img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Graphite",
    category: "Minimal",
    height: 80,
    width: 55,
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
];

const breakpointColumnsObj = {
  default: 3,
  1280: 3,
  768: 2,
  640: 1,
};

const WallpaperGrid = () => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-6"
      columnClassName="space-y-6">
      {WALLPAPERS.map((wall) => (
        <WallpaperCard
          key={wall.id}
          info={wall}
        />
      ))}
    </Masonry>
  );
};

export default WallpaperGrid;
