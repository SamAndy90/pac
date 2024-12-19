import { cn } from "@/lib/utils";
import { forwardRef, useId, useState } from "react";

type BaseProps = {
  label?: string;
  className?: {
    label?: string;
    inputWrapper?: string;
    input?: string;
  };
  helperText?: string;
  error?: boolean;
  endAdornment?: React.ReactNode;
};

export type TextInputProps =
  | ({
      multiline?: false;
    } & BaseProps &
      Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">)
  | ({
      multiline: true;
    } & BaseProps &
      Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className">);

export const TextInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextInputProps
>((props, ref) => {
  const {
    label,
    className = {},
    helperText,
    error,
    endAdornment,
    multiline = false,
    ...inputProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const id = useId();

  const Component = multiline ? "textarea" : "input";

  return (
    <div className={"flex flex-col gap-y-2"}>
      {label && (
        <label htmlFor={id} className={cn("text-pka_blue2", className?.label)}>
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex flex-nowrap items-center overflow-hidden rounded-xl border transition duration-300",
          {
            "border-red-500": error,
            "hover:border-pka_blue border-pka_blue/30": !isFocused && !error,
            "border-pka_green": isFocused && !error,
          },
          className?.inputWrapper
        )}
      >
        <Component
          id={id}
          className={cn(
            "block flex-1 px-3 py-3.5 outline-0 text-pka_blue placeholder:text-pka_blue2/50",
            { "min-h-32": multiline },
            className?.input
          )}
          // @ts-expect-error ref discrimination error
          ref={ref}
          // @ts-expect-error ref discrimination error
          type={multiline ? undefined : inputProps.type ?? "text"}
          {...{
            ...inputProps,
            onFocus: (e) => {
              // @ts-expect-error ref discrimination error
              inputProps?.onFocus?.(e);
              setIsFocused(true);
            },
            onBlur: (e) => {
              // @ts-expect-error ref discrimination error
              inputProps?.onBlur?.(e);
              setIsFocused(false);
            },
          }}
        />

        {endAdornment && <div className={"px-2"}>{endAdornment}</div>}
      </div>

      {helperText && (
        <p
          className={cn("text-sm", {
            "text-red-500": error,
            "text-pka_blue2/60": !error,
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

TextInput.displayName = "TextInput";
