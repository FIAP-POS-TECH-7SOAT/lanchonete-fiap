import { Category } from "@application/domain/categories/entities/category";

export interface UpdateProductDTO {
  name: string;
  category: Category;
  price: number;
  description: string;
}
