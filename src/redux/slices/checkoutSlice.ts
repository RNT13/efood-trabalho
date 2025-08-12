import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CheckoutState {
  deliveryInfo: Delivery | null
  paymentInfo: Payment | null
}

const initialState: CheckoutState = {
  deliveryInfo: null,
  paymentInfo: null
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setDeliveryInfo: (state, action: PayloadAction<Delivery>) => {
      state.deliveryInfo = action.payload
    },
    setPaymentInfo: (state, action: PayloadAction<Payment>) => {
      state.paymentInfo = action.payload
    },
    resetCheckout: () => initialState
  }
})

export const { setDeliveryInfo, setPaymentInfo, resetCheckout } = checkoutSlice.actions
export default checkoutSlice.reducer
