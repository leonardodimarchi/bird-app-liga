/* #region  Imports */
import { ApiProperty } from "@nestjs/swagger";
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
/* #endregion */

/**
 * Classe base para toda entidade
 */
export class BaseEntity {
    /**
     * Identificação da entidade
     */
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Data de quando a entidade foi criada
     */
    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    /**
     * Data da ultima atualização
     */
    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;
}