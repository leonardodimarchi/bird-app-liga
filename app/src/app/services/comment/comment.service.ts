/* #region  Imports */
import { Injectable } from '@angular/core';
import { CommentInteractor } from 'src/app/interactors/interactor/comment/comment.interactor';
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

  /* #endregion */
}


