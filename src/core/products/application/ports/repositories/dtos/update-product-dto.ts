import { Category } from "@application/categories/domain/category";

export interface UpdateProductDTO {
  name: string;
  category: Category;
  price: number;
  description: string;
}
