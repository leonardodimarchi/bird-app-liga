/* #region  Imports */
import { BasePaginatedProxy } from "src/common/base-paginated.proxy";
import { ApiProperty } from '@nestjs/swagger';
import { CommentProxy } from './comment.proxy';
/* #endregion */

/**
 * Classe que representa os dados paginados de um comentario
 */
export class PaginatedCommentProxy extends BasePaginatedProxy{

    constructor(
        entities: CommentProxy[],
        currentPage: number,
        pageCount: number,
        maxItens: number,
    ){
        super(currentPage, pageCount, maxItens);

        this.items= Array.isArray(entities) && entities.map(comment => new CommentProxy(comment));
    }

    /**
     * Os itens dessa páginação
     */
    @ApiProperty({ type: () => CommentProxy, isArray: true })
    public items: CommentProxy[];
}