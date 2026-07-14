import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { WallpaperWithDetails } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import DownloadButton from "../Buttons/DownloadButton";
import { LikeButton } from "../Buttons/LikeButton";
import ShareButton from "../Buttons/ShareButton";

type WallpaperPreviewDialogProps = {
  wallpaper: WallpaperWithDetails;
};

const SingleWallpaerCard = ({ wallpaper }: WallpaperPreviewDialogProps) => {
  return (
    <div className="w-7xl space-y-5 rounded-xl border p-6 pt-0 shadow-none ring-0">
      <Image
        src={`/${wallpaper.image}`}
        alt={wallpaper.title}
        height={wallpaper.height || 1080}
        width={wallpaper.width || 720}
        priority
        className="mx-auto max-h-120 w-full rounded-lg bg-transparent/10 object-contain"
      />

      <div className="space-y-4 px-1">
        {/* Title, category, actions */}

        <div className="min-w-0">
          <h3 className="text-foreground truncate text-lg font-medium">
            {wallpaper.title}
          </h3>

          {wallpaper.category?.categoryName && (
            // <span className="bg-foreground/50 text-background mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wider uppercase">
            //   {wallpaper.category.categoryName}
            // </span>

            <Link
              href={`/wallpapers/category/${wallpaper.category.categoryName}`}
              className="bg-foreground/50 text-background mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wider uppercase">
              {wallpaper.category.categoryName}
            </Link>
          )}
        </div>

        {/* Uploader + posted date */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            {wallpaper.user?.image ?
              <Image
                src={wallpaper.user.image}
                alt={wallpaper.user.name ?? "Uploader"}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />
            : <div className="bg-foreground/40 text-background flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium">
                {(wallpaper.user?.name ?? "?").charAt(0).toUpperCase()}
              </div>
            }

            <div className="min-w-0">
              <p className="text-foreground truncate text-sm font-medium">
                {wallpaper.user?.name ?? "Unknown creator"}
              </p>
              <p className="text-xs text-zinc-400">
                Posted {formatRelativeTime(wallpaper.createdAt)}
              </p>
            </div>
          </div>

          {/* like share and download buttons */}
          <div className="flex shrink-0 items-center gap-2">
            <LikeButton
              initialLikesCount={wallpaper._count.likes}
              initialLiked={wallpaper.likes.length > 0}
              wallpaperId={wallpaper.id}
              text="likes"
              className="text-foreground bg-transparent hover:bg-transparent active:bg-transparent"
            />

            <DownloadButton
              wallpaperId={wallpaper.id}
              imagePath={wallpaper.image}
              text={`downloads`}
              downloadCount={wallpaper.downloadCount}
              className="text-foreground bg-transparent hover:bg-transparent active:bg-transparent"
            />

            <ShareButton
              wallpaperId={wallpaper.id}
              title={wallpaper.title}
              className="text-foreground bg-transparent hover:bg-transparent active:bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleWallpaerCard;
