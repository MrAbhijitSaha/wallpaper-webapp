import WallpaperCard from "@/components/Cards/WallpaperCard";
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
  const category = await prisma.category.findMany();

  const wallpapers = await prisma.wallpaper.findMany({
    where: {
      category: {
        categoryName: categoryWallpaper,
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

      <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
        {wallpapers.map((wall) => (
          <WallpaperCard
            key={wall.id}
            wallpaperinfo={wall}
          />
        ))}
      </div>
    </>
  );
};

export default page;
