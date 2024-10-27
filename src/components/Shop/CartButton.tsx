import { useShopContext } from "@/contexts/ShopContext";
import { ShoppingCart } from "lucide-react";
import { CartWindow } from "./CartWindow";

export const CartButton = () => {
  const { cart, isCartOpen, setIsCartOpen, checkoutURL } = useShopContext();

  let cartQuantity = 0;
  cart.map((item) => {
    return (cartQuantity += item.variantQuantity);
  });
  return (
    <>
      <div className="relative" onClick={() => setIsCartOpen(true)}>
        <ShoppingCart className="lg:text-white size-5 text-white hover:text-pka_green transition-colors" />
        {cartQuantity > 0 && (
          <div
            className={
              "size-3.5 absolute top-0 right-0 translate-x-1.5 -translate-y-1.5 flex items-center justify-center bg-white text-pka_blue rounded-full text-[9px] font-bold overflow-hidden"
            }
          >
            <span className={"leading-[0] tracking-[0] -mb-[1.5px]"}>
              {cartQuantity}
            </span>
          </div>
        )}
      </div>
      <CartWindow
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        checkoutURL={checkoutURL}
      />
    </>
  );
};
