import UploadWallpaperForm from "@/components/Forms/UploadWallpaperForm";
import prisma from "@/lib/database/dbClient";

const page = async () => {
  const CtData = await prisma.category.findMany();

  return (
    <section className="grid h-dvh place-items-center">
      <div className="w-full p-5">
        <UploadWallpaperForm categoryData={CtData} />
      </div>
    </section>
  );
};

export default page;
