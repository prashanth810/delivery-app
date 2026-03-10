import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from '../slices/CategorySlice.js';
import CartSlice from '../slices/CartSlice.js';
import AuthSlice from '../slices/AuthSlice.js';


const Mystore = configureStore({
    reducer: {
        category: CategorySlice,
        cart: CartSlice,
        auth: AuthSlice
    }
});

export default Mystore;