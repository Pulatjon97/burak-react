export type CartItem = {
  id: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
};

const cartStorageKey = "cartData";
const cartChangedEvent = "burak-cart-change";

export function getCartItems(): CartItem[] {
  try {
    const savedCart = window.localStorage.getItem(cartStorageKey);
    if (!savedCart) return [];

    const items = JSON.parse(savedCart) as CartItem[];
    if (!Array.isArray(items)) return [];

    // Keep the cartData field order consistent with the tutorial: id, quantity, name.
    const orderedItems = items.map(({ id, quantity, name, price, image }) => ({
      id,
      quantity,
      name,
      price,
      image,
    }));
    const orderedCart = JSON.stringify(orderedItems);
    if (orderedCart !== savedCart) {
      window.localStorage.setItem(cartStorageKey, orderedCart);
    }

    return orderedItems;
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    const orderedItems = items.map(({ id, quantity, name, price, image }) => ({
      id,
      quantity,
      name,
      price,
      image,
    }));
    window.localStorage.setItem(cartStorageKey, JSON.stringify(orderedItems));
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
