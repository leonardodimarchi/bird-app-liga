/**
 * Interface para representar o Payload (o que sera enviado do APP para a API) da criação de comentarios
 */
 export interface CreateCategoryPayload {
    /**
    * Nome da categoria
    */
    name:string;

    /**
     * Cor da categoria
     */
    color:string;
}