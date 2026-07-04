import DownloadButton from "@/components/Buttons/DownloadButton";
import { LikeButton } from "@/components/Buttons/LikeButton";
import WallpaperPriviewDialog from "@/components/Dialog/WallpaperPriviewDialog";
import { Card, CardContent } from "@/components/shadcnui/card";
import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { headers } from "next/headers";
import Image from "next/image";

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
    return <div>Wallpaper not found.</div>;
  }

  return (
    <WallpaperPriviewDialog>
      <Card className="border-0 shadow-none ring-0">
        <CardContent className="space-y-2">
          <Image
            src={`/${wallpaper.image}`}
            alt={wallpaper.title}
            height={wallpaper.height || 1080}
            width={wallpaper.width || 720}
            priority
            className="mx-auto h-120 w-full rounded-lg object-contain"
          />

          <div className="flex justify-between">
            <div className="">
              <h3 className="font-medium text-white">{wallpaper.title}</h3>

              <p className="text-xs tracking-wider text-zinc-300 uppercase">
                {wallpaper.category?.categoryName}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <LikeButton
                initialLikesCount={wallpaper._count.likes}
                initialLiked={wallpaper.likes.length > 0}
                wallpaperId={wallpaper.id}
              />

              <DownloadButton
                wallpaperId={wallpaper.id}
                imagePath={wallpaper.image}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </WallpaperPriviewDialog>
  );
};

export default page;
