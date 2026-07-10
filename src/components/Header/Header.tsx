"use client";

import Link from "next/link";
import ThemeToggleButton from "../Buttons/ThemeToggleButton";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcnui/dropdown-menu";

import LogoutHandler from "@/hooks/userLogout";
import { authClient } from "@/lib/auth-client";

import { ChevronDownIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import ProtectedActionButton from "../Buttons/ProtectedActionButton";
import { Button } from "../shadcnui/button";

const Header = () => {
  const { replace } = useRouter();
  const { data, isPending } = authClient.useSession();

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-b shadow backdrop-blur-lg"
      aria-label="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href={"/"}>
          <h1
            className="text-2xl font-semibold"
            aria-label="App Name">
            AuraWall
          </h1>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href={"/"}
            className="text-foreground/70 hover:text-foreground text-sm duration-300">
            Home
          </Link>
          <Link
            href={"/wallpapers"}
            className="text-foreground/70 hover:text-foreground text-sm duration-300">
            Wallpapers
          </Link>
          {/* <Link
            href={data ? "/create" : setIsOpen(true)}
            className="text-foreground/70 hover:text-foreground text-sm duration-300">
            create
          </Link> */}

          <ProtectedActionButton
            route="create"
            className="text-foreground/70 hover:text-foreground m-0 p-0 text-sm duration-300">
            Create
          </ProtectedActionButton>

          {data ?
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="ring-border hover:ring-foreground/30 flex cursor-pointer items-center gap-1 rounded-full p-0.5 pr-2 ring-1 transition-all">
                  <Avatar size="sm">
                    <AvatarImage
                      src={data?.user?.image || ""}
                      alt={data?.user?.name || "User"}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDownIcon className="text-muted-foreground h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className={"w-50"}>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      Hello {data.user.name.split(" ")[0].toUpperCase()}
                    </DropdownMenuLabel>
                    <DropdownMenuLabel>{data.user.email}</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => replace("/profile")}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => replace("/liked")}>
                      Liked
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => (LogoutHandler(), replace("/"))}>
                      <LogOutIcon />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          : <>
              <Link href={"/auth/signin"}>
                <Button className={""}>Signin</Button>
              </Link>

              <Link href={"/auth/signup"}>
                <Button
                  className={""}
                  variant={"secondary"}>
                  Signup
                </Button>
              </Link>
            </>
          }

          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};

export default Header;
