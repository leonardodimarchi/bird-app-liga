/* #region  Imports */
import { Component, OnInit } from '@angular/core';
import { TrackablePage } from 'src/app/common/trackable-page';
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
export class MyCommentsPage extends TrackablePage implements OnInit {

  /* #region  Constructor */
  /* 
    Construtor padrão
  */
  constructor(
    private readonly comment: CommentService,
  ) { 
    super();
  }

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
}
