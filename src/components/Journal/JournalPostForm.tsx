import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { getDefaults } from "@/lib/zod";
import { Button } from "@/common/UI/Button";
import { DataFetcherErrorAlert } from "@/common/DataFetcherErrorAlert";
import { Title } from "@/common";
import { FormTextInput } from "@/common/FormInputs";
import { CMSFormData } from "@/lib/actions";

const formSchema = z.object({
  email: z.string().email().default(""),
});

type Form = z.infer<typeof formSchema>;

type JournalPostFormProps = {
  data: CMSFormData;
};

export function JournalPostForm({ data }: JournalPostFormProps) {
  const { form_title = "Form Title", submit_button_text = "Submit" } = data;
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaults(formSchema),
  });

  function onSubmit(data: Form) {
    console.log({ data });

    // registration.mutate(
    //   {
    //     title: data.email,
    //   },
    //   {
    //     onSuccess: () => {},
    //   }
    // );
    form.reset();
  }

  const isLoading = form.formState.isLoading;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={"flex flex-col gap-y-6 md:gap-y-8"}>
          <Title className={"text-center"}>{form_title}</Title>

          <div className={"flex flex-col gap-y-6 md:gap-y-10"}>
            <div className={"flex flex-col gap-y-4 md:gap-y-5"}>
              <FormTextInput<Form> fieldName={"email"} label={"Email"} />
              {/* <DataFetcherErrorAlert isError={} error={} /> */}
            </div>

            <Button
              type={"submit"}
              className={"border-pka_blue2"}
              fullWidth
              loading={isLoading}
            >
              {submit_button_text}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
