"use client";

import { SignInFormSchemaType } from "@/lib/types";
import { signInFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const SignInForm = () => {
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
    },
    mode: "all",
  });

  const handleSignInFormSubmit = (value: SignInFormSchemaType) => {
    console.log(value);
    reset();
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
              className="py-6"
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
              className="py-6"
            />
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
