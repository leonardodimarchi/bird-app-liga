/* #region  Imports */
import { CategoryEntity } from 'src/typeorm/entities/category.entity';
import { BasePaginatedProxy } from "src/common/base-paginated.proxy";
import { CategoryProxy } from "./category.proxy";
import { ApiProperty } from '@nestjs/swagger';
/* #endregion */

/**
 * Classe que representa os dados paginados de uma categoria
 */
export class PaginatedCategoryProxy extends BasePaginatedProxy{

    constructor(
        entities: CategoryEntity[],
        currentPage: number,
        pageCount: number,
        maxItens: number,
    ){
        super(currentPage, pageCount, maxItens);

        this.items= Array.isArray(entities) && entities.map(category => new CategoryProxy(category));
    }

    /**
     * Os itens dessa páginação
     */
    @ApiProperty({ type: () => CategoryProxy, isArray: true })
    public items: CategoryProxy[];
}