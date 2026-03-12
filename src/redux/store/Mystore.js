import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from '../slices/CategorySlice.js';
import CartSlice from '../slices/CartSlice.js';
import AuthSlice from '../slices/AuthSlice.js';
import AddressSlice from '../slices/AddressSlice.js';
import OrderSlice from '../slices/OrderSlice.js';

const Mystore = configureStore({
    reducer: {
        category: CategorySlice,
        cart: CartSlice,
        auth: AuthSlice,
        address: AddressSlice,
        order: OrderSlice,
    }
});

export default Mystore;