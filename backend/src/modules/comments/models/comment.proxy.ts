/* #region Imports */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BaseCrudProxy } from "src/common/base-crud.proxy";
import { CategoryProxy } from "src/modules/categories/models/category.proxy";
import { CommentEntity } from "src/typeorm/entities/comment.entity";
import { CategoryEntity } from 'src/typeorm/entities/category.entity';
/* #endregion */

/**
 * A classe que representa as informações que são enviadas pela API sobre a categoria
 */
export class CommentProxy extends BaseCrudProxy{
    constructor(
        entity: CommentEntity,
    ) {
        super(entity);

        this.message = entity.message;
        this.personName = entity.personName;
        this.personColor = entity.personColor;
        this.personEmoji= entity.personEmoji;
        this.categoryId= entity.categoryId;
    
        //Void 0 é mesma coisa q undefined
        this.category = entity.category instanceof CategoryEntity && new CategoryProxy(entity.category) || void 0
    }

    /**
     * Mensagem do comentario
     */
    @ApiProperty()
    message: string

    /**
     * Nome do autor
     */
    @ApiProperty()
    personName: string; 

    /**
     * Emoji da pessoa (icone)
     */
    @ApiProperty()
    personEmoji: string; 

    /**
     * Cor de fundo do icone da pessoa
     */
    @ApiProperty()
    personColor: string;

    /**
     * Identificação da categoria
     */
    @ApiProperty()
    categoryId: number;

    /**
     * As informações da categoria desse comentario
     */
    @ApiPropertyOptional( { type: () => CategoryProxy } )
    category?: CategoryProxy;
}