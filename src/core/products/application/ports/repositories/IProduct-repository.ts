import { Category } from "@application/categories/domain/category";
import { Product } from "../../../domain/product";
import { CreateProductDTO } from "./dtos/create-product-dto";
import { UploadProductImageDTO } from "./dtos/upload-product-imagem-dto";

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findManyByCategory(category: Category): Promise<Product[]>;
  create(data: CreateProductDTO): Promise<Product>;
  update(data: Product): Promise<Product>;
  delete(id: string): Promise<Product | null>;
  patchImage(data: UploadProductImageDTO): Promise<string>;
}
