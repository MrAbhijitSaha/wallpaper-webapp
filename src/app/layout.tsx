import Header from "@/components/Header/Header";
import ThemeProvider from "@/components/Providers/ThemeProvider";
import { Toaster } from "@/components/shadcnui/sonner";
import { geistSans } from "@/lib/fonts";
import { buildMetadata } from "@/lib/seo";

import SigninFormDialog from "@/components/Dialog/LoginFormDialog";
import { LayoutChildrenProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = buildMetadata({
  title: "Wallpapers curated for every screen",
  description:
    "Discover a modern wallpaper collection with curated themes, quick browsing, and seamless sharing.",
  path: "/",
});

const RootLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <html
      lang="en"
      className={cn("font-sans", geistSans.variable)}
      suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen">
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem>
          <div className="fixed inset-0 -z-10 [background:radial-gradient(125%_125%_at_50%_90%,#fff_40%,#6366f1_100%)] dark:[background:radial-gradient(125%_125%_at_50%_90%,#000000_40%,#0d1a36_100%)]" />
          <Header />
          <SigninFormDialog />

          <main>{children}</main>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
