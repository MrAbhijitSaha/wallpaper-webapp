import { ReactNode } from "react";
import z from "zod";
import {
  signInFormSchema,
  signUpFormSchema,
  wallpaperUploadFormSchema,
} from "./zodSchema";

export type LayoutChildrenProps = Readonly<{
  children: ReactNode;
}>;
export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;
export type SignInFormSchemaType = z.infer<typeof signInFormSchema>;
export type WallpaperUploadFormSchemaType = z.infer<
  typeof wallpaperUploadFormSchema
>;

export type ProtectedActionButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: string;
  onClick: () => void;
};

export type SignInFormProps = {
  onSuccess?: () => void;
};
