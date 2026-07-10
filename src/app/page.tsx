import { Button } from "@/components/shadcnui/button";
import { auth } from "@/lib/auth";
import { swatches } from "@/lib/homeSwatches";
import { ArrowUpRightIcon } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aurawall — Wallpapers curated for every screen",
  description:
    "A growing library of high-quality wallpapers. Browse by mood, save your favourites, and share the ones you make.",
};

// Each string below is a COMPLETE Tailwind class, written out in full.
// Tailwind's compiler only generates CSS for classes it can find as literal
// text in the source — it can't resolve `${s.gradient}`-style interpolation
// at build time. Keeping full tokens here (not fragments assembled later)
// is what lets this ship as compiled, cached Tailwind CSS instead of inline
// styles or a runtime <style> block.

const page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <section className="relative grid h-dvh place-items-center overflow-hidden">
      {/* Signature element: a scattered gallery of curated "screens" — phones and
          desktops each carrying a distinct gradient mood, ambient-floating behind
          the copy. Ties directly to "wallpapers curated for every screen".
          `animate-float` comes from tailwind.config — see the snippet in chat. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
        aria-hidden>
        {swatches.map((s) => (
          <div
            key={s.id}
            className={`absolute ${s.position}`}>
            <div
              className={`animate-float relative h-full w-full overflow-hidden will-change-transform motion-reduce:animate-none ${s.gradient} ${s.delay} ${s.duration} shadow-2xl ring-1 shadow-black/20 ring-black/5 dark:shadow-black/50 dark:ring-white/10 ${
                s.kind === "phone" ? "rounded-[2rem]" : "rounded-xl"
              } ${s.faded ? "opacity-40 blur-[1.5px]" : "opacity-90"}`}>
              {s.kind === "desktop" ?
                <div className="absolute top-2.5 left-3 flex gap-1">
                  <span className="size-1.5 rounded-full bg-white/30" />
                  <span className="size-1.5 rounded-full bg-white/30" />
                  <span className="size-1.5 rounded-full bg-white/30" />
                </div>
              : <div className="absolute inset-x-0 top-2.5 mx-auto h-1 w-8 rounded-full bg-white/25" />
              }
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <span className="border-border/60 bg-muted/40 text-muted-foreground mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          New wallpapers added every week
        </span>

        <h1 className="text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
          Wallpapers,
          <br />
          <span className="bg-linear-to-r from-violet-500 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            curated
          </span>{" "}
          for every screen.
        </h1>

        <p className="text-muted-foreground mt-5 text-base leading-relaxed sm:text-lg">
          A growing library of high-quality wallpapers — browse by mood, save
          your favourites, and share the ones you make.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/wallpapers"
            className="group">
            <Button size="lg">
              Browse wallpapers
              <ArrowUpRightIcon className="ml-1.5 size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>
          <Link href={session ? "/create" : "/auth/signin"}>
            <Button
              variant="ghost"
              size="lg">
              Upload yours
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
