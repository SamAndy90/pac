import { path } from "ramda";

import { SelectInput, SelectInputProps } from "@/components/ui/Inputs";
import {
  Controller,
  FieldError,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

export type FormSelectInputProps<T> = {
  fieldName: Path<T>;
} & Omit<SelectInputProps, "value" | "onChange">;

export function FormSelectInput<T extends FieldValues>(
  props: FormSelectInputProps<T>
) {
  const { fieldName, ...selectInputProps } = props;
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, formState: { errors } }) => {
        const { value, onChange } = field;
        const error = path<FieldError>(fieldName.split("."), errors);

        return (
          <SelectInput
            value={value}
            {...selectInputProps}
            onChange={onChange}
            error={!!error}
            helperText={error?.message}
          />
        );
      }}
    />
  );
}
