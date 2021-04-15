/* #region  Imports */
import { HttpAsyncResult } from "src/app/models/interfaces/http-async-result";
import { PaginatedCategoryProxy } from './../../models/proxies/paginated-category-proxy';
import { CategoryProxy, getFakeCategoryProxy } from 'src/app/models/proxies/category.proxy';
import { CreateCategoryPayload } from "src/app/models/payloads/create-category.payload";
/* #endregion */

export async function getCategoriesMockup(currentPage: number, maxItens: number): Promise<HttpAsyncResult<PaginatedCategoryProxy>> {
  const paginated = {
    pageCount: 5,
    currentPage,
    items: [],
    maxItens,
  };

  for (let i = 0; i < maxItens; i++)
    paginated.items.push(getFakeCategoryProxy());

  return {
    success: paginated,
    error: undefined,
  };
}

/**
 * Metodo que retorna um mockup de categoria a partir de um payload
 * 
 * @param payload Informações da categoria
 * @returns Uma categoria falso
 */
 export async function createCategoryMockup(payload:CreateCategoryPayload): Promise<HttpAsyncResult<CategoryProxy>>{
  await new Promise(resolve => {
    setTimeout(resolve, 2_000);
  })

  return {
    success: getFakeCategoryProxy(),
    error: undefined
  }
}
