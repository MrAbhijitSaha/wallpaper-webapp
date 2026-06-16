import { LayoutChildrenProps } from "@/lib/types";

const WallpaperLayout = ({ children }: LayoutChildrenProps) => {
  return <section className="mx-auto max-w-7xl p-24 px-6">{children}</section>;
};

export default WallpaperLayout;
