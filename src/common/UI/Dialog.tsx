import {
  DialogPanel,
  Dialog as HuiDialog,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { XIcon } from "lucide-react";

export type DialogProps = {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: {
    overlay?: string;
    content?: string;
  };
};

export function Dialog(props: DialogProps) {
  const {
    open = false,
    onClose = () => {
      console.warn("Close dialog not implemented");
    },
    children,
    className = {},
  } = props;
  const { overlay: overlayClassName = "", content: contentClassName = "" } =
    className;

  return (
    <Transition appear show={open} as={Fragment}>
      <HuiDialog onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter={"ease-out duration-300"}
          enterFrom={"opacity-0"}
          enterTo={"opacity-100"}
          leave={"ease-in duration-200"}
          leaveFrom={"opacity-100"}
          leaveTo={"opacity-0"}
        >
          <div
            className={twMerge(
              "fixed inset-0 z-40 bg-white/20 backdrop-blur",
              overlayClassName
            )}
            aria-hidden
          />
        </TransitionChild>

        <TransitionChild
          as={Fragment}
          enter={"ease-out duration-300"}
          enterFrom={"opacity-0 scale-95"}
          enterTo={"opacity-100 scale-100"}
          leave={"ease-in duration-200"}
          leaveFrom={"opacity-100 scale-100"}
          leaveTo={"opacity-0 scale-95"}
        >
          <DialogPanel
            className={twMerge(
              `fixed left-1/2 top-1/2 z-40 w-full md:max-w-screen-sm max-h-full max-w-[calc(100%-24px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden py-4`,
              contentClassName
            )}
          >
            <div
              className={
                "relative overflow-hidden rounded-xl bg-white shadow-lg pt-10 pb-2 px-3"
              }
            >
              <button
                className={"right-3 top-3 z-50 absolute"}
                onClick={onClose}
              >
                <XIcon
                  className={
                    "text-pka_blue2 size-5 hover:text-pka_green transition-colors duration-300"
                  }
                />
              </button>
              {children}
            </div>
          </DialogPanel>
        </TransitionChild>
      </HuiDialog>
    </Transition>
  );
}
