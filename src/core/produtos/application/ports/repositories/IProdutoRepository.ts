import { Produto } from "../../../domain/produto";
import { CreateProdutoDTO } from "./dtos/create-produto-dto";

export interface IProdutoRepository {
  findById(id: string): Promise<Produto |null>;
  findByCategoria(categoria: Categoria): Promise<Produto |null>;
  create(data: CreateProdutoDTO): Promise<Produto>;
}
