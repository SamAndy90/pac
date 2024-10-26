import { Title } from "@/common";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { FiX } from "react-icons/fi";
import { NewButton } from "../ui/NewButton";
import Link from "next/link";

export const CartWindow = ({
  open,
  onClose,
  checkoutURL,
}: {
  open: boolean;
  onClose: () => void;
  checkoutURL: string;
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter={"ease-out transition"}
          enterFrom={"opacity-0"}
          enterTo={"opacity-100"}
          leave={"ease-in transition"}
          leaveFrom={"opacity-100"}
          leaveTo={"opacity-0"}
        >
          <div
            className={"fixed inset-0 z-[90] bg-white/30 backdrop-blur-sm"}
            aria-hidden
          />
        </TransitionChild>

        <TransitionChild
          as={Fragment}
          enter={"ease-out transition transform duration-500"}
          enterFrom={"translate-x-full"}
          enterTo={"translate-x-0"}
          leave={"ease-in transition transform"}
          leaveFrom={"opacity-100 translate-x-0"}
          leaveTo={"opacity-0 translate-x-full"}
        >
          <DialogPanel
            className={cn(
              "fixed right-0 top-0 z-[100] h-full max-h-full min-w-96 max-w-full overflow-y-auto overflow-x-hidden bg-white shadow-[0_0_20px_rgba(255,255,255,0.03)]"
            )}
          >
            <div
              className={
                "relative flex flex-col overflow-hidden px-3 py-10 h-full"
              }
            >
              <button
                className={"absolute right-4 top-5 outline-none"}
                onClick={onClose}
              >
                <FiX
                  className={
                    "size-6 transition-colors duration-300 hover:text-pka_green text-pka_blue"
                  }
                />
              </button>
              <div className={"flex flex-col gap-y-4 overflow-hidden h-full"}>
                <Title className={"text-3xl xl:text-4xl"}>
                  Cart<div className={"h-[1px] rounded-sm bg-pka_black"}></div>
                </Title>
                <div className={"flex-1"}></div>
                <Link href={checkoutURL} target={"_blank"}>
                  <NewButton
                    colorVariant={"black"}
                    fullWidth
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Checkout
                  </NewButton>
                </Link>
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};
