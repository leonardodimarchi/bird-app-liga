/* #region  Imports */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage-angular";
import { CommentProxy } from "src/app/models/proxies/comment.proxy";
import { StorageAsyncResult } from "src/app/models/interfaces/storage-async-results";
import { environment } from "src/environments/environment";
import { getAllCommentsMockup, getCommentsMockup, getCommentsByCategoryIdMockup } from "./comment.mockup";
import { PaginatedCommentProxy } from "src/app/models/proxies/paginated-comment.proxy";
import { HttpAsyncResult } from "src/app/models/interfaces/http-async-result";
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
    public async getMyComments(): Promise<StorageAsyncResult<CommentProxy[]>>{
        if(environment.mockupEnabled){
            return await getCommentsMockup();
        }

        return this.storage.get(environment.keys.myComments)
            .then(success => ({success, error: undefined}))
            .catch(() => ({success: undefined, error:'Ocorreu um erro ao buscar do cache'}));
    }
    
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

    /* #endregion */
}