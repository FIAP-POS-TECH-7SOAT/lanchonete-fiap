import { Categoria } from "@application/categorias/domain/categoria";
import { Produto } from "../../../domain/produto";
import { CreateProdutoDTO } from "./dtos/create-produto-dto";
import { UpdateProdutoDTO } from "./dtos/update-produto-dto";

export interface IProdutoRepository {
  findById(id: string): Promise<Produto |null>;
  findByCategoria(categoria: Categoria): Promise<Produto |null>;
  create(data: CreateProdutoDTO): Promise<Produto>;
  update(data: Produto): Promise<Produto>;
}
