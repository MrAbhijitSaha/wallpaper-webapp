import { Download, Heart } from "lucide-react";

const WALLPAPERS = [
  {
    id: 1,
    title: "Ethereal Peak",
    category: "Landscape",
    height: "h-96",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Neon Veil",
    category: "Abstract",
    height: "h-64",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Graphite",
    category: "Minimal",
    height: "h-80",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Solar Flare",
    category: "OLED",
    height: "h-72",
    img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Brutalism",
    category: "Architecture",
    height: "h-96",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Liquid Chrome",
    category: "3D",
    height: "h-64",
    img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
  },
];

const WallpaperGrid = () => {
  return (
    <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
      {WALLPAPERS.map((wall) => (
        <div
          key={wall.id}
          className="group relative break-inside-avoid overflow-hidden rounded-2xl bg-zinc-900">
          {/* Image Placeholder */}
          <img
            src={wall.img}
            alt={wall.title}
            className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${wall.height}`}
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="mb-1 font-medium tracking-tight text-zinc-50">
                  {wall.title}
                </h3>
                <p className="text-xs tracking-wider text-zinc-400 uppercase">
                  {wall.category}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-full bg-zinc-50/10 p-2.5 text-zinc-50 backdrop-blur-md transition-colors hover:bg-zinc-50/20">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="rounded-full bg-zinc-50 p-2.5 text-zinc-950 transition-colors hover:bg-zinc-200">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WallpaperGrid;
