import { Category } from '@application/domain/categories/entities/category';

export interface CreateProductDTO {
  name: string;
  category: Category;
  price: number;
  description: string;
}
