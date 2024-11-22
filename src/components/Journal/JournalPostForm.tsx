import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { getDefaults } from "@/lib/zod";
import { Button } from "@/common/UI/Button";
import { DataFetcherErrorAlert } from "@/common/DataFetcherErrorAlert";
import { Title } from "@/common";
import { FormTextInput } from "@/common/FormInputs";
import { FormSelectInput } from "@/common/FormInputs/FormSelectInput";

const formSchema = z.object({
  title: z.string().default(""),
  paragraphs: z.string().default(""),
  article: z.string().default("news"),
});

type Form = z.infer<typeof formSchema>;

export function JournalPostForm() {
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
          <Title className={"text-center"}>formName</Title>

          <div className={"flex flex-col gap-y-6 md:gap-y-10"}>
            <div className={"flex flex-col gap-y-4 md:gap-y-5"}>
              <FormTextInput<Form> fieldName={"title"} label={"Title"} />
              <FormTextInput<Form>
                fieldName={"paragraphs"}
                label={"Paragraphs"}
                multiline={true}
              />
              <FormSelectInput
                label={"Article"}
                display={"Choose"}
                fieldName={"article"}
                options={[
                  { label: "Company", value: "company" },
                  { label: "Team", value: "team" },
                  { label: "Project", value: "project" },
                ]}
              />

              {/* <DataFetcherErrorAlert isError={} error={} /> */}
            </div>

            <Button
              type={"submit"}
              className={"border-pka_blue2"}
              fullWidth
              loading={isLoading}
            >
              Create post
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
