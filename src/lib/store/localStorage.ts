import { CartState } from "./slices/cartSlice";

export const SaveData = (data: CartState) => {
    localStorage.setItem("cart", JSON.stringify(data));
}

export const LoadData = () => {
    if (typeof window === "undefined") {
        return undefined;
    }

    const data = localStorage.getItem("cart");
    if (data) {
        return JSON.parse(data) as CartState;
    }
    return undefined;
}