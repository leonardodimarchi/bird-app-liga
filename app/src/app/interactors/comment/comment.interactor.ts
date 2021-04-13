/* #region  Imports */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage-angular";
import { CommentProxy, getFakeCommentProxy } from "src/app/models/proxies/comment.proxy";
import { StorageAsyncResult } from "src/app/models/interfaces/storage-async-results";
import { environment } from "src/environments/environment";
import { getCommentsMockup } from "./comment.mockup";
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
    
    public async getAllComments(): Promise<StorageAsyncResult<CommentProxy[]>> {
        if(environment.mockupEnabled){
            return await getCommentsMockup();
        }

        return this.storage.get(environment.keys.allComments)
            .then(success => ({success, error: undefined}))
            .catch(() => ({success: undefined, error:'Ocorreu um erro ao buscar do cache'}));
    }

    /* #endregion */
}