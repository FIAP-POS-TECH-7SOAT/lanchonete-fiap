import { Produto } from "@application/produtos/domain/produto";

export class ProdutoMapping{
    static toView({id, nome, descricao, categoria, imagem, preco}:Produto){
        return {
            id, nome, categoria, descricao, preco, imagem
        }
    }
} 