import z from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1).default("file:./dev.db"),
  BETTER_AUTH_SECRET: z.string().min(1).default("dev-secret-change-me"),
  BETTER_AUTH_URL: z.string().min(1).default("http://localhost:3000"),
});

const serverEnvVars = {
  DATABASE_URL: process.env.DATABASE_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
};

export const serverEnv = serverEnvSchema.parse(serverEnvVars);
