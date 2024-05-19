import { Categoria } from "@application/categorias/domain/categoria";
import { Produto } from "../../../domain/produto";
import { CreateProdutoDTO } from "./dtos/create-produto-dto";
import { UploadProdutoImagemDTO } from "./dtos/upload-produto-imagem-dto";

export interface IProdutoRepository {
  findById(id: string): Promise<Produto |null>;
  findManyByCategoria(categoria: Categoria): Promise<Produto[]>;
  create(data: CreateProdutoDTO): Promise<Produto>;
  update(data: Produto): Promise<Produto>;
  delete(id: string): Promise<Produto |null>;
  patchImagem(data: UploadProdutoImagemDTO): Promise<string>
}
