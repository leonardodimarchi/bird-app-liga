/* #region Imports */
import { ApiProperty } from "@nestjs/swagger";
import { BaseCrudProxy } from "src/common/base-crud.proxy";
import { CommentProxy } from "src/modules/comments/models/comment.proxy";
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
        this.comments = Array.isArray(entity.comments) && entity.comments.map(comment => new CommentProxy(comment)) || [];
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
    @ApiProperty({ type: () => CommentProxy, isArray: true })
    comments?: CommentProxy[];
}