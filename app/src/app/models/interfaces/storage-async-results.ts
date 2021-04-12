/**
 * Interface que representa os valores buscados do cache de forma assincrona
 */
export interface StorageAsyncResult<TProxy>{
    success?: TProxy | null;
    error: string;
}