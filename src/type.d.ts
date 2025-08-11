declare interface CartItem {
  foodId: string
  name: string
  price: number
  image: string
  quantity: number
}

declare interface Food {
  id: number
  nome: string
  preco: number
  descricao: string
  foto: string
  porcao: string
}

declare interface Restaurant {
  id: number
  titulo: string
  descricao: string
  capa: string
  avaliacao: number
  tipo: string
  destacado: boolean
  cardapio: Food[]
}

declare interface Payment {
  cardName: string
  cardNumber: string
  cvv: number
  expiryMonth: number
  expiryYear: number
}

declare interface Delivery {
  name: string
  address: string
  city: string
  zip: string
  number: number
  complement?: string
}

declare interface PurchaseProduct {
  id: number | string
  name?: string
  price: number
  quantity: number
}

declare interface PurchaseRequest {
  price: number
  products: PurchaseProduct[]
  delivery: {
    receiver: string
    address: {
      description: string
      city: string
      zipCode: string
      number: number
      complement?: string
    }
  }
  payment: {
    card: {
      name: string
      number: string
      code: number
      expires: { month: number; year: number }
    }
  }
}

declare interface PurchaseResponse {
  id: number | string
  status?: string
  orderId?: string
}
