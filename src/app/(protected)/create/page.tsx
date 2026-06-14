import UploadWallpaperForm from "@/components/Forms/UploadWallpaperForm";

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <div className="w-full p-5">
        <UploadWallpaperForm />
      </div>
    </section>
  );
};

export default page;
