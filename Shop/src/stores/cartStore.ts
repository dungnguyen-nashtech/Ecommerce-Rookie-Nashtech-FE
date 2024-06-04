import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { createSelectors } from "../utils/createSelectors.ts";
import { LOCALSTORAGE_CART_STORE } from "../utils/address.ts";

type CartItemInfo = {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  description: string; // S:Xanh
  imageUrl: string;
};

export type CartStoreState = {
  listCartItem: CartItemInfo[];
  totalQuantity: number;
  totalPrice: number;
  addProductItemToCart: (productItem: {
    quantity: number;
    productId: string;
    price: number;
    imageUrl: string;
    description: string;
    productName: string
  }) => void;
  removeProductItemFromCart: (productName: string, description: string) => void;
  incrementProductQuantity: (productName: string, description: string) => void;
  decrementProductQuantity: (productName: string, description: string) => void;
};

const createCartSlice: StateCreator<
  CartStoreState,
  [
    ["zustand/immer", never],
    ["zustand/devtools", unknown],
    ["zustand/persist", unknown]
  ]
> = (set, get) => ({
  listCartItem: [],
  totalQuantity: 0,
  totalPrice: 0,
  addProductItemToCart: (productItem: CartItemInfo) => {
    set((state) => {
      const existingItem = state.listCartItem.find(
        (item) =>
          item.productName === productItem.productName &&
          item.description === productItem.description
      );

      if (existingItem) {
        existingItem.quantity += productItem.quantity;
      } else {
        state.listCartItem.push({ ...productItem });
      }

      state.totalQuantity = state.listCartItem.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.listCartItem.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    });
  },
  removeProductItemFromCart: (productName: string, description: string) => {
    set((state) => {
      state.listCartItem = state.listCartItem.filter(
        (item) =>
          item.productName !== productName || item.description !== description
      );

      state.totalQuantity = state.listCartItem.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.listCartItem.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    });
  },
  incrementProductQuantity: (productName: string, description: string) => {
    set((state) => {
      const item = state.listCartItem.find(
        (item) =>
          item.productName === productName &&
          item.description === description
      );

      if (item) {
        item.quantity += 1;
      }

      state.totalQuantity = state.listCartItem.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.listCartItem.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    });
  },
  decrementProductQuantity: (productName: string, description: string) => {
    set((state) => {
      const item = state.listCartItem.find(
        (item) =>
          item.productName === productName &&
          item.description === description
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.listCartItem = state.listCartItem.filter(
          (item) =>
            item.productName !== productName ||
            item.description !== description
        );
      }

      state.totalQuantity = state.listCartItem.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.listCartItem.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    });
  }
});

export const useCartStore = createSelectors(
  create<CartStoreState>()(
    devtools(
      persist(immer(createCartSlice), {
        name: LOCALSTORAGE_CART_STORE
      })
    )
  )
);
