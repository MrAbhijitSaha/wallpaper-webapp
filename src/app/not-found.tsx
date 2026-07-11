import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Page not found",
  description: "The page you were looking for could not be found.",
  path: "/not-found",
});

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-sm font-medium tracking-[0.25em] text-violet-500 uppercase">
        404
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-xl text-base text-neutral-600 dark:text-neutral-300">
        The page you were looking for may have moved or no longer exists. Head
        back to the gallery and keep exploring.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">
        Return home
      </Link>
    </main>
  );
}
