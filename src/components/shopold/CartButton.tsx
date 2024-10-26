"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  addItem,
  clearCart,
  removeFromCart,
  removeItem,
} from "@/lib/store/slices/cartSlice";
import { gql, useMutation } from "@apollo/client";
import {
  LucideTrash2,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useShopContext } from "@/contexts/ShopContext";
import Link from "next/link";

const CREATE_CHECKOUT = gql`
  mutation createCheckout($lineItems: [CheckoutLineItemInput!]!) {
    checkoutCreate(input: { lineItems: $lineItems }) {
      checkout {
        webUrl
        id
      }
    }
  }
`;

const CartButton = () => {
  const dispatch = useAppDispatch();
  const { items, totalAmount } = useAppSelector((state) => state.cartReducer);

  const [createCheckout, { loading, error }] = useMutation(CREATE_CHECKOUT, {
    onCompleted: (data) => {
      dispatch(clearCart());

      const { webUrl } = data.checkoutCreate.checkout;
      window.location.assign(webUrl);
    },
  });

  const checkoutHandler = () => {
    const lineItems = items.map((item) => ({
      variantId: `gid://shopify/ProductVariant/${item.id.split("/").pop()}`,
      quantity: item.quantity,
    }));

    createCheckout({
      variables: {
        lineItems,
      },
    });
  };

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { cart, checkoutURL } = useShopContext();
  let cartQuantity = 0;
  cart.map((item) => {
    return (cartQuantity += item.variantQuantity);
  });

  return (
    <Sheet>
      <SheetTrigger className="relative flex items-center">
        <div className="relative">
          <ShoppingCart
            width={18}
            height={18}
            className="lg:text-white text-black hover:text-pka_green transition-colors"
          />
          {cartQuantity > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 border border-black lg:border-0"
            >
              {/* {items.length} */}
              {cartQuantity}
            </Badge>
          )}
        </div>
      </SheetTrigger>

      <SheetContent className="flex flex-col h-full">
        <SheetHeader className="flex-none">
          <SheetTitle className="text-xl leading-10 font-avenirBold">
            My Cart
          </SheetTitle>
        </SheetHeader>
        {items?.length > 0 ? (
          <>
            {" "}
            <div className="flex-1 overflow-auto">
              <SheetDescription>
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                  >
                    <div className="relative flex w-full flex-row justify-between px-1 py-4">
                      <div className="z-30 flex flex-row space-x-4">
                        <div className="relative h-16 w-16 cursor-pointer rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                          <Image
                            className="h-full w-full object-cover"
                            width={64}
                            height={64}
                            alt="image"
                            src={item.imageUrl}
                          />
                          <div
                            className="absolute -top-3 rounded-full -right-3 bg-white border border-black p-1"
                            onClick={() => {
                              dispatch(removeFromCart({ id: item.id }));
                            }}
                          >
                            <LucideTrash2 className="w-4 h-4" />
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col text-base">
                          <span className="leading-tight text-sm lg:text-lg text-black">
                            {item.title}
                          </span>
                        </div>
                      </div>
                      <div className="flex h-16 flex-col justify-between">
                        <span className="flex justify-end text-sm lg:text-lg text-black">
                          {USDollar.format(item.price)}
                        </span>
                        <div className="ml-auto flex h-9 gap-3 mt-2 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                          <Minus
                            className="hover:cursor-pointer w-4 h-4"
                            type="minus"
                            onClick={() => {
                              dispatch(removeItem({ id: item.id }));
                            }}
                          />
                          <p className="w-6 text-center">
                            <span className="w-full text-sm">
                              {item.quantity}
                            </span>
                          </p>
                          <Plus
                            className="hover:cursor-pointer w-4 h-4"
                            type="plus"
                            onClick={() => {
                              dispatch(addItem({ id: item.id }));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </SheetDescription>
            </div>
            <SheetFooter className="flex-none">
              <div className="bg-[#fcf9eb] w-full">
                <div className="flex flex-col items-center justify-between">
                  <div className="flex justify-between items-center w-full text-sm lg:text-lg p-5">
                    Total
                    <div className="text-right text-sm lg:text-lg flex text-black dark:text-white">
                      {USDollar.format(totalAmount)}
                    </div>
                  </div>
                  <button
                    onClick={checkoutHandler}
                    className="border-4 !w-full !h-[33.03px] text-[12.8px] flex items-center justify-center  lg:!h-[27.02px]  xl:!h-[27.52px] 2xl:!h-[33.03px] lg:text-[8.53px] lg:rounded-[4.27px] lg:border-[2.13px] xl:text-[10.6px] 2xl:text-[12.8px] xl:border-[2.67px] bg-[#33455A] border-[#FFC52E] rounded-[8px] text-[#FFC52E] font-avenirThin hover:bg-[#FFC52E] hover:border-[#33455A] hover:text-[#33455A]"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col font-avenirBold  justify-center w-full items-center h-full ">
            <ShoppingBag className="w-10 h-10" />
            <span className="text-xl font-bold mt-2">Your Cart is Empty </span>
          </div>
        )}
        <SheetFooter className="flex-none">
          <div className="bg-[#fcf9eb] w-full">
            <div className="flex flex-col items-center justify-between">
              <div className="flex justify-between items-center w-full text-sm lg:text-lg p-5">
                Total
                <div className="text-right text-sm lg:text-lg flex text-black dark:text-white">
                  {/* {USDollar.format(totalAmount)} */}
                </div>
              </div>

              <button
                onClick={checkoutHandler}
                className="border-4 !w-full !h-[33.03px] text-[12.8px] flex items-center justify-center  lg:!h-[27.02px]  xl:!h-[27.52px] 2xl:!h-[33.03px] lg:text-[8.53px] lg:rounded-[4.27px] lg:border-[2.13px] xl:text-[10.6px] 2xl:text-[12.8px] xl:border-[2.67px] bg-[#33455A] border-[#FFC52E] rounded-[8px] text-[#FFC52E] font-avenirThin hover:bg-[#FFC52E] hover:border-[#33455A] hover:text-[#33455A]"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartButton;
