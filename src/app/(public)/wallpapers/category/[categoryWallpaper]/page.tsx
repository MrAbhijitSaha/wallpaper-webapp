import MasonryGrid from "@/components/Cards/MasonryGrid";
import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { headers } from "next/headers";
import Link from "next/link";

const page = async ({
  params,
}: {
  params: Promise<{ categoryWallpaper: string }>;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { categoryWallpaper } = await params;
  const activeCategory = decodeURIComponent(categoryWallpaper.toLowerCase());

  const categories = await prisma.category.findMany();

  const wallpapers = await prisma.wallpaper.findMany({
    where: {
      category: {
        categoryName: activeCategory,
      },
    },
    include: {
      category: true,
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

  return (
    <>
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight capitalize">
          {activeCategory}
        </h1>
        <p className="text-sm text-neutral-500">
          {wallpapers.length}{" "}
          {wallpapers.length === 1 ? "wallpaper" : "wallpapers"}
        </p>
      </div>

      {/* Category pills */}
      <div className="scrollbar-hide mb-8 flex items-center gap-2 overflow-x-auto pb-4 capitalize">
        <Link
          href="/wallpapers"
          className="shrink-0 rounded-full border border-neutral-200 px-4 py-1.5 text-sm font-medium text-neutral-700 transition-all duration-150 hover:border-neutral-300 hover:bg-neutral-100 active:scale-95 active:bg-neutral-200 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:active:bg-neutral-700">
          All
        </Link>

        {categories.map((c) => {
          const isActive = c.categoryName.toLowerCase() === activeCategory;

          return (
            <Link
              href={`/wallpapers/category/${c.categoryName.toLowerCase()}`}
              key={c.id}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-150 active:scale-95 ${
                isActive ?
                  "border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-700 dark:border-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                : "border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100 active:bg-neutral-200 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
              }`}>
              {c.categoryName}
            </Link>
          );
        })}
      </div>

      {/* Wallpaper grid */}
      {wallpapers.length > 0 ?
        <MasonryGrid wallpapers={wallpapers} />
      : <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 py-20 text-center dark:border-neutral-800">
          <p className="text-lg font-medium capitalize">
            No wallpapers in {activeCategory} yet
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Check back soon or browse another category
          </p>
        </div>
      }
    </>
  );
};

export default page;
