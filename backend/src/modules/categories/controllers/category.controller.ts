/* #region Imports */
import { Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CategoryProxy } from "../models/category.proxy";
import { CreateCategoryPayload } from "../models/create-category.payload";
import { PaginatedCategoryProxy } from "../models/paginated-category.proxy";
import { CategoryService } from "../services/category.service";
/* #endregion */

/**
 * Representa o controller das categorias
 */
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('categories')
@Controller('categories')
export class CategoryController {

    constructor(
        private readonly service: CategoryService,
    ) { }

    /* #region Public Methods */
    /**
     * Método que retorna uma lista de categorias com paginação e possibilidade de pesquisa pelo nome da categoria
     * 
     * @param currentPage Pagina atual
     * @param maxItens Quantidade maxima de itens
     * @param search Termo opcional para pesquisa de categoria
     */
    @Get()
    @ApiOperation({ summary: 'Metodo que retorna uma lista de categorias.' }) 
    @ApiOkResponse({ type: PaginatedCategoryProxy })
    @ApiQuery({ name: 'page', required: false, example: 1, allowEmptyValue: false, description: 'Pagina atual da paginação. Default: 1'})
    @ApiQuery({ name: 'maxItens', required: false, example: 15, allowEmptyValue: false, description: 'Quantidade de itens a ser retornado por pagina. Default: 15 Min:5 Max: 100'})
    @ApiQuery({ name: 'search', required: false, example: 'TypeScript', allowEmptyValue: false, description: 'Nome da categoria para busca.'})
    public async getMany(@Query('page') page?:number, @Query('maxItens') maxItens?: number, @Query('search') search?: string ): Promise<PaginatedCategoryProxy> {
        page = Number(page) || 1;
        maxItens = Number(maxItens) || 15;

        return this.service.listMany(page, maxItens, search);
    }

    /**
     * Metodo que retorna uma categoria com base em um ID
     * 
     * @param categoryId Id da categoria para busca
     * @returns a categoria procurada
     */
    @Get('/:categoryId')
    @ApiOperation({ summary: 'Metodo que retorna uma categoria baseada no ID.' }) 
    @ApiOkResponse({ type: CategoryProxy })
    @ApiNotFoundResponse({ type: NotFoundException, description: 'A categoria pesquisada não existe' })
    public async getOne(@Param('categoryId') categoryId: number): Promise<CategoryProxy> {
        return await this.service.get(categoryId).then(response => new CategoryProxy(response));
    }

    /**
     * Metodo que cria uma categoria
     * 
     */
    @Post()
    @ApiOkResponse({ type: CategoryProxy })
    @ApiOperation({ summary: 'Metodo que cria uma nova categoria' })
    public async createOne(@Body() payload: CreateCategoryPayload): Promise<CategoryProxy>{
        return this.service.create(payload).then(response => new CategoryProxy(response));     
    }
    /* #endregion */
}