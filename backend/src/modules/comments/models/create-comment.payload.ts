/* #region Imports */
import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsHexColor, IsInt, IsString, MaxLength } from "class-validator";
/* #endregion */

/**
 * A classe que representa o payload enviado para criar um comentario
 */
export class CreateCommentPayload {
    /**
     * Mensagem do comentario
     */
    @ApiProperty()
    @IsDefined({ message: 'É necessário enviar a mensagem do comentario.' })
    @IsString({ message: 'É necessário enviar um texto válido para a mensagem do comentario.' })
    @MaxLength(1024, { message: 'A mensagem do comentario não pode exceder 1024 caracteres.' })
    message: string

    /**
     * Nome do autor
     */
    @ApiProperty()
    @IsDefined({ message: 'É necessário enviar o nome do autor do comentario.' })
    @IsString({ message: 'É necessário enviar um texto válido para o nome do autor do comentario.' })
    @MaxLength(64, { message: 'O nome do autor do comentario não pode exceder 64 caracteres.' })
    personName: string; 

    /**
     * Emoji da pessoa (icone)
     */
    @ApiProperty()
    @IsDefined({ message: 'É necessário enviar o emoji do autor do comentario.' })
    @IsString({ message: 'É necessário enviar um texto válido para o emoji do autor do comentario.' })
    @MaxLength(124, { message: 'O emoji do autor não pode exceder 124 caracteres.' })
    personEmoji: string; 

    /**
     * Cor de fundo do icone da pessoa
     */
    @ApiProperty()
    @IsDefined({ message: 'É necessário enviar a cor do autor do comentario.' })
    @IsString({ message: 'É necessário enviar um texto válido para a cor do autor do comentario.' })
    @MaxLength(7, { message: 'A cor do autor não pode exceder 7 caracteres.' })
    @IsHexColor({ message: 'É necessário enviar um HEX válido para a cor do autor do comentario.' })
    personColor: string;

    /**
     * Identificação da categoria
     */
    @ApiProperty()
    @IsDefined({ message: 'É necessário enviar o ID da categoria do comentario.' })
    @IsInt({ message: 'É necessário que o id da categoria seja um numero inteiro' })
    categoryId: number;
}