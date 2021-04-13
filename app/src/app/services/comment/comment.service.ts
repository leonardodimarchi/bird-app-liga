/* #region  Imports */
import { Injectable } from '@angular/core';
import { CommentInteractor } from 'src/app/interactors/comment/comment.interactor';
import { PaginatedCommentProxy } from 'src/app/models/interfaces/paginated-comment.proxy';
import { CommentProxy } from '../../models/proxies/comment.proxy'
/* #endregion */

/**
 * Classe que representa o service que lida com os comentarios do app
 */
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private readonly interactor: CommentInteractor,
  ) { }

  /* #region  Public Methods */
  public async getMyComments(): Promise<CommentProxy[]>{
    const { error, success } = await this.interactor.getMyComments();
    if(error){
      return [];
    }

    if(!Array.isArray(success)){
      return [];
    }

    return success;
  }

  public async getAllComments(currentPage: number, maxItens: number): Promise<PaginatedCommentProxy>{
    const { error, success } = await this.interactor.getAllComments(currentPage, maxItens);
    if(error){
      return {
        pageCount: 1,
        currentPage: 1,
        items: [],
        maxItens,
      };
    }
    
    return success;
  }

  /* #endregion */
}


