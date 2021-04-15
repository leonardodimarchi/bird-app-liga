/* #region  Imports */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage-angular";
import { CommentProxy } from "src/app/models/proxies/comment.proxy";
import { StorageAsyncResult } from "src/app/models/interfaces/storage-async-results";
import { environment } from "src/environments/environment";
import { getAllCommentsMockup, getCommentsMockup, getCommentsByCategoryIdMockup, createCommentMockup } from "./comment.mockup";
import { PaginatedCommentProxy } from "src/app/models/proxies/paginated-comment.proxy";
import { HttpAsyncResult } from "src/app/models/interfaces/http-async-result";
import { CreateCommentPayload } from "src/app/models/payloads/create-comment.payload";
/* #endregion */

/**
 * Classe Interactor que lida com os dados e cache dos comentarios
 */
@Injectable({
    providedIn: 'root',
})
export class CommentInteractor {
    constructor(
        private readonly http: HttpClient,
        private readonly storage: Storage,
    ) { }

    /* #region  Storage Methods */
    /**
     * Metodo que retorna os comentarios do usuario, guardados no cache (ou mockados)
     * 
     * @returns Os comentarios do usuario guardados no cache
     */
    public async getMyComments(): Promise<StorageAsyncResult<CommentProxy[]>>{
        if(environment.mockupEnabled){
            return await getCommentsMockup();
        }

        return this.storage.get(environment.keys.myComments)
            .then(success => ({success, error: undefined}))
            .catch(() => ({success: undefined, error:'Ocorreu um erro ao buscar do cache'}));
    }
    
    /**
     * Método que retorna os comentarios de todos os usuarios, buscando no API
     * 
     * @param currentPage Pagina atual
     * @param maxItens Maximo de itens
     * @returns Todos os comentarios, buscados na API
     */
    public async getAllComments(currentPage: number, maxItens: number): Promise<HttpAsyncResult<PaginatedCommentProxy>> {
        if(environment.mockupEnabled){
            return await getAllCommentsMockup(currentPage, maxItens);
        }

        const url = environment.api.comment.list
            .replace('{currentPage}', currentPage.toString())
            .replace('{maxItens}', maxItens.toString());

        return await this.http.get<PaginatedCommentProxy>(url)
            .toPromise()
            .then(success =>({success, error: undefined}))
            .catch(error =>({success: undefined, error}))
    }

    /**
     * Método que retorna os comentarios de uma categoria através de uma busca por ID
     * 
     * @param categoryId ID para busca  
     * @param currentPage Pagina atual
     * @param maxItens Maximo de itens
     * @returns Os comentarios de uma categoria especificado pelo ID
     */
    public async getCategoryCommentsById(categoryId: number,currentPage: number, maxItens: number): Promise<HttpAsyncResult<PaginatedCommentProxy>>{
        if(environment.mockupEnabled){
            return await getCommentsByCategoryIdMockup(categoryId,currentPage, maxItens);
        }

        const url = environment.api.comment.listByCategoryId
            .replace('{categoryId', categoryId.toString())
            .replace('{currentPage}', currentPage.toString())
            .replace('{maxItens}', maxItens.toString());

        return await this.http.get<PaginatedCommentProxy>(url)
            .toPromise()
            .then(success =>({success, error: undefined}))
            .catch(error =>({success: undefined, error}))
    }

    /**
     * Metodo que cria um comentario com base no payload (Parametro)
     * 
     * @param payload As informações do comentario
     */
    public async createComment(payload:CreateCommentPayload): Promise<HttpAsyncResult<CommentProxy>>{
    if(environment.mockupEnabled){
        return await createCommentMockup(payload);
    }

    return await this.http.post<CommentProxy>(environment.api.comment.create, payload)
        .toPromise()
        .then(success =>({success, error: undefined}))
        .catch(error =>({success: undefined, error}))
    }

    /**
     * Metodo que salva um comentario no Cache
     * 
     * @param comment Informações do comentario
     * @returns Promise<StorageAsyncResult<boolean>
     */
    public async saveCreatedCommentOnCache(comment: CommentProxy): Promise<StorageAsyncResult<boolean>>{

        const { success } = await this.storage.get(environment.keys.myComments)
            .then(success => ({success, error: undefined}))
            .catch(() => ({success: undefined, error:'Ocorreu um erro ao buscar do cache'}));

        const myComments = [...(success || []), comment];

        return await this.storage.set(environment.keys.myComments, myComments)
            .then(() => ({success: true, error: undefined}))
            .catch(() => ({success: undefined, error:'Ocorreu um erro ao armazenar no cache'}));
    }
    /* #endregion */
}

    
