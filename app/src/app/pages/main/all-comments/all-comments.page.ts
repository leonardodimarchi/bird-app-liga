import { Component, OnInit } from '@angular/core';
import { CommentProxy } from 'src/app/models/proxies/comment.proxy';
import { CommentService } from 'src/app/services/comment/comment.service';

/* 
  Página de todos os comentarios
*/
@Component({
  selector: 'bird-all-comments',
  templateUrl: './all-comments.page.html',
  styleUrls: ['./all-comments.page.scss'],
})
export class AllCommentsPage implements OnInit {

  constructor(
    private readonly comment: CommentService,
  ) { }

  public async ngOnInit(): Promise<void> {
    this.listAllComments = await this.comment.getAllComments();
  }

  public listAllComments: CommentProxy[] = [];

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
