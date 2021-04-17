/* #region  Imports */
import { HttpAsyncResult } from "src/app/models/interfaces/http-async-result";
import { PaginatedCommentProxy } from "src/app/models/proxies/paginated-comment.proxy";
import { StorageAsyncResult } from "src/app/models/interfaces/storage-async-results"
import { CommentProxy, getFakeCommentProxy } from "src/app/models/proxies/comment.proxy"
import { CreateCommentPayload } from "src/app/models/payloads/create-comment.payload";
/* #endregion */

/**
 * Metodo que retorna uma lista de comentarios mockados, fakes.
 * 
 * @returns Uma lista de comentarios fake
 */
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

/**
 * Metodo que retorna comentarios fake de acordo com a paginação
 * 
 * @param currentPage Pagina atual
 * @param maxItens Numero maximo de itens
 * @returns Lista com comentarios fake
 */
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

/**
 * Metodo que retorna comentarios fakes da categoria indicada pelo ID, com paginação
 * 
 * @param categoryId ID da categoria
 * @param currentPage Pagina atual
 * @param maxItens Itens maximos
 * @returns Lista de comentarios da categoria (busca através do ID)
 */
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

/**
 * Metodo que retorna um mockup de comentario a partir de um payload
 * 
 * @param payload Informações do comentario
 * @returns Um comentario falso
 */
export async function createCommentMockup(payload:CreateCommentPayload): Promise<HttpAsyncResult<CommentProxy>>{
  await new Promise(resolve => {
    setTimeout(resolve, 2_000);
  })

  return {
    success: getFakeCommentProxy(),
    error: undefined
  }
}
  
  
