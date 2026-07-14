import prisma from "@/lib/database/dbClient";

const getWallpapers = async () => {
  try {
    const wallpaper = await prisma.wallpaper.findMany();
    return wallpaper;
  } catch (error) {
    console.log(error);
  }
};

export default getWallpapers;
