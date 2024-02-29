import { Component, DoCheck, OnInit } from '@angular/core';
import { Item } from './interfaces/iItem';
import { ListaDeCompraService } from './service/lista-de-compra.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, DoCheck{
  title = 'app-lista-de-compras';
  listaDeCompras!: Array<Item>;
  itemParaSerEditado!: Item;

  constructor(private listaService: ListaDeCompraService, private router: Router) { }
  ngDoCheck(): void {
    // this.listaService.atualizarLocalStorage();
  }

  ngOnInit(): void {
    this.listaService.getListaDeCompra().subscribe((lista) => {
      this.listaDeCompras = lista
    })
  }

  editarItem(item: Item){
    this.itemParaSerEditado = item;
  }

  deletarItem(id: number){
    const index = this.listaDeCompras.findIndex((item)=>item.id === id);
    this.listaDeCompras.splice(index, 1);
    if(id) {
      this.listaService.excluir(id).subscribe(() => {
        // this.router.navigate(['/listarPensamento'])
        location.reload()
      })
    }
  }

  limparLista(){
    this.listaService.limparLista().subscribe(() => {
      // this.router.navigate(['/listarPensamento'])
      location.reload()
    })
    this.listaDeCompras = [];
  }

}
