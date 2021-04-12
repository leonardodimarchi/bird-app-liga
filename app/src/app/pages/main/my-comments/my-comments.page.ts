/* #region  Imports */
import { Component, OnInit } from '@angular/core';
import { CommentProxy } from 'src/app/models/proxies/comment.proxy';
import { CommentService } from 'src/app/services/comment/comment.service';
/* #endregion */

/* 
  Página dos comentarios do usuario
*/
@Component({
  selector: 'bird-my-comments',
  templateUrl: './my-comments.page.html',
  styleUrls: ['./my-comments.page.scss'],
})
export class MyCommentsPage implements OnInit {

  /* #region  Constructor */
  /* 
    Construtor padrão
  */
  constructor(
    private readonly comment: CommentService,
  ) { }

  /* #endregion */

  /* #region  OnInit Events */
  public async ngOnInit(): Promise<void> {
    this.listComments = await this.comment.getMyComments();
  }
  /* #endregion */

  /* #region  Public Properties */
  /* 
    Lista de comentarios do proprio usuario
  */

  public listComments: CommentProxy[] = [];

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
