"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { getDefaults } from "@/lib/zod";
import { NewButton } from "../ui/NewButton";
import { FormSelectInput } from "@/common/FormInputs/FormSelectInput";
import { Title } from "@/common";
import { Option } from "@/common/Inputs/SelectInput";

export const positionSchema = z.object({
  // position: z.string().default(""),
  position: z.object({
    value: z.string().default(""),
    label: z.string().default(""),
  }),
});

type Form = z.infer<typeof positionSchema>;

export type PositionFormProps = {
  list: Option[];
};

export function PositionForm({ list }: PositionFormProps) {
  const router = useRouter();

  const form = useForm<Form>({
    resolver: zodResolver(positionSchema),
    defaultValues: getDefaults(positionSchema),
  });
  function onSubmit(data: Form) {
    // TODO
    // ...

    form.reset();
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Title className={"mb-[62px] text-3xl"}>Select entry position</Title>
        <div className={"mb-[72px] flex flex-col gap-y-6 md:mb-24"}>
          <FormSelectInput
            label={"Position"}
            display={"Choose position"}
            fieldName={"position"}
            options={list}
          />
        </div>
        <NewButton
          type={"submit"}
          colorVariant={"black"}
          fullWidth
          className={"sm:w-auto"}
        >
          Enter to win
        </NewButton>
      </form>
    </FormProvider>
  );
}
