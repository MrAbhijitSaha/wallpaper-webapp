"use client";

import { WallpaperUploadFormSchemaType } from "@/lib/types";
import { wallpaperUploadFormSchema } from "@/lib/zodSchema";
import { uploadWallpaperAction } from "@/server/uploadWallpaperAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Loader2Icon, UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFilePicker } from "use-file-picker";
import { Category } from "../../../generated/prisma/browser";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../shadcnui/select";

type UploadWallpaperFormProps = {
  categoryData: Category[];
};

const UploadWallpaperForm = ({ categoryData }: UploadWallpaperFormProps) => {
  const [isFile, setIsFile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(wallpaperUploadFormSchema),
    defaultValues: {
      title: "",
      category: "",
    },
    mode: "all",
  });

  const { openFilePicker, plainFiles, filesContent, clear } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    maxFileSize: 50,
    onFilesSuccessfullySelected: () => setIsFile(true),
    onClear: () => setIsFile(false),
  });

  const handleUploadWallpaperForm = async (
    value: WallpaperUploadFormSchemaType,
  ) => {
    await uploadWallpaperAction(value, plainFiles[0]);
  };

  return (
    <form
      onSubmit={handleSubmit(handleUploadWallpaperForm)}
      className="mx-auto grid max-w-xl gap-6"
      noValidate>
      {/* File Picker */}
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
          Image
        </p>

        {!isFile ?
          <div
            onClick={() => openFilePicker()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openFilePicker();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              // drag-and-drop is handled by useFilePicker internally;
              // this just resets the drag state visually
            }}
            role="button"
            tabIndex={0}
            aria-label="Select an image file"
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-12 text-center transition-all duration-200 ${
              isDragging ?
                "border-primary bg-primary/5 text-primary"
              : "border-border hover:border-primary/50 hover:bg-accent/30"
            } `}>
            <UploadIcon
              className={`size-5 transition-colors duration-200 ${
                isDragging ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">
                Drop image here or{" "}
                <span className="text-foreground underline-offset-2 hover:underline">
                  click to browse
                </span>
              </p>
              <p className="text-muted-foreground/60 font-mono text-[11px]">
                JPG, PNG, WEBP — max 50 MB
              </p>
            </div>
          </div>
        : <div className="border-border relative aspect-video w-full overflow-hidden rounded-xl border">
            {filesContent.map((file, idx) => (
              <Image
                key={idx}
                src={file.content}
                alt={file.name}
                fill
                unoptimized
                className="object-cover"
              />
            ))}
            <button
              type="button"
              onClick={() => clear()}
              className="border-border bg-background/80 text-muted-foreground hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive absolute top-2.5 right-2.5 rounded-full border p-1.5 backdrop-blur-sm transition-all duration-150"
              aria-label="Remove selected file">
              <XIcon className="size-3.5" />
            </button>
          </div>
        }
      </div>

      {/* Divider */}
      <div className="bg-border h-px" />

      {/* Title */}
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor={field.name}
              className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
              Title
            </FieldLabel>

            <Input
              {...field}
              id={field.name}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder="Enter wallpaper title"
              autoComplete="off"
              className="border-border placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:ring-primary/20 bg-transparent transition-all duration-200 focus-visible:ring-1"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Category */}
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor={field.name}
              className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
              Category
            </FieldLabel>

            <Select
              value={field.value}
              onValueChange={field.onChange}
              aria-invalid={fieldState.invalid}>
              <SelectTrigger className="border-border focus:border-primary focus:ring-primary/20 w-full bg-transparent transition-all duration-200 focus:ring-1">
                <span
                  data-slot="select-value"
                  className={
                    field.value ? "text-foreground" : "text-muted-foreground/50"
                  }>
                  {categoryData.find((cat) => cat.id === field.value)
                    ?.categoryName ?? "Select a category"}
                </span>
              </SelectTrigger>

              <SelectContent className="border-border bg-background/95 backdrop-blur-sm">
                {categoryData.length === 0 ?
                  <SelectItem
                    value=""
                    disabled>
                    No categories available
                  </SelectItem>
                : categoryData.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className="focus:bg-accent/50 transition-colors duration-100">
                      {category.categoryName}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Divider */}
      <div className="bg-border h-px" />

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting || plainFiles.length === 0}
        variant="outline"
        className={`w-full border transition-all duration-200 ${
          isSubmitSuccessful ?
            "border-green-500/30 bg-green-500/5 text-green-600 hover:bg-green-500/10"
          : "border-primary/30 text-primary hover:bg-primary/5"
        } `}>
        {isSubmitting ?
          <>
            <Loader2Icon className="size-4 animate-spin" />
            Uploading...
          </>
        : isSubmitSuccessful ?
          <>
            <CheckIcon className="size-4" />
            Uploaded
          </>
        : <>
            <UploadIcon className="size-4" />
            Upload wallpaper
          </>
        }
      </Button>
    </form>
  );
};

export default UploadWallpaperForm;
