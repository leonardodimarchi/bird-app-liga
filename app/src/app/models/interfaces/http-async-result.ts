/**
 * Interface que representa os valores buscados da api de forma assincrona
 */
 export interface HttpAsyncResult<TProxy>{
    success?: TProxy | null;
    error: string;
}