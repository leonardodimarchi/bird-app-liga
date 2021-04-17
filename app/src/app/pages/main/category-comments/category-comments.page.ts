/* #region  Imports */
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';
import { TrackablePage } from 'src/app/common/trackable-page';
import { CommentProxy } from 'src/app/models/proxies/comment.proxy';
import { PaginatedCommentProxy } from 'src/app/models/proxies/paginated-comment.proxy';
import { CommentService } from 'src/app/services/comment/comment.service';
/* #endregion */

@Component({
  selector: 'bird-category-comments',
  templateUrl: './category-comments.page.html',
  styleUrls: ['./category-comments.page.scss'],
})
export class CategoryCommentsPage extends TrackablePage implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly comment: CommentService,
  ) {
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

    this.categoryId = Number(this.activatedRoute.snapshot.paramMap.get('categoryId')) || 0;

    if(this.categoryId == 0){
      return void this.router.navigateByUrl('/main/categories');
    }

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
  public listCategoryComments: CommentProxy[] = [];
  public paginatedComment: PaginatedCommentProxy;
  public isLoadingData: boolean;
  /* #endregion */

  /* #region  Private Properties */
  public readonly categoryId: number;
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

    if (this.isLoadingData) {
      return;
    }

    this.isLoadingData = true;

    const currentPage = this.paginatedComment?.currentPage || 0;

    this.paginatedComment = await this.comment.getCategoryCommentsById(this.categoryId,currentPage + 1, 5);
    this.listCategoryComments = [...this.listCategoryComments, ...this.paginatedComment.items];

    this.isLoadingData = false
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
