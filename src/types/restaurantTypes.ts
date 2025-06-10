import { FoodType } from './foodType'

export interface RestaurantType {
  destacado: boolean | undefined
  id: number
  titulo: string
  descricao: string
  capa: string
  tipo: string
  avaliacao: number
  cardapio: FoodType[]
}
