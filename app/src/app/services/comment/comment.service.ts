/* #region  Imports */
import { Injectable } from '@angular/core';
import { CommentInteractor } from 'src/app/interactors/comment/comment.interactor';
import { CreateCommentPayload } from 'src/app/models/payloads/create-comment.payload';
import { PaginatedCommentProxy } from 'src/app/models/proxies/paginated-comment.proxy';
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

    /**
   * Metodo que retorna uma lista de comentarios na categoria por ID
   * 
   * @param categoryId Id da categoria para busca
   * @param currentPage Paginação atual
   * @param maxItens Itens maximos
   * @returns Uma lista de comentarios da categoria selecionada
   */
     public async getCategoryCommentsById(categoryId: number, currentPage: number, maxItens: number): Promise<PaginatedCommentProxy> {
      const { error, success } = await this.interactor.getCategoryCommentsById(categoryId, currentPage, maxItens);
      if (error) {
        return {
          pageCount: 1,
          currentPage: 1,
          items: [],
          maxItens,
        };
      }
  
      return success;
    }

    /**
     * Metodo que cria um comentario com base no payload (Parametro)
     * 
     * @param payload As informações do comentario
     */
    public async createComment(payload:CreateCommentPayload): Promise<[boolean, string]>{ 
      const { error, success} = await this.interactor.createComment(payload);

      if(error){
        return [false, 'Ocorreu um erro no envio do comentario !'];
      }

      const { error: errorOnSave } = await this.interactor.saveCreatedCommentOnCache(success);

      if(errorOnSave){
        console.error(errorOnSave);
      }

      return [true, 'Sucesso, seu comentário foi postado !'];
    }

  /* #endregion */
}


