export type OrderProduct = {
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
};

export type Order = {
  id: string;
  products: OrderProduct[];
  deliveryCost: number;
  placedAt?: string;
};

export const exampleProducts: OrderProduct[] = [
  { name: "Steak", image: "/img/kebab.webp", unitPrice: 10, quantity: 2 },
  { name: "Fried chicken", image: "/img/kebab-fresh.webp", unitPrice: 10, quantity: 2 },
  { name: "Winner", image: "/img/lavash.webp", unitPrice: 10, quantity: 2 },
];

export const pausedOrderSamples: Order[] = [
  { id: "P-1042", products: exampleProducts, deliveryCost: 5 },
  { id: "P-1043", products: exampleProducts, deliveryCost: 5 },
];

export const processOrderSamples: Order[] = [
  { id: "O-1040", products: exampleProducts, deliveryCost: 5, placedAt: "23-11-04 03:05" },
  { id: "O-1041", products: exampleProducts, deliveryCost: 5, placedAt: "23-11-04 03:05" },
];
