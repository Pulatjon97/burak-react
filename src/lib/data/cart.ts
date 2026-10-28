export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const cartStorageKey = "burak-cart";
const cartChangedEvent = "burak-cart-change";

export function getCartItems(): CartItem[] {
  try {
    const savedCart = window.localStorage.getItem(cartStorageKey);
    return savedCart ? (JSON.parse(savedCart) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    window.localStorage.setItem(cartStorageKey, JSON.stringify(items));
    window.dispatchEvent(new Event(cartChangedEvent));
  } catch {
    // Keep the page usable when browser storage is unavailable.
  }
}

export function addCartItem(product: Omit<CartItem, "quantity">) {
  const items = getCartItems();
  const existingItem = items.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    items.push({ ...product, quantity: 1 });
  }

  saveCart(items);
}

export function changeCartItemQuantity(id: string, change: number) {
  const items = getCartItems()
    .map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + change } : item,
    )
    .filter((item) => item.quantity > 0);

  saveCart(items);
}

export function removeCartItem(id: string) {
  saveCart(getCartItems().filter((item) => item.id !== id));
}

export function subscribeToCart(callback: () => void) {
  window.addEventListener(cartChangedEvent, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(cartChangedEvent, callback);
    window.removeEventListener("storage", callback);
  };
}
