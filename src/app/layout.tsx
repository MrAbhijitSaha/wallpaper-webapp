import Header from "@/components/Header/Header";
import ThemeProvider from "@/components/Providers/ThemeProvider";
import { Toaster } from "@/components/shadcnui/sonner";
import { geistSans } from "@/lib/fonts";
import { LayoutChildrenProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import "./globals.css";

const RootLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <html
      lang="en"
      className={cn("font-sans", geistSans.variable)}
      suppressHydrationWarning>
      <body className="">
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem>
          <div className="fixed inset-0 -z-10 [background:radial-gradient(125%_125%_at_50%_90%,#fff_40%,#6366f1_100%)] dark:[background:radial-gradient(125%_125%_at_50%_90%,#000000_40%,#0d1a36_100%)]" />
          <Header />

          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
