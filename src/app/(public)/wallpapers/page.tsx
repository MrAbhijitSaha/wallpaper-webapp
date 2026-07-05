import MasonryGrid from "@/components/Cards/MasonryGrid";
import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import getCategory from "@/server/getCategory";
import { headers } from "next/headers";
import Link from "next/link";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const wallpaper = await prisma.wallpaper.findMany({
    include: {
      category: true,
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      likes: {
        where: {
          userId: session?.user?.id ?? "",
        },
        select: {
          id: true,
        },
      },
    },
  });

  const category = await getCategory();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          All Wallpapers
        </h1>
        <p className="text-sm text-neutral-500">
          {wallpaper.length}{" "}
          {wallpaper.length === 1 ? "wallpaper" : "wallpapers"}
        </p>
      </div>

      <div className="scrollbar-hide mb-8 flex items-center gap-2 overflow-x-auto pb-4 capitalize">
        <Link
          href="/wallpapers"
          aria-current="page"
          className="shrink-0 rounded-full border border-neutral-900 bg-neutral-900 px-4 py-1.5 text-sm font-medium text-white transition-all duration-150 hover:bg-neutral-800 active:scale-95 active:bg-neutral-700 dark:border-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">
          All
        </Link>

        {category?.map((c) => (
          <Link
            href={`/wallpapers/category/${c.categoryName.toLowerCase()}`}
            key={c.id}
            className="shrink-0 rounded-full border border-neutral-200 px-4 py-1.5 text-sm font-medium text-neutral-700 transition-all duration-150 hover:border-neutral-300 hover:bg-neutral-100 active:scale-95 active:bg-neutral-200 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:active:bg-neutral-700">
            {c.categoryName}
          </Link>
        ))}
      </div>

      {wallpaper.length > 0 ?
        <MasonryGrid wallpapers={wallpaper} />
      : <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 py-20 text-center dark:border-neutral-800">
          <p className="text-lg font-medium">No wallpapers yet</p>
          <p className="mt-1 text-sm text-neutral-500">
            Check back soon for new additions
          </p>
        </div>
      }
    </>
  );
};

export default page;
