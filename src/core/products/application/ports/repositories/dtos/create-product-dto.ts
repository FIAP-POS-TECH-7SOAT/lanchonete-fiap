import { Category } from "@application/categories/domain/category";

export interface CreateProductDTO {
  name: string;
  category: Category;
  price: number;
  description: string;
}
