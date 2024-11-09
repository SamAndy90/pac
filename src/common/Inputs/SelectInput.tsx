import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type Option = {
  value: string;
  label: string;
};

export type SelectInputProps = {
  list: Option[];
  setId: (value: string) => void;
};

export default function SelectInput({ list, setId }: SelectInputProps) {
  const [selected, setSelected] = useState(list[0]);

  useEffect(() => {
    setId(selected.value);
  }, [selected]);

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          className={
            "group relative flex justify-between items-center border border-pka_blue w-full bg-pka_background rounded-full text-left text-base font-avenirThin text-pka_blue/50 transition-colors hover:border-pka_green hover:text-pka_blue"
          }
        >
          {({ open }) => (
            <>
              <span
                className={cn(
                  "line-clamp-1 flex-1 whitespace-nowrap px-6 py-[15px]"
                )}
              >
                Position {selected.label}
              </span>
              <div className={"px-6 py-[11px]"}>
                <FiChevronDown
                  aria-hidden
                  className={cn(
                    "size-6 transform select-none text-pka_blue transition-all group-hover:text-pka_green",
                    {
                      "rotate-180": open,
                    }
                  )}
                />
              </div>
            </>
          )}
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={
            "w-[var(--button-width)] !max-h-56 mt-1 py-1.5 rounded-2xl border border-pka_blue bg-white focus:outline-none transition-all data-[leave]:data-[closed]:opacity-0 text-base"
          }
        >
          {list.map((i) => (
            <ListboxOption
              key={i.value}
              value={i}
              className="group select-none cursor-pointer bg-pka_background my-[1px]"
            >
              {({ focus, selected }) => (
                <>
                  <div
                    className={cn(
                      "flex items-center justify-between px-6 pb-3.5 pt-4 text-pka_blue",
                      {
                        "bg-pka_green_light": focus,
                        "!bg-pka_blue text-white": selected,
                      }
                    )}
                  >
                    <span>Position {i.label}</span>
                    {selected && (
                      <FiCheck className={"h-4 w-4 flex-shrink-0"} />
                    )}
                  </div>
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
