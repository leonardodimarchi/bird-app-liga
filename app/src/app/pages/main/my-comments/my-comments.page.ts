/* #region  Imports */
import { Component } from '@angular/core';
import { CommentProxy, getFakeCommentProxy } from 'src/app/models/proxies/comment.proxy';
/* #endregion */

/* 
  Página dos comentarios do usuario
*/
@Component({
  selector: 'bird-my-comments',
  templateUrl: './my-comments.page.html',
  styleUrls: ['./my-comments.page.scss'],
})
export class MyCommentsPage {

  /* #region  Constructor */
  /* 
    Construtor padrão
  */
  constructor() { }

  /* #endregion */

  /* #region  Public Properties */
  /* 
    Lista de comentarios do proprio usuario
  */

  public listComments: CommentProxy[] = [
    getFakeCommentProxy(),
    getFakeCommentProxy(),
    getFakeCommentProxy(),
    getFakeCommentProxy(),
    getFakeCommentProxy(),
    getFakeCommentProxy(),
  ];

  /* #endregion */

  /* #region  Public Properties */
  /**
   * Retorna o ID do item da lista para verificar se o item ja existe
   * Caso exista, não deve fazer alterações no HTML
   * 
   * @param index o indice do item na lista
   * @param value as informações do item
   */
  public trackById(index: number, value: CommentProxy): number {
    return value.id;
  }

  /* #endregion */
}
