import type { Category, Product, User } from '@/types';

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getProducts: (limit?: number) =>
    request<Product[]>(limit ? `/products?limit=${limit}` : '/products'),

  getProduct: (id: number) =>
    request<Product>(`/products/${id}`),

  getCategories: () =>
    request<Category[]>('/products/categories'),

  getProductsByCategory: (category: string) =>
    request<Product[]>(`/products/category/${encodeURIComponent(category)}`),

  searchProducts: async (query: string): Promise<Product[]> => {
    const all = await request<Product[]>('/products');
    const q = query.toLowerCase();
    return all.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  },

  login: async (username: string, password: string) => {
    const data = await request<{ token: string }>('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const user = await request<User>('/users/1');
    return { ...user, token: data.token };
  },
};
