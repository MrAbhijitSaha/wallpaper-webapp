import z from "zod";
import {
  signInFormSchema,
  signUpFormSchema,
  wallpaperUploadFormSchema,
} from "./zodSchema";

export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;
export type SignInFormSchemaType = z.infer<typeof signInFormSchema>;
export type WallpaperUploadFormSchemaType = z.infer<
  typeof wallpaperUploadFormSchema
>;
