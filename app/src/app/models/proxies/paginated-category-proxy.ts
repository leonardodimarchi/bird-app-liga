import { CategoryProxy } from './category.proxy';
/* #region  Imports */

/* #endregion */

/**
 * Classe para paginação de comentarios
 */
export interface PaginatedCategoryProxy {
    /**
     * O indice atual da paginação
     */
    currentPage: number;

    /**
     * O total de paǵinas dessa paginação
     */
    pageCount: number;

    /**
     * O total de itens por página
     */
    maxItens: number;

    /**
     * Os itens dessa páginação
     */
    items: CategoryProxy[];
}