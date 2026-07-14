"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { WallpaperUploadFormSchemaType } from "@/lib/types";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
import sharp from "sharp";

export async function uploadWallpaperAction(
  { title, category }: WallpaperUploadFormSchemaType,
  imageUrl: File,
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { error: "You must be logged in to upload a wallpaper" };
    }

    const imgBuffer = await imageUrl.arrayBuffer();
    const imgId = `${nanoid(8)}.jpeg`;
    await sharp(imgBuffer)
      .jpeg({
        mozjpeg: true,
        quality: 90,
      })
      .toFile(`./public/${imgId}`);

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
            id: session.user.id,
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
