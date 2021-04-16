/* #region Imports */
import { ApiProperty } from "@nestjs/swagger";
import { BaseCrudProxy } from "src/common/base-crud.proxy";
import { CategoryEntity } from "src/typeorm/entities/category.entity";
/* #endregion */

/**
 * A classe que representa as informações que são enviadas pela API sobre a categoria
 */
export class CategoryProxy extends BaseCrudProxy{
    constructor(
        entity: CategoryEntity,
    ) {
        super(entity);

        this.name = entity.name;
        this.color = entity.color;
        // this.comments = Array.isArray(entity.comments) && entity.comments.map(comment => new CommentProxy(comment)) || [];

        //Para o comment Proxy
        //Void 0 é mesma coisa q undefined
        // this.category = !!entity.category && new CategoryProxy(entity.category) || void 0
    }

    /**
     * Nome da categoria
     */
    @ApiProperty()
    name: string;

    /**
     * Cor da categoria
     */
    @ApiProperty()
    color:string;

    /**
     * Lista de comentarios dessa categoria
     */
    // @ApiProperty({ type: () => CommentProxy, isArray: true })
    // comments?: CommentProxy[];
}