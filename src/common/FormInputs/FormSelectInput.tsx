import { path } from "ramda";
import {
  Controller,
  FieldError,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";
import { USelectInput, USelectInputProps } from "../Inputs/USelectInput";

export type FormSelectInputProps<T> = {
  fieldName: Path<T>;
} & Omit<USelectInputProps, "value" | "onChange">;

export function FormSelectInput<T extends FieldValues>(
  props: FormSelectInputProps<T>
) {
  const { fieldName, multiple, ...selectInputProps } = props;
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, formState: { errors } }) => {
        const { value, onChange } = field;
        const error = path<FieldError>(fieldName.split("."), errors);

        return (
          <USelectInput
            {...(multiple
              ? {
                  value: value ?? [],
                  multiple: true,
                }
              : {
                  value: value ?? "",
                })}
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
