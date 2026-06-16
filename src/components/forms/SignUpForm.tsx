"use client";

import userSignup from "@/hooks/userSignup";
import { SignUpFormSchemaType } from "@/lib/types";
import { signUpFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import { toast } from "sonner";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const SignUpForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isLoading },
  } = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const handleSignupFormSubmit = async (value: SignUpFormSchemaType) => {
    const { isSuccess, message } = await userSignup(value);

    console.log(isSuccess, message);

    if (isSuccess) {
      toast.success(message);
      reset();
      redirect("/auth/signin");
    } else {
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignupFormSubmit)}
      className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Controller
          name="firstName"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="first-name"
                className="text-lg">
                First name
              </FieldLabel>
              <Input
                {...field}
                id="first-name"
                aria-invalid={fieldState.invalid}
                placeholder="Please enter your first name"
                autoComplete="given-name"
                className="py-6"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="lastName"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="last-name"
                className="text-lg">
                Last name
              </FieldLabel>
              <Input
                {...field}
                id="last-name"
                aria-invalid={fieldState.invalid}
                placeholder="Please enter your last name"
                autoComplete="family-name"
                className="py-6"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

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

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="confirmPassword"
              className="text-lg">
              Confrim Password
            </FieldLabel>
            <Input
              {...field}
              id="confirmPassword"
              aria-invalid={fieldState.invalid}
              placeholder="Please confirm your Password"
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
            <Loader2Icon className="animate-spin" /> Sign Up...
          </>
        : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpForm;
