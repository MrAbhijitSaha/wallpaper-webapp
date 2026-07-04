import WallpaperCard from "@/components/Cards/WallpaperCard";
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

  // const category = await prisma.category.findMany();
  const category = await getCategory();

  return (
    <>
      <div className="scrollbar-hide mb-8 flex items-center gap-3 overflow-x-auto pb-4">
        {category ?
          <>
            <Link href={"/wallpapers"}>All</Link>

            {category.map((c) => (
              <Link
                href={`/wallpapers/category/${c.categoryName}`}
                key={c.id}>
                {c.categoryName}
              </Link>
            ))}
          </>
        : null}
      </div>

      <section className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
        {wallpaper.map((w) => (
          <WallpaperCard
            key={w.id}
            wallpaperinfo={w}
          />
        ))}
      </section>
    </>
  );
};

export default page;
