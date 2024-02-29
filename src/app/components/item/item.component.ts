import { Component, Input, OnInit, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/interfaces/iItem';
import { ListaDeCompraService } from 'src/app/service/lista-de-compra.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnChanges, OnDestroy {

  @Input() item!: Item;
  @Output() emitindoItemParaEditar = new EventEmitter();
  @Output() emitindoIdParaDeletar = new EventEmitter();

  faPen = faPen;
  faTrash = faTrash

  constructor(private listaService: ListaDeCompraService) { }

  ngOnInit(): void { }

  ngOnChanges() { }

  ngOnDestroy(){

  }

  editarItem(){
    this.emitindoItemParaEditar.emit(this.item)
  }

  deletarItem(){
    this.emitindoIdParaDeletar.emit(this.item.id)
  }

  checarItem() {
    if(this.item.comprado == true){
      this.item.comprado = false;
    }else{
      this.item.comprado = true;
    }
    this.listaService.mudarStatus(this.item).subscribe((item) => {
      this.item = item;
    })
  }

}
