"use client";

import { cn } from "@/lib/utils";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { FiAlertTriangle, FiCheck, FiChevronDown } from "react-icons/fi";

type Option = {
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

export type USelectInputProps =
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

export function USelectInput(props: USelectInputProps) {
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
          <ListboxButton
            className={cn(
              "group flex w-full items-center justify-between rounded-full border border-pka_blue/30 text-left text-pka_blue transition-colors hover:border-pka_blue px-6 py-3.5",
              { "border-red-500": error },
              button
            )}
          >
            {({ open, focus }) => (
              <>
                <span className={cn("line-clamp-1 flex-1 whitespace-nowrap")}>
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
              </>
            )}
          </ListboxButton>

          <ListboxOptions
            anchor={"bottom"}
            transition
            className={
              "w-[calc(var(--button-width)+32px)] [--anchor-gap:2px] z-[1000] !max-h-56 py-1.5 rounded-2xl border border-pka_blue bg-white focus:outline-none text-base origin-top transition duration-300 ease-out data-[closed]:scale-95 data-[open]:scale-100 data-[closed]:opacity-0"
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
          className={cn("flex items-center gap-x-2 text-xs font-bold", {
            "text-red-500": error,
            "text-gray-700": !error,
          })}
        >
          <FiAlertTriangle className={"size-4 stroke-[2.5px]"} />
          {helperText}
        </p>
      )}
    </div>
  );
}
