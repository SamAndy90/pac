// import { useMutation } from "@apollo/client";
// import { CART_CREATE_MUTATION, CART_LINES_ADD_MUTATION } from "./queries";
// import client from "../shopifyClient";

// export const useCreateCart = () => {
//   const [createCartMutation, { data, loading, error }] = useMutation(
//     CART_CREATE_MUTATION,
//     {
//       onCompleted() {
//         client.refetchQueries({
//           include: ["getCart"],
//         });
//       },
//     }
//   );

//   const createCart = async (
//     items: { quantity: number; variantId: string }[] = []
//   ) => {
//     try {
//       const response = await createCartMutation({
//         variables: {
//           lines: items.map((item) => ({
//             quantity: item.quantity,
//             merchandiseId: item.variantId,
//           })),
//         },
//       });

//       if (response.data.cartCreate.userErrors.length) {
//         console.error("User error:", response.data.cartCreate.userErrors);
//         return null;
//       }

//       const cartId = response.data.cartCreate.cart.id;
//       console.log("Cart created successfully:", cartId);

//       return { cartId };
//     } catch (error) {
//       console.error("Error creating cart:", error);
//       return null;
//     }
//   };

//   return { createCart, data, loading, error };
// };

// export const useAddToCart = () => {
//   const [addToCartMutation, { data, loading, error }] = useMutation(
//     CART_LINES_ADD_MUTATION,
//     {
//       onCompleted() {
//         client.refetchQueries({
//           include: ["getCart"],
//         });
//       },
//     }
//   );

//   const addToCart = async (
//     cartId: string,
//     items: { quantity: number; variantId: string }[] = []
//   ) => {
//     try {
//       const response = await addToCartMutation({
//         variables: {
//           cartId,
//           lines: items.map((item) => ({
//             quantity: item.quantity,
//             merchandiseId: item.variantId,
//           })),
//         },
//       });

//       if (response.data.cartLinesAdd.userErrors.length) {
//         console.error("User error:", response.data.cartLinesAdd.userErrors);
//         return null;
//       }

//       // Отримати оновлені дані кошика
//       const updatedCart = response.data.cartLinesAdd.cart;
//       console.log("Product added to cart successfully:", updatedCart);

//       return updatedCart;
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//       return null;
//     }
//   };

//   return { addToCart, data, loading, error };
// };
