import { ReactNode } from "react";
import z from "zod";
import {
  createCategoryFormSchema,
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
export type CategoryFormSchemaType = z.infer<typeof createCategoryFormSchema>;

export type ProtectedActionButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: string;
  route: string;
};

export type SignInFormProps = {
  onSuccess?: () => void;
};
