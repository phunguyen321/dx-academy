export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  status: number;
  description: string;
}

export type ProductPick = Pick<Product, 'id' | 'name' | 'price' | 'status'>;

export type ProductTable = ProductPick & {
  category: string;
};

export type ProductUpdate = Pick<
  Product,
  'name' | 'price' | 'status' | 'description' | 'categoryId'
>;
