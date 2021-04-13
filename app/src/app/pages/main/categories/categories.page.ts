import { Component, OnInit } from '@angular/core';
import { TrackablePage } from 'src/app/common/trackable-page';
import { CategoryProxy, getFakeCategoryProxy } from 'src/app/models/proxies/category.proxy';

/* 
  Página de categorias
*/
@Component({
  selector: 'bird-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage extends TrackablePage implements OnInit {

  constructor() {
      super();
   }

  ngOnInit() {
  }

  /* #region  Public Properties */
  /**
   * Lista de categorias
   */
  public listCategories: CategoryProxy[] = [
    getFakeCategoryProxy(),
    getFakeCategoryProxy(),
    getFakeCategoryProxy(),
    getFakeCategoryProxy(),
  ]
  /* #endregion */

}
