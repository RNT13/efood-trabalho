import { RestaurantType } from '../../types/restaurantTypes'
import { apiSlice } from './apiSlice'

export const restaurantsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRestaurants: builder.query<RestaurantType[], void>({
      query: () => '/restaurantes',
      providesTags: ['Restaurant']
    }),
    getRestaurantById: builder.query<RestaurantType, string>({
      query: id => `/restaurantes/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Restaurant', id }]
    }),
    getRestaurantsByCategory: builder.query<RestaurantType[], string>({
      query: category => `/restaurantes?categoria=${category}`,
      providesTags: ['Restaurant']
    })
  })
})
export const { useGetRestaurantsQuery, useGetRestaurantByIdQuery, useGetRestaurantsByCategoryQuery } = restaurantsApi
