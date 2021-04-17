/* #region Imports */
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/base-entity';
/* #endregion */

/**
 * A classe base para todo proxy
 */
export class BaseCrudProxy {
    constructor(
        entity: BaseEntity,
    ) {
        this.id = entity.id;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
    }

    /**
     * Identificação da entidade
     */
    @ApiProperty()
    id: number;

    /**
     * Data de quando a entidade foi criada
     */
    @ApiProperty()
    createdAt: Date;

    /**
     * Data da ultima atualização
     */
    @ApiProperty()
    updatedAt: Date;
}