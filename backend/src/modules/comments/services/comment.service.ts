/* #region  Imports */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "src/typeorm/entities/comment.entity";
import { isValid } from "src/utils/functions";
import { Repository } from "typeorm";
import { CreateCommentPayload } from "../models/create-comment.payload";
import { PaginatedCommentProxy } from "../models/paginated-comment.proxy";
/* #endregion */

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(CommentEntity)
        public readonly repository: Repository<CommentEntity>
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
     * @param search Pesquisa no comentario
     * @param categoryId Termo para pesquisar os comentarios de uma categoria pelo ID
     * @param includeCategory Termo booleano para incluir a categoria na busca do comentario
     */
    public async listMany(currentPage: number, maxItens: number, search?: string, categoryId?: number,  includeCategory?: boolean): Promise<PaginatedCommentProxy> {

        currentPage = Math.max(1, currentPage)
        maxItens = Math.max(this.minItemsPerPage, Math.min(this.maxItensPerPage, maxItens));

        let query = this.repository.createQueryBuilder('comment');

        if (search){
            query = query.where('LOWER(comment.message) LIKE :search', { search: `%${search.toLowerCase()}%` });
        }
            
        if(categoryId){
            query = query.andWhere('comment.categoryId = :categoryId', { categoryId })
        }

        if(includeCategory){
            query.leftJoinAndSelect('comment.category','category')
        }

        const [entities, total] = await query
        .take(maxItens)
        .skip((currentPage - 1) * maxItens)
        .orderBy('comment.createdAt', 'DESC')
        .getManyAndCount();

        const pageCount = Math.ceil(total / maxItens);

        return new PaginatedCommentProxy(
            entities,
            currentPage,
            pageCount,
            maxItens,
        )
    }

    /**
     * Metodo que procura um comentairo pelo ID
     * 
     * @param entityId ID da entidade (Comentario)
     */
    public async get(entityId: number): Promise<CommentEntity> {
        const entity = await this.repository.findOne({
            where: {
                id: Number(entityId) || 0,
            },
        })

        if (!entity) {
            throw new NotFoundException('O Comentario (Search) não existe ou foi removido');
        }

        return entity;
    }

    /**
     * Metodo que cria um comentario 
     * 
     * @param payload As informações para criação do comentario
     */
    public async create(payload: CreateCommentPayload): Promise<CommentEntity> {
        const entity = this.getEntityFromPayload(payload);

        return await this.repository.save(entity);
    }
    /* #endregion */

    /* #region  Private Methods */
    /**
     * Metodo que retorna uma entidade de comentario a partir de um payload
     * 
     * @param payload As informações do payload (Comentario)
     * @returns as informações de uma entidade a partir do payload
     */
    private getEntityFromPayload(payload: CreateCommentPayload): CommentEntity {
        return new CommentEntity({
            ...isValid(payload.categoryId) && { categoryId: payload.categoryId },
            ...isValid(payload.message) && { message: payload.message },
            ...isValid(payload.personColor) && { personColor: payload.personColor },
            ...isValid(payload.personEmoji) && { personEmoji: payload.personEmoji },
            ...isValid(payload.personName) && { personName: payload.personName },
        })
    }
    /* #endregion */
}