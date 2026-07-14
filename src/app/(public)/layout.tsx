import { ReactNode } from "react";

type LayoutChildrenProps = Readonly<{
  children: ReactNode;

  wallpaperModal: ReactNode;
}>;

const layout = ({ children, wallpaperModal }: LayoutChildrenProps) => {
  return (
    <>
      {children}
      {wallpaperModal}
    </>
  );
};

export default layout;
