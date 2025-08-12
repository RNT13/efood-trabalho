import { combineReducers, configureStore as toolkitConfigureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import cartSlice from './slices/cartSlice'
import checkoutSlice from './slices/checkoutSlice'

const rootReducer = combineReducers({
  cart: cartSlice,
  checkout: checkoutSlice,
  [apiSlice.reducerPath]: apiSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>

export function configureStore(preloadedState?: Partial<RootState>) {
  return toolkitConfigureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            'api/executeQuery/pending',
            'api/executeQuery/fulfilled',
            'api/executeQuery/rejected',
            'api/executeMutation/pending',
            'api/executeMutation/fulfilled',
            'api/executeMutation/rejected'
          ]
        }
      }).concat(apiSlice.middleware),
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production'
  })
}

export const store = configureStore()
export type AppStore = ReturnType<typeof configureStore>
export type RootReducer = typeof rootReducer
export type AppDispatch = AppStore['dispatch']
