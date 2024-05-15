import { Categoria } from "@application/categorias/domain/categoria";

export interface UpdateProdutoDTO{
    nome: string;
    categoria: Categoria;
    preco: number;
    descricao: string;
}