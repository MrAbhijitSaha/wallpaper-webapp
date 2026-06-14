import WallpaperGrid from "./WallpaperGrid";

const CATEGORIES = [
  "All",
  "Editorial",
  "Minimal",
  "OLED",
  "Desktop",
  "Abstract",
  "Nature",
];

const HomePage = () => {
  return (
    <>
      {/* // <div className="min-h-screen bg-zinc-950 font-sans text-zinc-50 selection:bg-zinc-100 selection:text-zinc-900"> */}
      {/* Navigation */}
      {/* <nav className="fixed top-0 z-50 w-full border-b border-zinc-900/50 bg-zinc-950/80 backdrop-blur-md">
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
      </nav> */}

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16">
        <div className="mb-16 max-w-3xl">
          <h2 className="mb-6 text-5xl leading-[1.1] font-bold tracking-tighter md:text-7xl">
            Elevate your <br className="hidden md:block" /> screen&apos;s aura.
          </h2>
          <p className="max-w-xl text-lg font-light text-zinc-400">
            An editorial collection of high-resolution wallpapers tailored for
            minimalists and modern creators.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex items-center gap-3 overflow-x-auto pb-4">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat}
              className={`rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                idx === 0 ?
                  "bg-foreground text-background"
                : "bg-foreground text-background border border-transparent hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-50"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Wallpaper Grid */}
        <WallpaperGrid />
        {/* <WallpaperCard /> */}
      </section>
      {/* </div> */}
    </>
  );
};

export default HomePage;
