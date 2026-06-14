import { DownloadIcon, HeartIcon } from "lucide-react";
import { Card } from "../shadcnui/card";

type WallpaperCardProps = {
  info: {
    id: number;
    title: string;
    category: string;
    height: number;
    width: number;
    img: string;
  };
};

const WallpaperCard = ({ info }: WallpaperCardProps) => {
  return (
    <Card
      key={info.id}
      className="group overflow-hidden border-0 bg-zinc-900 p-0">
      <div className="relative">
        <img
          src={info.img}
          alt={info.title}
          height={info.height}
          width={info.width}
          loading="lazy"
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex w-full items-end justify-between p-4">
            <div>
              <h3 className="font-medium text-white">{info.title}</h3>

              <p className="text-xs tracking-wider text-zinc-300 uppercase">
                {info.category}
              </p>
            </div>

            <div className="flex gap-2">
              <button className="rounded-full bg-white/10 p-2 backdrop-blur">
                <HeartIcon className="h-4 w-4 text-white" />
              </button>

              <button className="rounded-full bg-white p-2">
                <DownloadIcon className="h-4 w-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WallpaperCard;
