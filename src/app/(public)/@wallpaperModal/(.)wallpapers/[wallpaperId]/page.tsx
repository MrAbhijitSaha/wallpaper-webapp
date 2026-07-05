import WallpaperPreviewDialog from "@/components/Dialog/WallpaperPreviewDialog";
import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    wallpaperId: string;
  }>;
};

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

  return <WallpaperPreviewDialog wallpaper={wallpaper} />;
};

export default page;
