import apiSlice from './apiSlice'

export const purchaseApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createPurchase: builder.mutation<PurchaseResponse, PurchaseRequest>({
      query: body => ({
        url: '/checkout',
        method: 'POST',
        body
      })
    })
  })
})

export const { useCreatePurchaseMutation } = purchaseApi
