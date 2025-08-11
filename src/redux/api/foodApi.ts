/* eslint-disable prettier/prettier */
import { apiSlice } from './apiSlice';

export const foodApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getFoodByRestaurant: builder.query<Food[], string>({
      query: restaurantId => `/restaurantes/${restaurantId}/cardapio`,
      providesTags: (_result, _error, restaurantId) => [{ type: 'Food', id: restaurantId }]
    }),
    getFoodType: builder.query<Food, { restaurantId: string; itemId: string }>({
      query: ({ restaurantId, itemId }) => `/restaurantes/${restaurantId}/cardapio/${itemId}`,
      providesTags: (_result, _error, { itemId }) => [{ type: 'Food', id: itemId }]
    })
  })
})

export const { useGetFoodByRestaurantQuery, useGetFoodTypeQuery } = foodApi
