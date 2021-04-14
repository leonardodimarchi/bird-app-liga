/* #region  Imports */
import { Injectable } from '@angular/core';

import { CategoryInteractor } from './../../interactors/category/category.interactor';
import { PaginatedCategoryProxy } from 'src/app/models/proxies/paginated-category-proxy';
/* #endregion */

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(
    private readonly interactor: CategoryInteractor,
  ) { }

  /* #region  Public Methods */

  /**
   * Metodo que retorna as categorias
   * 
   * @param currentPage Pagina atual
   * @param maxItens Maximo de itens
   * @returns Lista de categorias, caso não haja, retorna uma lista vazia
   */
  public async getCategories(currentPage: number, maxItens: number): Promise<PaginatedCategoryProxy> {
    const { error, success } = await this.interactor.getCategories(currentPage, maxItens);
    if (error) {
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