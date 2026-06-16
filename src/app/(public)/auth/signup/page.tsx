import SignUpForm from "@/components/Forms/SignUpForm";
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
    <div className="grid h-dvh w-full grid-cols-2 place-items-center">
      <Card className="border-foreground/20 text-foreground/60 absolute w-xl border bg-transparent shadow-2xl backdrop-blur-3xl">
        <CardHeader>
          <CardTitle className="text-foreground text-3xl font-semibold">
            Sign Up now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter className="text-foreground/60 group">
          Already have an account. &nbsp;
          <Link
            href={"/auth/signin"}
            className="group-hover:text-foreground underline underline-offset-2 duration-300">
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
