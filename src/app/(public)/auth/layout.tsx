import { LayoutChildrenProps } from "@/lib/types";

const AuthLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <section className="relative min-h-screen w-full">
      {/* Theme-aware background via Tailwind dark: variant */}
      <div className="absolute inset-0 z-0 [background:radial-gradient(125%_125%_at_50%_90%,#fff_40%,#6366f1_100%)] dark:[background:radial-gradient(125%_125%_at_50%_90%,#000000_40%,#0d1a36_100%)]" />

      {children}
    </section>
  );
};

export default AuthLayout;
