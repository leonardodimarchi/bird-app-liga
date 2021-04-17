/* #region  Imports */
import { ApiProperty } from "@nestjs/swagger";
/* #endregion */

/**
 * Classe base para paginação
 */
export class BasePaginatedProxy {

    constructor(
        currentPage: number,
        pageCount: number,
        maxItens: number,
    ){
        this.currentPage = currentPage;
        this.pageCount = pageCount;
        this.maxItens = maxItens;
    }

    /**
     * O indice atual da paginação
     */
    @ApiProperty()
    public currentPage: number;

    /**
     * O total de paǵinas dessa paginação
     */
    @ApiProperty()
    public pageCount: number;

    /**
     * O total de itens por página
     */
    @ApiProperty()
    public maxItens: number;
}