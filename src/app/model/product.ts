export interface Product{
    id: string,
    name: string,
    categoryId: string,
    price: string,
    status: boolean,
    description: string
}

export type ProductTable = Pick<Product, 'name' | 'price' | 'status'>;