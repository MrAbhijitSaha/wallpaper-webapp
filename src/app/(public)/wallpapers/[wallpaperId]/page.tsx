import SingleWallpaerCard from "@/components/Cards/SingleWallpaerCard";
import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { buildMetadata } from "@/lib/seo";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    wallpaperId: string;
  }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { wallpaperId } = await params;
  const wallpaper = await prisma.wallpaper.findUnique({
    where: { id: wallpaperId },
    select: {
      title: true,
      image: true,
      category: { select: { categoryName: true } },
    },
  });

  if (!wallpaper) {
    return buildMetadata({
      title: "Wallpaper not found",
      description: "The requested wallpaper could not be found.",
      path: `/wallpapers/${wallpaperId}`,
    });
  }

  return buildMetadata({
    title: wallpaper.title,
    description: `Download ${wallpaper.title} wallpaper from AuraWall.`,
    path: `/wallpapers/${wallpaperId}`,
    image: wallpaper.image,
    type: "article",
  });
}

const page = async ({ params }: PageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { wallpaperId } = await params;

  const wallpaper = await prisma.wallpaper.findUnique({
    where: {
      id: wallpaperId,
    },
    include: {
      category: true,
      user: true,
      likes: {
        where: {
          userId: session?.user?.id ?? "",
        },
        select: {
          id: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  if (!wallpaper) {
    notFound();
  }

  return (
    <section className="grid w-7xl place-items-center">
      <SingleWallpaerCard wallpaper={wallpaper} />
    </section>
  );
};

export default page;
