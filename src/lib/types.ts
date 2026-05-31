import z from "zod";
import { signInFormSchema, signUpFormSchema } from "./zodSchema";

export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;
export type SignInFormSchemaType = z.infer<typeof signInFormSchema>;
