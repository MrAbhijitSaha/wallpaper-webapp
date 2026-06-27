import prisma from "@/lib/database/dbClient";

const getCategory = async () => {
  try {
    const categoriesData = await prisma.category.findMany();
    return categoriesData;
  } catch (error) {
    console.log(error);
  }
};

export default getCategory;
