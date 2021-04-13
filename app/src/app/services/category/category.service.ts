import { CategoryInteractor } from './../../interactors/category/category.interactor';
import { Injectable } from '@angular/core';
import { PaginatedCategoryProxy } from 'src/app/models/proxies/paginated-category-proxy';

@Injectable({providedIn: 'root'})
export class CategoryService {
    constructor(
        private readonly interactor: CategoryInteractor,
    ) { }
    
/* #region  Public Methods */
  public async getCategories(currentPage: number, maxItens: number): Promise<PaginatedCategoryProxy>{
    const { error, success } = await this.interactor.getCategories(currentPage, maxItens);
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
  /* #endregion */
}