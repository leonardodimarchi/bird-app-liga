/* #region Imports */
import { Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CommentProxy } from "../models/comment.proxy";
import { CreateCommentPayload } from "../models/create-comment.payload";
import { PaginatedCommentProxy } from "../models/paginated-comment.proxy";
import { CommentService } from "../services/comment.service";
/* #endregion */

/**
 * Representa o controller das categorias
 */
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('comments')
@Controller('comments')
export class CommentController {

    constructor(
        private readonly service: CommentService,
    ) { }

    /* #region Public Methods */
    /**
     * Metodo que retorna uma lista de comentarios com paginação e possibilidade de pesquisa a partir do ID da categoria desejada
     * 
     * @param currentPage Pagina atual
     * @param maxItens Quantidade maxima de itens
     * @param categoryId Termo opcional para pesquisa de comentario
     */
    @Get()
    @ApiOperation({ summary: 'Metodo que retorna uma lista de comentarios.' }) 
    @ApiOkResponse({ type: PaginatedCommentProxy })
    @ApiQuery({ name: 'page', required: false, example: 1, allowEmptyValue: false, description: 'Pagina atual da paginação. Default: 1'})
    @ApiQuery({ name: 'maxItens', required: false, example: 15, allowEmptyValue: false, description: 'Quantidade de itens a ser retornado por pagina. Default: 15 Min:5 Max: 100'})
    @ApiQuery({ name: 'categoryId', required: false, example: 2, allowEmptyValue: false, description: 'ID da categoria, para busca de comentarios.'})
    @ApiQuery({ name: 'search', required: false, example: 'TypeScript', allowEmptyValue: false, description: 'Nome da categoria para busca dos comentarios.'})
    @ApiQuery({ name: 'includeCategory', required: false, example: true, allowEmptyValue: false, description: 'Diz se as informações da categoria serão inclusas no comentario.'})
    public async getMany(

        @Query('page') page?:number,
        @Query('maxItens') maxItens?: number, 
        @Query('search') search?: string,
        @Query('categoryId') categoryId?: number,
        @Query('includeCategory') includeCategory?:boolean,
        
        ): Promise<PaginatedCommentProxy> {

        page = Number(page) || 1;
        maxItens = Number(maxItens) || 15;
        includeCategory = Boolean(includeCategory) || false;

        return this.service.listMany(page, maxItens, search, categoryId,includeCategory);
    }

    /**
     * Metodo que retorna uma categoria com base em um ID
     * 
     * @param categoryId Id da categoria para busca
     * @returns a categoria procurada
     */
    @Get('/:commentId')
    @ApiOperation({ summary: 'Metodo que retorna um comentario baseada no ID.' }) 
    @ApiOkResponse({ type: CommentProxy })
    @ApiNotFoundResponse({ type: NotFoundException, description: 'O comentario pesquisado não existe' })
    public async getOne(@Param('commentId') categoryId: number): Promise<CommentProxy> {
        return await this.service.get(categoryId).then(response => new CommentProxy(response));
    }

    /**
     * Metodo que cria um comentario
     * 
     */
    @Post()
    @ApiOkResponse({ type: CommentProxy })
    @ApiOperation({ summary: 'Metodo que cria um novo comentario' })
    public async createOne(@Body() payload: CreateCommentPayload): Promise<CommentProxy>{
        return this.service.create(payload).then(response => new CommentProxy(response));     
    }
    /* #endregion */
}