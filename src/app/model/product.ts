export interface Product{
    productId: string,
    name: string,
    categoryId: string,
    price: string,
    status: boolean,
    description: string
}

export type ProductTable = Pick<Product, 'name' | 'price' | 'status'>;