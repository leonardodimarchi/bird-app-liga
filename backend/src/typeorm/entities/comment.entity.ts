/* #region  Imports */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BaseEntity } from "src/common/base-entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { CategoryEntity } from "./category.entity";
/* #endregion */

@Entity('comments')
export class CommentEntity extends BaseEntity {
    constructor(
        partial: Partial<CommentEntity> | CommentEntity
    ) {
        super();

        Object.assign(this, {...partial});
    }

    /**
     * Mensagem do comentario
     */
    @ApiProperty()
    @Column({ length: 1024, nullable: false})
    message: string

    /**
     * Nome do autor
     */
    @ApiProperty()
    @Column({ length: 64, nullable: false})
    personName: string; 

    /**
     * Emoji da pessoa (icone)
     */
    @ApiProperty()
    @Column({ length: 124, nullable: false})
    personEmoji: string; 

    /**
     * Cor de fundo do icone da pessoa
     */
    @ApiProperty()
    @Column({ length: 7, nullable: false})
    personColor: string;

    /**
     * Identificação da categoria
     */
    @ApiProperty()
    @Column({ nullable: false})
    categoryId: number;

    /**
     * As informações da categoria desse comentario
     */
    @ApiPropertyOptional( { type: () => CategoryEntity } )
    @ManyToOne(() => CategoryEntity, category => category.comments)
    category?: CategoryEntity;
}


    