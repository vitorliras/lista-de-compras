import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { Item } from '../interfaces/iItem';

@Injectable({
  providedIn: 'root'
})
export class ListaDeCompraService {

  private readonly API = 'http://localhost:3000/itens';
  private readonly API_TIPO = 'http://localhost:3000/tipos';

  // private listaDeCompra: Item[];

    constructor(private http: HttpClient) {
    // this.listaDeCompra = JSON.parse(localStorage.getItem('itens')|| '[]');
  }

  getListaDeCompra(){
    return this.http.get<Item[]>(this.API)
  }

  getListaTipo() {
    return this.http.get<String[]>(this.API_TIPO)
  }

  criarItem(item: Item): Observable<Item>{
    debugger;
    const itemNovo = this.http.post<Item>(this.API, item)
    return itemNovo;
  }

  excluir(id: number | string | undefined): Observable<Item> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Item>(url);
  }

  editarItemDaLista(itemAntigo: Item, itemNovo: Item){
    debugger;
    const itemEditado : Item = {
      id: itemAntigo.id,
      nome:itemNovo.nome,
      quantidade: itemNovo.quantidade,
      tipo:itemNovo.tipo,
      marca: itemNovo.marca,
      data: itemAntigo.data,
      comprado: itemAntigo.comprado
    }
    const id = itemAntigo.id;
    const url = `${this.API}/${itemEditado.id}`;
    return this.http.put<Item>(url, itemEditado);
  }

  mudarStatus(itemStatusMudado: Item){
    const itemEditado : Item = {
      id: itemStatusMudado.id,
      nome: itemStatusMudado.nome,
      quantidade: itemStatusMudado.quantidade,
      tipo:itemStatusMudado.tipo,
      marca: itemStatusMudado.marca,
      data: itemStatusMudado.data,
      comprado: itemStatusMudado.comprado
    }
    const url = `${this.API}/${itemEditado.id}`;
    return this.http.put<Item>(url, itemEditado);
  }

  limparLista(): Observable<any> {
    // Recupera a lista de itens
    return this.getListaDeCompra()
      .pipe(
        // Use operador mergeMap para excluir cada item individualmente
        mergeMap(items => {
          // Cria uma matriz de observáveis para solicitações de exclusão
          const deleteRequests: Observable<Item>[] = [];
          // Crie uma solicitação de exclusão para cada item na lista
          items.forEach(item => {
            const deleteRequest = this.excluir(item.id);
            deleteRequests.push(deleteRequest);
          });
          // Combine todas as solicitações de exclusão usando forkJoin
          return forkJoin(deleteRequests);
        })
      );
  }

  // atualizarLocalStorage(){
  //   localStorage.setItem('itens', JSON.stringify(this.listaDeCompra));
  // }


}
