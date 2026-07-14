import { auth } from "@/lib/auth";
import { LayoutChildrenProps } from "@/lib/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({ children }: LayoutChildrenProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }
  return <div className="mx-auto max-w-7xl">{children}</div>;
};

export default ProtectedLayout;
