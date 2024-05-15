import { Categoria } from "@application/categorias/domain/categoria";
import { Produto } from "@application/produtos/domain/produto";
import { Produto as ProdutoPrisma, Categoria as CategoriaPrisma, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class ProdutoMapping{
    static toDomain({id, nome, descricao, categoria, imagem, preco, deleted}:ProdutoPrisma){
        return new Produto({nome, categoria: Categoria[categoria], descricao, preco: Number(preco), imagem, deleted }, id);
    }

    static toPrisma(produto:Produto){
        return {
            id: produto.id,
            nome: produto.nome, 
            categoria: produto.categoria.toString() as CategoriaPrisma,
            descricao: produto.descricao,
            preco: new Decimal(produto.preco),
            imagem: produto.imagem,
            deleted: produto.deleted
        }
    }
} 