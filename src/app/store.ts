import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../features/cart"
import productReducer from "../features/Product"

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store