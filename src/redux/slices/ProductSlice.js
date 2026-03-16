import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getproducts, getsingleproduct } from '../services/ProductService.js';

// get all products
export const fetchallprodcuts = createAsyncThunk("products/fetchproducts", async (_, thunkAPI) => {
    try {
        const response = await getproducts();
        return response.data.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


// get single product
export const fetchsingleproduct = createAsyncThunk("products/fetchsingleproduct", async (id, thunkAPI) => {
    try {
        const response = await getsingleproduct(id);
        return response.data.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const initialState = {
    prodcutdata: {
        products: [],
        prodctloading: false,
        prodcterror: null,
    },
    singleproduct: {
        product: {},
        singleprodctloading: false,
        singleprodcterror: null,
    },
};

const ProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchallprodcuts.pending, (state) => {
                state.prodcutdata.prodctloading = true;
                state.prodcutdata.prodcterror = null;
            })
            .addCase(fetchallprodcuts.fulfilled, (state, action) => {
                state.prodcutdata.prodctloading = false;
                state.prodcutdata.products = action.payload;
            })
            .addCase(fetchallprodcuts.rejected, (state, action) => {
                state.prodcutdata.prodctloading = false;
                state.prodcutdata.prodcterror = action.payload;
            })

            .addCase(fetchsingleproduct.pending, (state) => {
                state.singleproduct.singleprodctloading = true;
                state.singleproduct.singleprodcterror = null;
            })
            .addCase(fetchsingleproduct.fulfilled, (state, action) => {
                state.singleproduct.singleprodctloading = false;
                state.singleproduct.product = action.payload;
            })
            .addCase(fetchsingleproduct.rejected, (state, action) => {
                state.singleproduct.singleprodctloading = false;
                state.singleproduct.singleprodcterror = action.payload;
            })
    },
});

export default ProductSlice.reducer;