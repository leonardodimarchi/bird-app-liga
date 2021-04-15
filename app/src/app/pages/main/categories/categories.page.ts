/* #region  Imports */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { CategoryService } from './../../../services/category/category.service';
import { Subject, Subscription } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';
import { TrackablePage } from 'src/app/common/trackable-page';
import { CategoryProxy} from 'src/app/models/proxies/category.proxy';
import { PaginatedCategoryProxy } from 'src/app/models/proxies/paginated-category-proxy';
/* #endregion */

/* 
  Página de categorias
*/
@Component({
  selector: 'bird-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage extends TrackablePage implements OnInit, OnDestroy {

  constructor(
    private readonly category: CategoryService,
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
  public listCategories: CategoryProxy[] = [];
  public paginatedCategory: PaginatedCategoryProxy;
  public isLoadingCategories: boolean;
  /* #endregion */

  /* #region  Public Methods */

  /**
   * 
   * @returns Retorna Promise<void>, apenas nos casos em que nao queremos carregar mais categorias
   */
  public async nextPage(): Promise<void> {
    if (this.paginatedCategory?.currentPage >= this.paginatedCategory?.pageCount) {
      return;
    }

    if (this.isLoadingCategories) {
      return;
    }

    this.isLoadingCategories = true;

    const currentPage = this.paginatedCategory?.currentPage || 0;

    this.paginatedCategory = await this.category.getCategories(currentPage + 1, 6);
    this.listCategories = [...this.listCategories, ...this.paginatedCategory.items];

    this.isLoadingCategories = false
  }

  /**
   * Executado toda vez que ocorre um evento de scroll no container dos categorias
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
