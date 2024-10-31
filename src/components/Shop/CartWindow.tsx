import { Title } from "@/common";
import { cn, formatter } from "@/lib/utils";
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
import { CartProduct } from "@/contexts/ShopContext";
import CartProductCard from "./CartProductCard";

export const CartWindow = ({
  open,
  onClose,
  checkoutURL,
  cart,
}: {
  open: boolean;
  onClose: () => void;
  checkoutURL: string;
  cart: CartProduct[];
}) => {
  let totalPrice = 0;
  cart.map((p) => (totalPrice += +p.price * p.variantQuantity));

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
              "fixed right-0 top-0 z-[100] h-full max-h-full min-w-full sm:min-w-96 max-w-full overflow-y-auto overflow-x-hidden bg-white sm:shadow-[0_0_20px_rgba(255,255,255,0.03)]"
            )}
          >
            <div
              className={
                "relative flex flex-col overflow-hidden px-3 pt-10 pb-3 h-full"
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
              <div className={"flex flex-col gap-y-2 overflow-hidden h-full"}>
                <Title className={"text-3xl xl:text-4xl"}>Cart</Title>
                <div
                  className={
                    "flex-1 border-y-[1px] border-pka_black py-2 overflow-hidden"
                  }
                >
                  <div className={"overflow-y-scroll flex flex-col gap-y-3"}>
                    {cart.map((p) => {
                      return <CartProductCard key={p.id} product={p} />;
                    })}
                  </div>
                </div>
                <div
                  className={
                    "text-pka_blue font-thunder text-3xl font-bold flex items-center justify-between"
                  }
                >
                  <span className={"font-normal"}>Total amount:</span>
                  <span>{formatter.format(totalPrice)}</span>
                </div>
                <div>
                  <Link href={checkoutURL} target={"_blank"} className={"mb-4"}>
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
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};
