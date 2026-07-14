"use server";

import prisma from "@/lib/database/dbClient";
import { CategoryFormSchemaType } from "@/lib/types";

const createCategoryAction = async ({ category }: CategoryFormSchemaType) => {
  try {
    await prisma.category.create({
      data: {
        categoryName: category.toLowerCase(),
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default createCategoryAction;
