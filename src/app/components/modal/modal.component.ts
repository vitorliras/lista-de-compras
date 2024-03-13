import { map } from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/interfaces/iItem';
import { ListaDeCompraService } from 'src/app/service/lista-de-compra.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnChanges, OnInit {

  @Output() mudouModal = new EventEmitter();
  @Input() itemQueVaiSerEditado!: Item;

  statusModal: boolean = true;
  editando = false;
  textoBtn = 'Salvar Item';

  // valorItem!: Item;
  valorItem: Item = {
    //   id: "0",
    tipo: '',
    nome: '',
    marca: '',
    quantidade: 0,
  };
  tipos: string[] = [];

  constructor(
    private router: Router,
    private listaService: ListaDeCompraService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    if (changes['itemQueVaiSerEditado'].firstChange) {
      this.editando = true;
      this.textoBtn = 'Editar Item';
      this.valorItem.nome = this.itemQueVaiSerEditado?.nome;
      this.valorItem.tipo = this.itemQueVaiSerEditado?.tipo;
      this.valorItem.marca = this.itemQueVaiSerEditado?.marca;
      this.valorItem.quantidade = this.itemQueVaiSerEditado?.quantidade;
    }
  }

  ngOnInit(): void {
    this.listaService.getListaTipo().subscribe((tipos: any[]) => {
      this.tipos = tipos.map(tipo => tipo.tipo);
      console.log(this.tipos)
    });
  }

  editarItem() {
    this.listaService
      .editarItemDaLista(this.itemQueVaiSerEditado, this.valorItem)
      .subscribe((item) => {
        location.reload();
      });
    // this.listaService.editarItemDaLista(this.itemQueVaiSerEditado, this.valorItem);
    this.limparCampo();
    this.editando = false;
    this.textoBtn = 'Salvar Item';
  }

  adicionarItem() {
    debugger;
    const i: Item = {
      nome: this.valorItem.nome,
      quantidade: this.valorItem.quantidade,
      tipo: this.valorItem.tipo,
      marca: this.valorItem.marca,
      data: new Date().toLocaleString('pt-BR'),
      comprado: false,
    };
    // this.listaService.criarItem(i)
    this.listaService.criarItem(i).subscribe(() => {
      location.reload();
    });
    this.limparCampo();
  }

  limparCampo() {
    this.valorItem.nome = '';
    this.valorItem.tipo = '';
    this.valorItem.marca = '';
    this.valorItem.quantidade = 0;
  }

  fecharModal() {
    this.statusModal = false;
    this.mudouModal.emit(this.statusModal);
  }
}
