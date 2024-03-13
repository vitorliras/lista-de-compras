export interface Item {
  id?: number | string,
  nome: string,
  tipo: string,
  marca: string,
  quantidade: number
  data?: Date | string,
  comprado?: boolean
}
