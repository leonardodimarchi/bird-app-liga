/**
 * Interface para representar o Payload (o que sera enviado do APP para a API) da criação de categorias
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