export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  name: { firstname: string; lastname: string };
  token: string;
};

export type Category = string;

export type CheckoutForm = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  phone: string;
};
