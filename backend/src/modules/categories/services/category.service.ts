/* #region  Imports */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "src/typeorm/entities/category.entity";
import { isValid } from "src/utils/functions";
import { Like, Repository } from "typeorm";
import { CreateCategoryPayload } from "../models/create-category.payload";
import { PaginatedCategoryProxy } from "../models/paginated-category.proxy";
/* #endregion */

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity)
        public readonly repository: Repository<CategoryEntity>
    ) { }

    /* #region Private Properties */
    private readonly maxItensPerPage = 100;
    private readonly minItemsPerPage = 5;
    /* #endregion */

    /* #region  Public Methods */
    /**
     * Metodo que retorna uma quantidade de maxima de itens (Paginados)
     * 
     * @param currentPage Pagina atual
     * @param maxItens Quantidade maxima de itens
     * @param search Termo opcional para pesquisa de categoria
     */
    public async listMany(currentPage: number, maxItens: number, search?: string): Promise<PaginatedCategoryProxy> {

        currentPage = Math.max(1, currentPage)
        maxItens = Math.max(this.minItemsPerPage, Math.min(this.maxItensPerPage, maxItens));

        let query = this.repository.createQueryBuilder('category');

        if(search){
            query = query. where('LOWER(category.name) LIKE :search', { search: `%${search.toLowerCase()}%` })
        }

        const [entities, total] = await query
        .take(maxItens)
        .skip((currentPage - 1) * maxItens)
        .orderBy('name', 'ASC')
        .getManyAndCount();

        const pageCount = Math.ceil(total / maxItens);

        return new PaginatedCategoryProxy(
            entities,
            currentPage,
            pageCount,
            maxItens,
        )
    }

    /**
     * Metodo que procura uma categoria pelo ID
     * 
     * @param entityId ID da entidade (Categoria)
     */
    public async get(entityId: number): Promise<CategoryEntity> {
        const entity = await this.repository.findOne({
            where: {
                id: Number(entityId) || 0,
            },
        })

        if (!entity) {
            throw new NotFoundException('A categoria (Search) não existe ou foi removida');
        }

        return entity;
    }

    /**
     * Metodo que cria uma categoria 
     * 
     * @param payload As informações para criação da categoria
     */
    public async create(payload: CreateCategoryPayload): Promise<CategoryEntity> {
        const entity = this.getEntityFromPayload(payload);

        return await this.repository.save(entity);
    }
    /* #endregion */

    /* #region  Private Methods */
    /**
     * Metodo que retorna uma entidade de categoria a partir de um payload
     * 
     * @param payload As informações do payload (Category)
     * @returns as informações de uma entidade a partir do payload
     */
    private getEntityFromPayload(payload: CreateCategoryPayload): CategoryEntity {
        return new CategoryEntity({
            ...isValid(payload.name) && { name: payload.name },
            ...isValid(payload.color) && { color: payload.color }
        })
    }
    /* #endregion */
}