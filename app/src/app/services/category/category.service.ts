/* #region  Imports */
import { Injectable } from '@angular/core';

import { CategoryInteractor } from './../../interactors/category/category.interactor';
import { PaginatedCategoryProxy } from 'src/app/models/proxies/paginated-category-proxy';
import { CreateCategoryPayload } from 'src/app/models/payloads/create-category.payload';
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

  /**
     * Metodo que cria uma categoria com base no payload (Parametro)
     * 
     * @param payload As informações da categoria
     */
   public async createCategory(payload:CreateCategoryPayload): Promise<[boolean, string]>{ 
    const { error } = await this.interactor.createCategory(payload);

    if(error){
      return [false, 'Ocorreu um erro no envio da sua categoria !'];
    }

    return [true, 'Sucesso, sua categoria foi criada !'];
  }


  /* #endregion */
}