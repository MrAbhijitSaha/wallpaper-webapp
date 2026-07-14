import z from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_BETTER_AUTH_URL: z
    .string()
    .min(1)
    .default("http://localhost:3000"),
});

const clientEnvVars = {
  NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
};

export const clientEnv = clientEnvSchema.parse(clientEnvVars);
