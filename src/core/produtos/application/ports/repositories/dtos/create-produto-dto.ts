import { Categoria } from "@application/categorias/domain/categoria";

export interface CreateProdutoDTO{
    nome: string;
    categoria: Categoria;
    preco: number;
    descricao: string;
  }