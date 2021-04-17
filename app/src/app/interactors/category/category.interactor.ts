/* #region  Imports */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { HttpAsyncResult } from "src/app/models/interfaces/http-async-result";
import { createCategoryMockup, getCategoriesMockup } from './category.mockup';
import { PaginatedCategoryProxy } from './../../models/proxies/paginated-category-proxy';
import { CreateCategoryPayload } from "src/app/models/payloads/create-category.payload";
import { CategoryProxy } from "src/app/models/proxies/category.proxy";
/* #endregion */

/**
 * Classe Interactor que lida com os dados e cache dos comentarios
 */
@Injectable({
    providedIn: 'root',
})
export class CategoryInteractor {
    constructor(
        private readonly http: HttpClient,
    ) { }

/* #region Storage Methods */
public async getCategories(currentPage: number, maxItens: number): Promise<HttpAsyncResult<PaginatedCategoryProxy>> {
    if(environment.mockupEnabled){
        return await getCategoriesMockup(currentPage, maxItens);
    }

    const url = environment.api.categories.list
        .replace('{currentPage}', currentPage.toString())
        .replace('{maxItens}', maxItens.toString());

    return await this.http.get<PaginatedCategoryProxy>(url)
        .toPromise()
        .then(success =>({success, error: undefined}))
        .catch(error =>({success: undefined, error}))
}


/**
 * Metodo que cria uma categoria com base no payload (Parametro)
 * 
 * @param payload As informações da categoria
 */
    public async createCategory(payload:CreateCategoryPayload): Promise<HttpAsyncResult<CategoryProxy>>{
    if(environment.mockupEnabled){
        return await createCategoryMockup(payload);
    }

    return await this.http.post<CategoryProxy>(environment.api.categories.create, payload)
        .toPromise()
        .then(success =>({success, error: undefined}))
        .catch(error =>({success: undefined, error}))
    }

/* #endregion */
}