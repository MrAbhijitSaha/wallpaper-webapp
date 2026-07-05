import DownloadButton from "@/components/Buttons/DownloadButton";
import { LikeButton } from "@/components/Buttons/LikeButton";
import WallpaperPriviewDialog from "@/components/Dialog/WallpaperPriviewDialog";
import { Card, CardContent } from "@/components/shadcnui/card";
import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { Download, Eye, Heart } from "lucide-react";
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
    return (
      <WallpaperPriviewDialog>
        <div className="flex flex-col items-center justify-center gap-1 py-16 text-center">
          <p className="text-lg font-medium">Wallpaper not found</p>
          <p className="text-sm text-neutral-500">
            It may have been removed or the link is incorrect.
          </p>
        </div>
      </WallpaperPriviewDialog>
    );
  }

  return (
    <WallpaperPriviewDialog>
      <Card className="border-0 shadow-none ring-0">
        <CardContent className="space-y-5 p-0">
          <Image
            src={`/${wallpaper.image}`}
            alt={wallpaper.title}
            height={wallpaper.height || 1080}
            width={wallpaper.width || 720}
            priority
            className="mx-auto max-h-120 w-full rounded-lg bg-zinc-900 object-contain"
          />

          <div className="space-y-4 px-1">
            {/* Title, category, actions */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-medium text-white">
                  {wallpaper.title}
                </h3>

                {wallpaper.category?.categoryName && (
                  <span className="mt-1 inline-block rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium tracking-wider text-zinc-300 uppercase">
                    {wallpaper.category.categoryName}
                  </span>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-2">
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

            <hr className="border-zinc-800" />

            {/* Uploader + posted date */}
            <div className="flex items-center gap-3">
              {wallpaper.user?.image ?
                <Image
                  src={wallpaper.user.image}
                  alt={wallpaper.user.name ?? "Uploader"}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
              : <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-sm font-medium text-zinc-300">
                  {(wallpaper.user?.name ?? "?").charAt(0).toUpperCase()}
                </div>
              }

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {wallpaper.user?.name ?? "Unknown creator"}
                </p>
                <p className="text-xs text-zinc-400">
                  Posted {formatRelativeTime(wallpaper.createdAt)}
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-5 text-sm text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4" />
                {wallpaper._count.likes.toLocaleString()} likes
              </span>

              <span className="flex items-center gap-1.5">
                <Download className="h-4 w-4" />
                {(wallpaper.downloadCount ?? 0).toLocaleString()} downloads
              </span>

              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {(wallpaper.viewCount ?? 0).toLocaleString()} views
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </WallpaperPriviewDialog>
  );
};

export default page;
