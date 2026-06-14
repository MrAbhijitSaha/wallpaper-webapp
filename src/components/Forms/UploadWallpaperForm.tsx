"use client";

import { WallpaperUploadFormSchemaType } from "@/lib/types";
import { wallpaperUploadFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFilePicker } from "use-file-picker";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../shadcnui/select";

const categories = [
  {
    id: "01",
    name: "Anime",
    value: "anime",
  },
  {
    id: "02",
    name: "Nature",
    value: "nature",
  },
  {
    id: "03",
    name: "3D",
    value: "3d",
  },
  {
    id: "04",
    name: "Action",
    value: "Action",
  },
  {
    id: "05",
    name: "Anime",
    value: "anime",
  },
  {
    id: "06",
    name: "Cool",
    value: "cool",
  },
];

const UploadWallpaperForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFile, setIsFile] = useState(false);

  const { control, handleSubmit } = useForm({
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

  const handleUploadwallpaperForm = (value: WallpaperUploadFormSchemaType) => {
    console.log(value);
    console.log(filesContent);
    console.log(plainFiles);
  };

  return (
    <form
      onSubmit={handleSubmit(handleUploadwallpaperForm)}
      className="mx-auto grid max-w-2xl gap-6"
      noValidate>
      {/* File Picker */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Image</p>

        {!isFile ?
          <div
            onClick={() => openFilePicker()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                openFilePicker();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Select an image file"
            className="hover:border-primary flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 transition-colors">
            <UploadIcon className="text-muted-foreground size-8" />

            <p className="text-muted-foreground text-sm">
              Click to select an image
            </p>

            <p className="text-muted-foreground text-xs">Max file size: 50MB</p>
          </div>
        : <div className="relative aspect-video w-full">
            {filesContent.map((file, idx) => (
              <Image
                key={idx}
                src={file.content}
                alt={file.name}
                fill
                unoptimized
                className="rounded-lg object-cover"
              />
            ))}

            <button
              type="button"
              onClick={() => clear()}
              className="bg-background/80 hover:bg-background absolute top-2 right-2 rounded-full p-1.5 transition-colors"
              aria-label="Remove selected file">
              <XIcon className="size-4" />
            </button>
          </div>
        }
      </div>

      {/* Title */}
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Title</FieldLabel>

            <Input
              {...field}
              id={field.name}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder="Enter wallpaper title"
              autoComplete="off"
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
            <FieldLabel htmlFor={field.name}>Category</FieldLabel>

            <Select
              value={field.value}
              onValueChange={field.onChange}
              aria-invalid={fieldState.invalid}>
              <SelectTrigger className="w-full">
                <span data-slot="select-value">
                  {categories.find((cat) => cat.id === field.value)?.name ||
                    "Select a category"}
                </span>
              </SelectTrigger>

              <SelectContent>
                {categories.length === 0 ?
                  <SelectItem
                    value=""
                    disabled>
                    No categories available
                  </SelectItem>
                : categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting || plainFiles.length === 0}
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

export default UploadWallpaperForm;
