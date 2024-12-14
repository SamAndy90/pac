"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { getDefaults } from "@/lib/zod";
import { Button } from "@/common/UI/Button";
import { Title } from "@/common";
import { FormTextInput } from "@/common/FormInputs";
import { CMSFormData } from "@/lib/actions";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email().default(""),
});

type Form = z.infer<typeof formSchema>;

type JournalPostFormProps = {
  data: CMSFormData;
  onClose: () => void;
};

export function JournalPostForm({ data, onClose }: JournalPostFormProps) {
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

    try {
      const res = await fetch("api/subscribe", {
        method: "POST",
        body: JSON.stringify(data),
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

          <div className={"flex flex-col gap-y-6 md:gap-y-10"}>
            <div className={"flex flex-col gap-y-4 md:gap-y-5"}>
              <FormTextInput<Form>
                fieldName={"email"}
                label={"Email"}
                placeholder={"Please write your email here"}
              />
            </div>

            <Button
              type={"submit"}
              className={"border-pka_blue2"}
              fullWidth
              loading={loading}
            >
              {submit_button_text}
            </Button>
          </div>
          {success && (
            <p className={"mt-3 text-center text-pka_blue"}>{success}</p>
          )}
          {!error && <p className={"mt-3 text-center text-red-500"}>{error}</p>}
        </div>
      </form>
    </FormProvider>
  );
}
