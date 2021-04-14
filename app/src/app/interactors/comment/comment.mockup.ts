/* #region  Imports */
import { HttpAsyncResult } from "src/app/models/interfaces/http-async-result";
import { PaginatedCommentProxy } from "src/app/models/proxies/paginated-comment.proxy";
import { StorageAsyncResult } from "src/app/models/interfaces/storage-async-results"
import { CommentProxy, getFakeCommentProxy } from "src/app/models/proxies/comment.proxy"
/* #endregion */

export async function getCommentsMockup(): Promise<StorageAsyncResult<CommentProxy[]>>{
    return Promise.resolve({
        error: undefined,
        success: [
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
            getFakeCommentProxy(),
        ],
    });
}

export async function getAllCommentsMockup(currentPage: number, maxItens: number): Promise<HttpAsyncResult<PaginatedCommentProxy>> {
    const paginated = {
      pageCount: 5,
      currentPage,
      items: [],
      maxItens,
    };
  
    for (let i = 0; i < maxItens; i++)
      paginated.items.push(getFakeCommentProxy());
  
    return {
      success: paginated,
      error: undefined,
    };
  }

  export async function getCommentsByCategoryIdMockup(categoryId: number, currentPage: number, maxItens: number): Promise<HttpAsyncResult<PaginatedCommentProxy>> {
    const paginated = {
      pageCount: 5,
      currentPage,
      items: [],
      maxItens,
    };
  
    for (let i = 0; i < maxItens; i++)
      paginated.items.push(getFakeCommentProxy());
  
    return {
      success: paginated,
      error: undefined,
    };
  }
  
