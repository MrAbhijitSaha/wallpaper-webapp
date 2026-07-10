import Image from "next/image";
import { Prisma } from "../../../generated/prisma/browser";
import DownloadButton from "../Buttons/DownloadButton";

import Link from "next/link";
import { LikeButton } from "../Buttons/LikeButton";
import { Card } from "../shadcnui/card";

type WallpaperCardProps = {
  wallpaperinfo: Prisma.WallpaperGetPayload<{
    include: {
      category: true;
      likes: {
        select: {
          id: true;
        };
      };
      _count: {
        select: {
          likes: true;
        };
      };
      user: {
        select: {
          name: true;
        };
      };
    };
  }>;
};

const WallpaperCard = ({ wallpaperinfo }: WallpaperCardProps) => {
  return (
    <Card className="group overflow-hidden rounded-xl border-0 bg-zinc-900 p-0 shadow-md transition-shadow duration-300 hover:shadow-xl hover:shadow-black/30">
      <Link href={`/wallpapers/${wallpaperinfo.id}`}>
        <div className="relative w-full">
          <Image
            src={`/${wallpaperinfo.image}`}
            alt={wallpaperinfo.title}
            width={wallpaperinfo.width || 720}
            height={wallpaperinfo.height || 1080}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/85 via-black/10 to-transparent">
            <div className="flex w-full items-end justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate font-medium text-white">
                  {wallpaperinfo.user.name}
                </p>

                <p className="text-xs tracking-wider text-zinc-300 uppercase">
                  {wallpaperinfo.category?.categoryName}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2 rounded-full border border-zinc-500/50 opacity-90 transition-opacity duration-200 group-hover:opacity-100">
                <LikeButton
                  initialLikesCount={wallpaperinfo._count.likes}
                  initialLiked={wallpaperinfo.likes.length > 0}
                  wallpaperId={wallpaperinfo.id}
                  className="bg-transparent text-white hover:bg-transparent active:bg-transparent"
                />

                <DownloadButton
                  wallpaperId={wallpaperinfo.id}
                  imagePath={wallpaperinfo.image}
                  className="text-white"
                  downloadCount={wallpaperinfo.downloadCount}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default WallpaperCard;
