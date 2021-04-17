/* #region Imports */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
/* #endregion */

/**
 * Classe interceptor que adiciona a baseUrl na requisição
 */
@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>{
        req = req.clone({
            url: `${environment.api.baseUrl}${req.url}`,
        });

        return next.handle(req);
    }
}