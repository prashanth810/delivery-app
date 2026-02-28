import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from '../slices/CategorySlice.js';


const Mystore = configureStore({
    reducer: {
        category: CategorySlice,
    }
});

export default Mystore;