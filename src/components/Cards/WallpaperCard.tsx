import Image from "next/image";
import { Prisma } from "../../../generated/prisma/browser";
import DownloadButton from "../Buttons/DownloadButton";
import LikeButton from "../Buttons/LikeButton";
import { Card } from "../shadcnui/card";

type WallpaperCardProps = {
  wallpaperinfo: Prisma.WallpaperGetPayload<{
    include: {
      category: true;
    };
  }>;
};

const WallpaperCard = ({ wallpaperinfo }: WallpaperCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 bg-zinc-900 p-0">
      <div className="relative">
        <Image
          src={`/${wallpaperinfo.image}`}
          alt={wallpaperinfo.title}
          height={wallpaperinfo.height || 1080}
          width={wallpaperinfo.width || 720}
          loading="lazy"
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex w-full items-end justify-between p-4">
            <div>
              <h3 className="font-medium text-white">{wallpaperinfo.title}</h3>

              <p className="text-xs tracking-wider text-zinc-300 uppercase">
                {wallpaperinfo.category?.categoryName}
              </p>
            </div>

            <div className="flex gap-2">
              <LikeButton
                initialCount={wallpaperinfo.likeCount}
                initialLiked={false}
                wallpaperId={wallpaperinfo.id}
              />

              <DownloadButton />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WallpaperCard;
