import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from '../slices/CategorySlice.js';
import CartSlice from '../slices/CartSlice.js';


const Mystore = configureStore({
    reducer: {
        category: CategorySlice,
        cart: CartSlice,
    }
});

export default Mystore;