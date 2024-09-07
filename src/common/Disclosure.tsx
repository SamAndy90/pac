"use client";

import { cn } from "@/lib/utils";
import {
  Disclosure as BaseDisclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { HTMLAttributes } from "react";
import { FaChevronDown } from "react-icons/fa6";

export type DisclosureProps = {
  children: React.ReactNode;
} & Pick<HTMLAttributes<HTMLElement>, "className">;

export function Disclosure({ children, className }: DisclosureProps) {
  return (
    <div
      className={cn(
        "divide-y-[1px] divide-pka_blue2/20 border-y border-pka_blue2/20",
        className
      )}
    >
      {children}
    </div>
  );
}

export type DisclosureItemProps = {
  trigger: React.ReactNode;
  endIcon?: React.ReactElement;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: {
    triggerWrapper?: string;
    panelWrapper?: string;
  };
};

export function DisclosureItem({
  children,
  trigger,
  endIcon,
  className,
  onClick,
}: DisclosureItemProps) {
  return (
    <BaseDisclosure>
      <DisclosureButton
        onClick={onClick}
        className={cn(
          "group flex w-full text-pka_blue2 items-center justify-between gap-x-2 px-2 py-6",
          className?.triggerWrapper
        )}
      >
        {trigger}
        {endIcon ? (
          endIcon
        ) : (
          <FaChevronDown
            className={
              "size-5 shrink-0 group-data-[open]:rotate-180 group-data-[hover]:text-pka_green transition-all"
            }
          />
        )}
      </DisclosureButton>
      {children && (
        <Transition
          enter={"transition duration-100 ease-out"}
          enterFrom={"transform scale-95 opacity-0"}
          enterTo={"transform scale-100 opacity-100"}
          leave={"transition duration-75 ease-out"}
          leaveFrom={"transform scale-100 opacity-100"}
          leaveTo={"transform scale-95 opacity-0"}
        >
          <DisclosurePanel
            className={cn(
              "py-4 px-2 text-pka_blue2 text-lg font-garamond",
              className?.panelWrapper
            )}
          >
            {children}
          </DisclosurePanel>
        </Transition>
      )}
    </BaseDisclosure>
  );
}
