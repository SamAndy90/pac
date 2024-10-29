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
  children?: React.ReactNode;
};

export type SelectInputProps = {
  value: Option;
  onChange: (value: Option) => void;
} & BaseProps;

export function SelectInput(props: SelectInputProps) {
  const {
    value,
    onChange,
    options,
    display = "",
    label,
    helperText,
    error,
    className = {},
  } = props;

  const { label: labelClassName, wrapper, button } = className;

  let displayValue = display;

  const activeOptionLabel = options.find((i) => i.value === value.value)?.label;
  if (activeOptionLabel) displayValue = activeOptionLabel;

  return (
    <div className={cn("flex flex-col gap-y-2", wrapper)}>
      {label && (
        <label className={cn("text-sm", labelClassName)}>{label}</label>
      )}
      <Listbox value={value} onChange={onChange}>
        <div className={"relative"}>
          <ListboxButton
            className={cn(
              "group flex w-full items-center justify-between rounded-full border border-gray-700/20 text-left text-gray-700 transition-colors hover:border-black hover:text-black",
              { "border-red-500": error },
              button
            )}
          >
            {({ open }) => (
              <>
                <span
                  className={cn(
                    "line-clamp-1 flex-1 whitespace-nowrap px-6 py-[15px] text-sm font-light",
                    {
                      "text-black": displayValue !== display,
                    }
                  )}
                >
                  {displayValue}
                </span>
                <div className={"px-6 py-[11px]"}>
                  <FiChevronDown
                    aria-hidden
                    className={cn(
                      "size-6 transform select-none text-gray-700 transition-transform group-hover:text-black",
                      {
                        "rotate-180": open,
                      }
                    )}
                  />
                </div>
              </>
            )}
          </ListboxButton>
          <Transition
            as={Fragment}
            enter={"transition ease-in duration-100"}
            enterFrom={"opacity-0"}
            enterTo={"opacity-100"}
            leave={"transition ease-in duration-100"}
            leaveFrom={"opacity-100"}
            leaveTo={"opacity-0"}
          >
            <ListboxOptions
              className={
                "absolute !z-[30000] overflow-y-scroll max-h-52 w-full rounded-2xl border border-gray-200 bg-white text-sm text-black shadow-[0_10px_24px_rgba(150,150,150,0.15)] focus:outline-none"
              }
            >
              {options.map((i) => (
                <ListboxOption key={i.value} value={value}>
                  {({ selected, selectedOption, focus }) => (
                    <span
                      className={cn(
                        "line-clamp-1 flex cursor-pointer select-none items-center justify-between whitespace-nowrap px-6 pb-3.5 pt-4",
                        {
                          "bg-gray-200": selectedOption,
                          "!bg-blue-500 text-white": focus,
                        }
                      )}
                    >
                      {i.label}

                      {selected && (
                        <FiCheck
                          className={"h-4 w-4 flex-shrink-0 text-blue-500"}
                        />
                      )}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
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
