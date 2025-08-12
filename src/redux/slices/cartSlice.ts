import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

type AddToCartPayload = {
  foodId: string
  name: string
  price: number
  image: string
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const existingItem = state.items.find(item => item.foodId === action.payload.foodId)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.foodId !== action.payload)
    },
    decrementItemQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item.foodId === action.payload)
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1
        } else {
          state.items = state.items.filter(item => item.foodId !== action.payload)
        }
      }
    },
    resetCart: () => initialState
  }
})

export const { addToCart, removeFromCart, decrementItemQuantity, resetCart } = cartSlice.actions
export default cartSlice.reducer
