"use client";

import { Title } from "@/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { FormSelectInput } from "./FormSelectInput";
import { NewButton } from "../NewButton";
import { getDefaults } from "@/lib/zod";
import { Option } from "./SelectInput";

export const positionSchema = z.object({
  position: z.number().default(1),
});

type Form = z.infer<typeof positionSchema>;

export type PositionFormType = {
  list: Option[];
};

export function PositionForm({ list }: PositionFormType) {
  const router = useRouter();

  const form = useForm<Form>({
    resolver: zodResolver(positionSchema),
    defaultValues: getDefaults(positionSchema),
  });
  function onSubmit(data: Form) {
    form.reset();
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Title className={"mb-[62px] text-3xl"}>Select entry position</Title>
        <div className={"mb-[72px] flex flex-col gap-y-6 md:mb-24"}>
          <FormSelectInput
            label={"Choose a position"}
            fieldName={"position"}
            options={list}
          />
        </div>
        <NewButton type={"submit"} colorVariant={"black"} fullWidth>
          Enter to Win
        </NewButton>
      </form>
    </FormProvider>
  );
}
