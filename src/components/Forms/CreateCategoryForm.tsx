"use client";

import { CategoryFormSchemaType } from "@/lib/types";

import createCategoryAction from "@/server/createCategoryAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, UploadIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { createCategoryFormSchema } from "../../lib/zodSchema";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const CreateCategoryForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      category: "",
    },
    mode: "all",
  });

  const handleCreateCategoryFormSubmit = (value: CategoryFormSchemaType) => {
    createCategoryAction(value);
  };

  return (
    <form onSubmit={handleSubmit(handleCreateCategoryFormSubmit)}>
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Category</FieldLabel>

            <Input
              {...field}
              id={field.name}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder="Enter Category Nmae"
              autoComplete="off"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full">
        {isSubmitting ?
          <>
            <Loader2Icon className="animate-spin" /> Uploading..
          </>
        : <>
            <UploadIcon /> Upload Wallpaper
          </>
        }
      </Button>
    </form>
  );
};

export default CreateCategoryForm;
