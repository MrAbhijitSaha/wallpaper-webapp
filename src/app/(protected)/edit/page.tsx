import { Download, Heart, Menu, Search, Sparkles } from "lucide-react";

// Dummy data for the wallpaper grid
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

const CATEGORIES = [
  "All",
  "Editorial",
  "Minimal",
  "OLED",
  "Desktop",
  "Abstract",
  "Nature",
];

export default function AurawallHome() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 selection:bg-zinc-100 selection:text-zinc-900">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-900/50 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold tracking-tighter uppercase">
              Aurawall
            </h1>
            <div className="hidden items-center gap-6 text-sm font-medium text-zinc-400 md:flex">
              <a
                href="#"
                className="text-zinc-50 transition-colors">
                Explore
              </a>
              <a
                href="#"
                className="transition-colors hover:text-zinc-50">
                Studio
              </a>
              <a
                href="#"
                className="transition-colors hover:text-zinc-50">
                Creators
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 transition-colors focus-within:border-zinc-700 md:flex">
              <Search className="mr-2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search auras..."
                className="w-48 bg-transparent text-sm placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
            <button className="rounded-full p-2 transition-colors hover:bg-zinc-900">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-16">
        <div className="mb-16 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300">
            <Sparkles className="h-3 w-3" />
            <span>Curated Collection V.04</span>
          </div>
          <h2 className="mb-6 text-5xl leading-[1.1] font-bold tracking-tighter md:text-7xl">
            Elevate your <br className="hidden md:block" /> screen's aura.
          </h2>
          <p className="max-w-xl text-lg font-light text-zinc-400">
            An editorial collection of high-resolution wallpapers tailored for
            minimalists and modern creators.
          </p>
        </div>

        {/* Filters */}
        <div className="scrollbar-hide mb-8 flex items-center gap-3 overflow-x-auto pb-4">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat}
              className={`rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                idx === 0 ?
                  "bg-zinc-50 text-zinc-950"
                : "border border-transparent bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-50"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Wallpaper Grid */}
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
      </main>
    </div>
  );
}
