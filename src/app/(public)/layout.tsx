import { ReactNode } from "react";

type LayoutChildrenProps = Readonly<{
  children: ReactNode;
  authModal: ReactNode;
}>;

const layout = ({ authModal, children }: LayoutChildrenProps) => {
  return (
    <>
      {authModal}
      {children}
    </>
  );
};

export default layout;
