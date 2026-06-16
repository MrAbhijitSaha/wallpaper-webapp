import SignInForm from "@/components/Forms/SignInForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import Link from "next/link";

const page = () => {
  return (
    <section className="grid h-dvh w-full grid-cols-2 place-items-center">
      <Card className="border-foreground/20 text-foreground/60 absolute w-xl border bg-transparent shadow-2xl backdrop-blur-3xl">
        <CardHeader>
          <CardTitle className="text-foreground text-3xl font-semibold">
            Sign In now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter className="text-foreground/60 group">
          Already have an account. &nbsp;
          <Link
            href={"/auth/signup"}
            className="group-hover:text-foreground underline underline-offset-2 duration-300">
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default page;
