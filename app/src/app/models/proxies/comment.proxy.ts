/* #region  Imports */
import { CategoryProxy } from "./category.proxy";
/* #endregion */

/**
 * Interface que representa as informações de um comentario vindos da api
 */

export interface CommentProxy {
    /**
     * Identificação desse comentario
     */

    id?: number;

    /**
     * A data de quando foi criado o comentario
     */
    createdAt?: string;

    /**
     * Mensagem do comentario
     */
    message?: string

    /**
     * Nome do autor
     */
    personName?: string; // 64

    /**
     * Emoji da pessoa (icone)
     */
    personEmoji?: string; // 64

    /**
     * Cor de fundo do icone da pessoa
     */
    personColor?: string; // 7

    /**
     * Identificação da categoria
     */
    categoryId?: number;

    /**
     * As informações sobre a categoria
     */
    category?: CategoryProxy;
}

/**
 * 
 * @returns a fake comment
 */
export function getFakeCommentProxy(): CommentProxy{
    return{
        id: 1,
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae dolor enim. Duis eget bibendum nulla. Vestibulum in turpis enim. ',
        categoryId: 2,
        createdAt: new Date().toISOString(),
        personName: 'Leonardo ',
        personEmoji: './assets/images/avatar_2.png',
        personColor: '#FF565E',
        category: {
          id: 2,
          name: 'Typescript',
          color: '#FFC542',
          comments: [],
        }
    }
}