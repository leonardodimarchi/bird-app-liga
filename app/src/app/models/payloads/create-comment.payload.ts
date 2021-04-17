/**
 * Interface para representar o Payload (o que sera enviado do APP para a API) da criação de comentarios
 */
export interface CreateCommentPayload {
    /**
     * Mensagem do comentario
     */
    message: string

    /**
     * Nome do autor
     */
    personName: string; // 64

    /**
     * Emoji da pessoa (icone)
     */
    personEmoji: string; // 64

    /**
     * Cor de fundo do icone da pessoa
     */
    personColor: string; // 7

    /**
     * Identificação da categoria
     */
    categoryId: number;
}