
import { Category } from "@application/domain/categories/entities/category";
import { Product } from "../../../entities/product";
import { UploadProductImageDTO } from "./dtos/upload-product-imagem-dto";

export interface ProductRepository {
  findById(id: string): Promise<Product | null>;
  findByIds(ids: string[]): Promise<Product[]>;
  findManyByCategory(category: Category): Promise<Product[]>;
  create(data: Product): Promise<Product>;
  update(data: Product): Promise<Product>;
  delete(id: string): Promise<Product | null>;
  patchImage(data: UploadProductImageDTO): Promise<string>;
}
