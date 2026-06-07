import Image from "next/image";
import BookMarkButton from "../Buttons/BookMarkButton";
import DeleteWallpaperButton from "../Buttons/DeleteWallpaperButton";
import EditWallpaperButton from "../Buttons/EditWallpaperButton";
import ShareWallpaperButton from "../Buttons/ShareWallpaperButton";
import { Card, CardContent } from "../shadcnui/card";

const WallpaperCard = () => {
  return (
    <section>
      <Card className="group p-0">
        <CardContent className="relative p-0">
          <div className="">
            {/* delete and edit icons */}
            <div className="invisible absolute top-2 right-2 z-10 transition-opacity duration-200 group-hover:visible">
              {/* delete button */}
              <DeleteWallpaperButton />

              {/* edit button */}
              <EditWallpaperButton />
            </div>

            {/* wallpaper image */}
            <Image
              src={"/photo-1779332317860-ddf6f5ee74a2.avif"}
              alt="image"
              height={500}
              width={500}
              className="rounded-xl duration-200 group-hover:brightness-50"
            />
          </div>

          {/* wallpaper post by: profile picture, name, posted time, and tags*/}
          <div className="invisible absolute inset-x-2 bottom-0 space-y-4 rounded-xl border border-gray-400/25 bg-transparent p-2 text-white backdrop-blur-xs transition-opacity duration-200 group-hover:visible">
            {/* profile picture, name, posted time */}

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-red-500 p-5" />

                <div className="">
                  <p className="text-base font-semibold">Abhijit Saha</p>

                  <p className="text-end">1 day ago</p>
                </div>
              </div>

              <div className="">
                {/* save wallpaper button */}
                <BookMarkButton />

                {/* share wallpaper button  */}
                <ShareWallpaperButton />
              </div>
            </div>

            {/* wallpaper  tags */}

            <ul className="flex flex-wrap gap-2">
              <li className="bg-foreground/15 rounded-2xl px-4 py-2">tag1</li>

              <li className="bg-foreground/15 rounded-2xl px-4 py-2">tag2</li>

              <li className="bg-foreground/15 rounded-2xl px-4 py-2">tag3</li>

              <li className="bg-foreground/15 rounded-2xl px-4 py-2">tag4</li>

              <li className="bg-foreground/15 rounded-2xl px-4 py-2">tag5</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default WallpaperCard;
