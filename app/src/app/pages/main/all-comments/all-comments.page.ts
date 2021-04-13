/* #region  Imports */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { PaginatedCommentProxy } from 'src/app/models/proxies/paginated-comment.proxy';
import { CommentProxy } from 'src/app/models/proxies/comment.proxy';
import { CommentService } from 'src/app/services/comment/comment.service';
import { throttleTime, map } from 'rxjs/operators';
import { TrackablePage } from 'src/app/common/trackable-page';
/* #endregion */

/* 
  Página de todos os comentarios
*/
@Component({
  selector: 'bird-all-comments',
  templateUrl: './all-comments.page.html',
  styleUrls: ['./all-comments.page.scss'],
})
export class AllCommentsPage extends TrackablePage implements OnInit, OnDestroy {

  constructor(
    private readonly comment: CommentService,
  ) {
    //Para a TrackablePage
    super();

    this.currentScrollSubscription = this.currentScrollFrameSubject.pipe(
      throttleTime(16),
      map(currentDiv => {
        const threshold = 100;
        const position = currentDiv.scrollTop + currentDiv.offsetHeight;
        const height = currentDiv.scrollHeight;

        return position > height - threshold;
      })
    ).subscribe(isNearBottom => isNearBottom && this.nextPage());
  }

  /* #region  LifeCycle Events */
  public async ngOnInit(): Promise<void> {
    await this.nextPage();
  }

  public ngOnDestroy(): void {
    this.currentScrollSubscription.unsubscribe();
  }
  /* #endregion */

  /* #region  Public Properties */
  public listAllComments: CommentProxy[] = [];
  public paginatedComment: PaginatedCommentProxy;
  public isLoadingComments: boolean;
  /* #endregion */

  /* #region  Public Methods */

  /**
   * 
   * @returns Retorna Promise<void>, apenas nos casos em que nao queremos carregar mais comentarios
   */
  public async nextPage(): Promise<void> {
    if (this.paginatedComment?.currentPage >= this.paginatedComment?.pageCount) {
      return;
    }

    if (this.isLoadingComments) {
      return;
    }

    this.isLoadingComments = true;

    const currentPage = this.paginatedComment?.currentPage || 0;

    this.paginatedComment = await this.comment.getAllComments(currentPage + 1, 4);
    this.listAllComments = [...this.listAllComments, ...this.paginatedComment.items];

    this.isLoadingComments = false
  }

  /**
   * Executado toda vez que ocorre um evento de scroll no container dos comentarios
   * 
   * @param event informações do evento de scroll
   */
  public onScroll(event: any): void {
    this.currentScrollFrameSubject.next(event.currentTarget);
  }
  /* #endregion */

  /* #region  Private Events */
  private readonly currentScrollFrameSubject: Subject<HTMLDivElement> = new Subject<HTMLDivElement>();
  /* #endregion */

  /* #region  Private Subscriptions */
  private readonly currentScrollSubscription: Subscription;
  /* #endregion */
}
