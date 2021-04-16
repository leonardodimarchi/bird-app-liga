/* #region Imports */
import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsHexColor, IsString, MaxLength } from "class-validator";
/* #endregion */

/**
 * A classe que representa o payload enviado para criar uma categoria
 */
export class CreateCategoryPayload {

    /**
     * Nome da categoria
     */
    @ApiProperty()
    @IsDefined({ message: 'É necessário enviar o nome da categoria.' })
    @IsString({ message: 'É necessário enviar um texto válido para o nome da categoria.' })
    @MaxLength(64, { message: 'O nome da categoria não pode exceder 64 caracteres.' })
    name: string;

    /**
     * Cor da categoria
     */
    @ApiProperty()
    @IsDefined({ message: 'É necessário enviar a cor dessa categoria.' })
    @IsString({ message: 'É necessário enviar um texto válido para a cor dessa categoria.' })
    @IsHexColor({ message: 'É necessário enviar um HEX válido para a cor dessa categoria.' })
    color: string;
}