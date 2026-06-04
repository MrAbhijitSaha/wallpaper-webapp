import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./database/dbClient";
import { serverEnv } from "./env/serverEnv";

export const auth = betterAuth({
  secret: serverEnv.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },
  advanced: {
    cookiePrefix: "ta",
  },
});
