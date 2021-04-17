/* #region  Imports */
import { Component, Input } from '@angular/core';
import { CommentProxy } from 'src/app/models/proxies/comment.proxy';
/* #endregion */

/**
 * Classe que representa o componente de "Comentario"
 * Exibindo suas informações
 */
@Component({
  selector: 'bird-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent {

  constructor() { }

  /* #region  Inputs */
  @Input()
  public content: CommentProxy;
  /* #endregion */
}
