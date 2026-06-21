import { Button } from "@/components/shadcnui/button";
import { auth } from "@/lib/auth";
import { ArrowUpRightIcon } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js Starter Fullstack",
  description: "Production grade Fullstack Next.js starter template",
};

const page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <section className="grid h-dvh place-items-center">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-5xl font-medium tracking-tight sm:text-6xl">
          Beautiful wallpapers,
          <br />
          curated for your screen.
        </h1>
        <p className="text-muted-foreground mt-5 text-base leading-relaxed">
          Discover a growing collection of high-quality wallpapers. Browse
          categories, save your favourites, and share your own.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/wallpapers">
            <Button size="lg">
              Browse wallpapers
              <ArrowUpRightIcon className="ml-1.5 size-4" />
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
