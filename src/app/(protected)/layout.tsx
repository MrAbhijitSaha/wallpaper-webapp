import { LayoutChildrenProps } from "@/lib/types";

const ProtectedLayout = ({ children }: LayoutChildrenProps) => {
  return <div className="mx-auto max-w-7xl">{children}</div>;
};

export default ProtectedLayout;
