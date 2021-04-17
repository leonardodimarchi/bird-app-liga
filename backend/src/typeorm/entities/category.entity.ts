/* #region  Imports */
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/base-entity";
import { Column, Entity, OneToMany } from "typeorm";
import { CommentEntity } from "./comment.entity";
/* #endregion */

@Entity('categories')
export class CategoryEntity extends BaseEntity {
    constructor(
        partial: Partial<CategoryEntity> | CategoryEntity
    ) {
        super();

        Object.assign(this, {...partial});
    }

    /**
     * Nome da categoria
     */
    @ApiProperty()
    @Column({ length: 64, nullable: false})
    name: string;

    /**
     * Cor da categoria
     */
    @ApiProperty()
    @Column({ length: 7, nullable: false})
    color:string;

    /**
     * Lista de comentarios dessa categoria
     */
    @ApiProperty({ type: () => CommentEntity, isArray: true })
    @OneToMany( () => CommentEntity, comment => comment.categoryId)
    comments?: CommentEntity[];
}
