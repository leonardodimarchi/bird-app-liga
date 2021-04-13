/* #region  Imports */
import { HttpAsyncResult } from "src/app/models/interfaces/http-async-result";
import { PaginatedCategoryProxy } from './../../models/proxies/paginated-category-proxy';
import { CategoryProxy } from './../../models/proxies/category.proxy';
import { getFakeCategoryProxy } from 'src/app/models/proxies/category.proxy';
import { StorageAsyncResult } from "src/app/models/interfaces/storage-async-results"

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
