"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/database/dbClient";
import { headers } from "next/headers";

const toggleLike = async (wallpaperId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        userAuthentication: false,
        liked: false,
        likesCount: 0,
        message: "Please login first.",
      };
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_wallpaperId: {
          userId: session.user.id,
          wallpaperId,
        },
      },
    });

    let liked = false;

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_wallpaperId: {
            userId: session.user.id,
            wallpaperId,
          },
        },
      });

      liked = false;
    } else {
      await prisma.like.create({
        data: {
          userId: session.user.id,
          wallpaperId,
        },
      });

      liked = true;
    }

    const likesCount = await prisma.like.count({
      where: {
        wallpaperId,
      },
    });

    return {
      success: true,
      userAuthentication: true,
      liked,
      likesCount,
      message: liked ? "Wallpaper liked." : "Like removed.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
};

export default toggleLike;
