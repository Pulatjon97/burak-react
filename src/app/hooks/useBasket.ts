import { useEffect, useState } from "react";
import { CartItem, subscribeToCart } from "../../lib/data/cart";

const useBasket = () => {
  // Load the saved basket once so it is ready as soon as the app starts.
  const cartJson: string | null = localStorage.getItem("cartData");
  const currentCart: CartItem[] = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);

  // Keep the hook in sync if another part of the app changes the saved basket.
  useEffect(
    () =>
      subscribeToCart(() => {
        const savedCart = localStorage.getItem("cartData");
        setCartItems(savedCart ? JSON.parse(savedCart) : []);
      }),
    [],
  );

  // Add a product, or increase its quantity if it is already in the basket.
  const onAdd = (input: Omit<CartItem, "quantity">) => {
    const exist = cartItems.find((item: CartItem) => item.id === input.id);
    const cartUpdate = exist
      ? cartItems.map((item: CartItem) =>
          item.id === input.id
            ? { ...exist, quantity: exist.quantity + 1 }
            : item,
        )
      : [...cartItems, { ...input, quantity: 1 }];

    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  // Decrease one product by one; remove its row if its quantity reaches zero.
  const onRemove = (item: CartItem) => {
    const exist = cartItems.find((cartItem: CartItem) => cartItem.id === item.id);
    if (!exist) return;

    const cartUpdate =
      exist.quantity === 1
        ? cartItems.filter((cartItem: CartItem) => cartItem.id !== item.id)
        : cartItems.map((cartItem: CartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: exist.quantity - 1 }
              : cartItem,
          );

    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  // The X button removes one product row, regardless of its quantity.
  const onDelete = (id: string) => {
    const cartUpdate = cartItems.filter((item: CartItem) => item.id !== id);
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };

  // Clear every basket item and its saved browser data.
  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cartData");
  };

  // Expose basket state and actions to App and the basket menu.
  return { cartItems, onAdd, onRemove, onDelete, onDeleteAll };
};

export default useBasket;
