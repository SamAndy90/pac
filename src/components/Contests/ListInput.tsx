"use client";

import { cn } from "@/lib/utils";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Fragment, useState } from "react";

export type ListInputProps = {
  list: {
    label: string;
    value: string;
  }[];
};

export const ListInput = ({ list }: ListInputProps) => {
  const [position, setPosition] = useState(list[0]);

  return (
    <div className={"relative"}>
      <Listbox value={position} onChange={setPosition}>
        <div className={"relative"}>
          <ListboxButton
            className={cn(
              "relative block w-full rounded-full bg-white py-1.5 pr-8 pl-3 text-left text-sm/6 text-pka_blue",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-pka_blue"
            )}
          >
            {position.label}
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
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
              anchor="bottom"
              className={
                "absolute !max-h-56 overflow-y-scroll bg-white rounded-2xl"
              }
            >
              {list.map((pos) => (
                <ListboxOption
                  key={pos.label}
                  value={pos}
                  className="group w-full flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-pka_green_light"
                >
                  <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                  <div className="text-sm/6 text-pka_blue2">{pos.label}</div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
