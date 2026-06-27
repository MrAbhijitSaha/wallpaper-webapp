"use server";

import prisma from "@/lib/database/dbClient";
import { WallpaperUploadFormSchemaType } from "@/lib/types";
import { nanoid } from "nanoid";
import sharp from "sharp";

export async function uploadWallpaperAction(
  { title, category }: WallpaperUploadFormSchemaType,
  imageUrl: File,
) {
  try {
    const imgBuffer = await imageUrl.arrayBuffer();
    const imgId = `${nanoid(8)}.jpeg`;
    await sharp(imgBuffer)
      .jpeg({
        mozjpeg: true,
        quality: 90,
      })
      .toFile(`./public/${imgId}`);

    const user = await prisma.user.findFirst();
    if (!user) {
      throw new Error("No user found for wallpaper upload");
    }

    const wallpaper = await prisma.wallpaper.create({
      data: {
        title: title,
        category: {
          connect: {
            id: category,
          },
        },
        image: imgId,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return wallpaper;
  } catch (error) {
    console.error("Upload error:", error);
    return { error: "Failed to upload wallpaper" };
  }
}
