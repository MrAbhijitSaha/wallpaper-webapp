"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const trackWallpaperDownload = async (wallpaperId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const wallpaper = await prisma.wallpaper.findUnique({
      where: {
        id: wallpaperId,
      },
    });

    if (!wallpaper) {
      return {
        success: false,
        message: "Wallpaper not found.",
      };
    }

    await prisma.wallpaper.update({
      where: {
        id: wallpaperId,
      },
      data: {
        downloadCount: {
          increment: 1,
        },
      },
    });

    if (session?.user?.id) {
      await prisma.download.create({
        data: {
          wallpaperId,
          userId: session.user.id,
        },
      });
    }

    revalidatePath("/");

    return {
      success: true,
      message: "Download recorded.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Could not record download.",
    };
  }
};

export default trackWallpaperDownload;
