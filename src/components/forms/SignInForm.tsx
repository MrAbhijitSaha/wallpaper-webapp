"use client";

import userSignin from "@/hooks/userSignin";
import { SignInFormSchemaType } from "@/lib/types";
import { signInFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { signinDialogAtom } from "@/lib/globalState";
import { useSetAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../shadcnui/button";
import { Checkbox } from "../shadcnui/checkbox";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const SignInForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const setSigninDialog = useSetAtom(signinDialogAtom);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isLoading },
  } = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    mode: "all",
  });

  const handleSignInFormSubmit = async (value: SignInFormSchemaType) => {
    const { isSuccess, message } = await userSignin(value);
    if (isSuccess) {
      setSigninDialog(false);
      toast.success(message);
      reset();
      if (pathname === "/auth/signin") {
        router.replace("/");
      }
    } else {
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignInFormSubmit)}
      className="space-y-4">
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="email"
              className="text-lg">
              Email
            </FieldLabel>
            <Input
              {...field}
              id="email"
              aria-invalid={fieldState.invalid}
              placeholder="Please enter your email address"
              autoComplete="email"
              className="text-foreground py-6"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="password"
              className="text-lg">
              Password
            </FieldLabel>
            <Input
              {...field}
              id="password"
              aria-invalid={fieldState.invalid}
              placeholder="Please enter password"
              autoComplete="off"
              className="text-foreground py-6"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="rememberMe"
        control={control}
        render={({ field, fieldState }) => (
          <Field orientation="horizontal">
            <Checkbox
              id="rememberMe"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <FieldLabel htmlFor="rememberMe">Remember Me</FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        type="submit"
        className={"w-full py-6"}
        disabled={isLoading}>
        {isLoading ?
          <>
            <Loader2Icon className="animate-spin" /> Sign In...
          </>
        : "Sign In"}
      </Button>
    </form>
  );
};

export default SignInForm;
