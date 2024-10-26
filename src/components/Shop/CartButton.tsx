import { useShopContext } from "@/contexts/ShopContext";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
            {cartQuantity}
          </Badge>
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
