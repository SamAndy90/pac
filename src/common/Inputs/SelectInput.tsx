"use client";

import { cn } from "@/lib/utils";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FiCheck, FiChevronDown } from "react-icons/fi";

export type Option = {
  value: string;
  label: string;
};

type BaseProps = {
  options: Option[];
  display?: string;
  className?: {
    label?: string;
    wrapper?: string;
    button?: string;
  };
  label?: string;
  helperText?: string;
  error?: boolean;
};

export type SelectInputProps =
  | ({
      value: string;
      onChange: (value: string) => void;
      multiple?: false;
    } & BaseProps)
  | ({
      value: string[];
      onChange: (value: string[]) => void;
      multiple: true;
    } & BaseProps);

export function SelectInput(props: SelectInputProps) {
  const {
    value,
    onChange,
    options,
    display = "",
    multiple,
    label,
    helperText,
    error,
    className = {},
  } = props;

  const { label: labelClassName, wrapper, button } = className;

  let displayValue = display;
  if (multiple) {
    const activeOptionsLabel = options
      .filter((i) => value.includes(i.value))
      .map((i) => i.label)
      .join(", ");
    if (activeOptionsLabel) displayValue = activeOptionsLabel;
  } else {
    const activeOptionLabel = options.find((i) => i.value === value)?.label;
    if (activeOptionLabel) displayValue = activeOptionLabel;
  }

  return (
    <div className={cn("flex flex-col gap-y-2", wrapper)}>
      {label && (
        <label className={cn("text-pka_blue2", labelClassName)}>{label}</label>
      )}
      <Listbox
        value={value}
        onChange={onChange}
        multiple={multiple}
        defaultValue={options[0].value}
      >
        <div className={"relative"}>
          <ListboxButton className={cn("w-full")}>
            {({ open, focus }) => (
              <div
                className={cn(
                  "flex items-center justify-between group rounded-full border text-left text-pka_blue transition-colors px-6 py-3.5",
                  {
                    "border-red-500": error,
                    "hover:border-pka_blue border-pka_blue/30":
                      !focus && !open && !error,
                    "border-pka_green": open && !error,
                  },
                  button
                )}
              >
                <span
                  className={cn("line-clamp-1 flex-1 whitespace-nowrap", {
                    "text-pka_blue2/50": displayValue == display,
                  })}
                >
                  {displayValue}
                </span>
                <div>
                  <FiChevronDown
                    aria-hidden
                    className={cn(
                      "size-6 transform select-none text-pka_blue/30 transition group-hover:text-pka_blue",
                      {
                        "rotate-180": open,
                        "!text-pka_green ": focus,
                      }
                    )}
                  />
                </div>
              </div>
            )}
          </ListboxButton>

          <ListboxOptions
            anchor={"bottom start"}
            transition
            className={
              "w-[var(--button-width)] [--anchor-gap:2px] z-[1000] !max-h-56 py-1.5 rounded-2xl border border-pka_blue bg-white focus:outline-none text-base origin-top transition duration-300 ease-out data-[closed]:scale-95 data-[open]:scale-100 data-[closed]:opacity-0"
            }
          >
            {options.map((i) => (
              <ListboxOption key={i.value} value={i.value}>
                {({ focus, selected }) => (
                  <div
                    className={cn(
                      "flex items-center justify-between px-6 pb-3.5 pt-4 text-pka_blue select-none cursor-pointer text-nowrap",
                      {
                        "bg-pka_green_light": focus,
                        "!bg-pka_blue text-white": selected,
                      }
                    )}
                  >
                    <span>{i.label}</span>
                    {selected && <FiCheck className={"size-4 flex-shrink-0"} />}
                  </div>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

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
}
