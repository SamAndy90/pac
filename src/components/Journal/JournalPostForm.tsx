"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { getDefaults } from "@/lib/zod";
import { Button } from "@/common/UI/Button";
import { Title } from "@/common";
import { FormSelectInput, FormTextInput } from "@/common/FormInputs";
import { CMSFormData } from "@/lib/actions";
import { useEffect, useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { twMerge } from "tailwind-merge";
import { FiUpload } from "react-icons/fi";
import { log } from "node:console";

const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must contain at least 3 characters")
    .default(""),
  category: z.string().min(1, "Choose the category please").default(""),
  description: z
    .string()
    .min(30, "Description must contain at least 30 characters")
    .default(""),
  email: z.string().email().default(""),
});

type Form = z.infer<typeof formSchema>;

type JournalPostFormProps = {
  data: CMSFormData;
  onClose: () => void;
};

export function JournalPostForm({ data, onClose }: JournalPostFormProps) {
  const [images, setImages] = useState<string[]>([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { form_title = "Form Title", submit_button_text = "Submit" } = data;
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaults(formSchema),
  });

  async function onSubmit(data: Form) {
    setSuccess("");
    setError("");
    setLoading(true);

    const fullData = {
      ...data,
      category: CategoriesData.find((c) => c.value === data.category)?.label,
      images,
      createdAt: new Date().toLocaleDateString(),
    };

    try {
      const res = await fetch("api/subscribe", {
        method: "POST",
        body: JSON.stringify(fullData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { message } = await res.json();

      setSuccess(message);
      setLoading(false);

      form.reset();

      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 4000);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err?.message);
      }
    }

    form.reset();
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={"flex flex-col gap-y-6 md:gap-y-8"}>
          <Title className={"text-center"}>{form_title}</Title>

          <div className={"flex flex-col items-center gap-y-6 md:gap-y-10"}>
            <div className={"flex flex-col gap-y-4 md:gap-y-5 w-full"}>
              <FormTextInput<Form>
                fieldName={"title"}
                label={"Title"}
                placeholder={"Name your adventure"}
              />
              <FormSelectInput
                fieldName={"category"}
                options={CategoriesData}
                label={"Category"}
                display={"Choose the category"}
              />
              <FormTextInput<Form>
                fieldName={"description"}
                label={"Text"}
                placeholder={"Describe your adventure"}
                multiline={true}
              />
              <FormTextInput<Form>
                fieldName={"email"}
                label={"Email"}
                placeholder={"Please write your email"}
              />
              <UploadDropzone
                endpoint="imageUploader"
                onUploadBegin={() => {
                  setLoading(true);
                  setError("");
                }}
                onClientUploadComplete={(res) => {
                  const imgUrls = res.map((imgData) => imgData.url);
                  setImages(imgUrls);
                  setLoading(false);
                }}
                onUploadError={(error: Error) => {
                  console.log(`ERROR! ${error.message}`);
                  setError(error.message);
                }}
                config={{ cn: twMerge }}
                className={
                  " mt-0 px-3 py-5 border-solid hover:border-pka_blue border-pka_blue/30 transition-all duration-300 ut-upload-icon:text-pka_blue ut-label:text-base ut-label:text-pka_blue ut-label:hover:text-pka_green ut-label:transition-all ut-label:duration-300 ut-allowed-content:text-xs ut-allowed-content:text-pka_blue2/50 ut-button:bg-pka_blue2 ut-button:ut-uploading:bg-pka_blue2/50 ut-button:after:bg-pka_green ut-button:ring-0"
                }
              />
            </div>

            <Button
              type={"submit"}
              className={"border-pka_blue2"}
              loading={loading}
            >
              {submit_button_text}
            </Button>
          </div>
        </div>
        {success && (
          <p className={"mt-4 mb-2 text-center text-pka_blue"}>{success}</p>
        )}
        {error && (
          <p className={"mt-4 mb-2 text-center text-red-500"}>{error}</p>
        )}
      </form>
    </FormProvider>
  );
}

export const CategoriesData = [
  {
    label: "Sweepstakes Insights",
    value: "sweepstakes_insights",
  },
  {
    label: "Adventure Stories",
    value: "adventure_stories",
  },
  {
    label: "Community & Service",
    value: "community_&_service",
  },
  {
    label: "Outdoor Gear & Lifestyle",
    value: "outdoor_gear_&_lifestyle",
  },
  {
    label: "Transparency & Accountability",
    value: "transparency_&_accountability",
  },
  {
    label: "Tips & How-Tos",
    value: "tips_&_how-tos",
  },
];
