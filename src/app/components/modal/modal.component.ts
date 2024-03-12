import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/interfaces/iItem';
import { ListaDeCompraService } from 'src/app/service/lista-de-compra.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnChanges,OnInit {

  statusModal: boolean = true;
  @Output() mudouModal = new EventEmitter()

  @Input() itemQueVaiSerEditado!: Item;
  editando=false;
  textoBtn="Salvar Item";

  valorItem!: string;
  constructor(private router: Router
    ,private listaService: ListaDeCompraService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['itemQueVaiSerEditado'].firstChange){
      this.editando = true;
      this.textoBtn = "Editar Item";
      this.valorItem = this.itemQueVaiSerEditado?.nome;
    }
  }

  ngOnInit(): void { }

  editarItem(){
    this.listaService.editarItemDaLista(this.itemQueVaiSerEditado, this.valorItem).subscribe((item) => {
      location.reload()
    })
    // this.listaService.editarItemDaLista(this.itemQueVaiSerEditado, this.valorItem);
    this.limparCampo();
    this.editando = false;
    this.textoBtn="Salvar Item";

  }


  adicionarItem(){
    debugger;
    const i : Item = {
      nome: this.valorItem,
      data: new Date().toLocaleString('pt-BR'),
      comprado: false
    }
    // this.listaService.criarItem(i)
    this.listaService.criarItem(i).subscribe(() => {
      location.reload()
    });
    this.limparCampo()
  }

  limparCampo(){
    this.valorItem = ""
  }


  fecharModal() {
    this.statusModal = false
    this.mudouModal.emit(this.statusModal)
  }



}
