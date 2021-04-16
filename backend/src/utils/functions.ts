/**
 * Metodo que verifica se um não é indefinido ou nulo
 * 
 * @param value valor a ser verificado
 * @returns boolean
 */
export function isValid(value: any): boolean{
    return value != undefined && value != null;
}