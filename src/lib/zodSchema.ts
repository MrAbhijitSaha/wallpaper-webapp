import z from "zod";

export const signUpFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { error: "Name can't be less than 2 charecters" })
      .max(15, { error: "Name can't be more than 15 charecters" }),
    lastName: z
      .string()
      .min(3, { error: "Last name can't be less than 3 charecters" })
      .max(15, { error: "Last name can't be more than 15 charecters" }),
    email: z.email({ error: "Invalid email adress" }),
    password: z
      .string()
      .min(8, { error: "Your password must be at last 8 charecters" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Your password must be at last 8 charecters" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInFormSchema = z.object({
  email: z.email({ error: "Invalid email adress" }),
  password: z
    .string()
    .min(8, { error: "Your password must be at last 8 charecters" }),
  rememberMe: z.boolean(),
});

export const wallpaperUploadFormSchema = z.object({
  title: z.string().min(3, { error: "Title must be at least 3 characters" }),
  category: z.string().min(1, { error: "Please select a category" }),
});

export const createCategoryFormSchema = z.object({
  category: z.string().min(1, { error: "Please select a category" }),
});
