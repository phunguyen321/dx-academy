export interface Category {
  id: string;
  name: string;
  description: string;
}

export type CategoryPick = Pick<Category, 'id' | 'name'>;
