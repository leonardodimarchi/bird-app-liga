/* #region  Imports */
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/common/base-entity";
import { Column, Entity } from "typeorm";
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
}
