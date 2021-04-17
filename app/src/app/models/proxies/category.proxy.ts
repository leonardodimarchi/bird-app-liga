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
    id?:number;

    /**
     * Nome da categoria
     */
    name?:string;

    /**
     * Cor da categoria
     */
    color?:string;

    /**
     * Lista de comentarios nessa categoria
     */
    comments?: CommentProxy[];
}

/**
 * 
 * @returns a fake category
 */
 export function getFakeCategoryProxy(): CategoryProxy{
    var randomNames: string[] = ['Typescript', 'Javascript', 'Java', 'Spring', 'C', 'Python']; 
    var randomName: string = randomNames[Math.floor(Math.random() * randomNames.length)]
    
    var randomColors :string[] = ['#FF565E', '#3ED598', '#FFC542'];
    var randomColor: string = randomColors[Math.floor(Math.random() * randomColors.length)]

    return{
        id: 1,
        name: randomName,
        color: randomColor,
        comments: [],
    }
}