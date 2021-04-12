/* #region  Imports */
import { CommentProxy } from "./comment.proxy";
/* #endregion */

/**
 * Interface que representa as informações da categoria vindas da API
 */
export interface CategoryProxy{
    /**
     * Identificação da categoria
     */
    id:number;

    /**
     * Nome da categoria
     */
    name:string;

    /**
     * Cor da categoria
     */
    color:string;

    /**
     * Lista de comentarios nessa categoria
     */
    comments?: CommentProxy[];
}