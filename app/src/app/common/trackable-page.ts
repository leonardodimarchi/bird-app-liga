/**
 * Retorna o ID do item da lista para verificar se o item ja existe
 * Caso exista, não deve fazer alterações no HTML
 * 
 * @param index o indice do item na lista
 * @param value as informações do item
 */
export class TrackablePage {
    public trackById(index: number, value: {id: number}): number {
      return value.id;
    }
}