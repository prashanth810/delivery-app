import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getcategories, handlegetproducts } from "../services/CategoryService";

// get all categories
export const handlegetcategories = createAsyncThunk("category/fetchcategories", async (_, thunkAPI) => {
    try {
        const resposne = await getcategories();
        return resposne.data.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


// fetch products by category id
export const fetchProductsByCategory = createAsyncThunk(
    "products/fetchByCategory",
    async (categoryId, thunkAPI) => {
        try {
            const res = await handlegetproducts(categoryId);
            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


const initialState = {
    categorydata: {
        categories: [],
        categoryloading: false,
        categoryerror: null,
    },
    categoryprods: {
        catpro: [],
        catprodloading: false,
        catproderror: null,
    },
}

const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch all categories
            .addCase(handlegetcategories.pending, (state) => {
                state.categorydata.categoryloading = true;
                state.categorydata.categoryerror = null;
            })
            .addCase(handlegetcategories.fulfilled, (state, action) => {
                state.categorydata.categoryloading = false;
                state.categorydata.categories = action.payload;
            })
            .addCase(handlegetcategories.rejected, (state, action) => {
                state.categorydata.categoryloading = false;
                state.categorydata.categoryerror = action.payload;
            })

            // fetch products by category id
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.categoryprods.catprodloading = true;
                state.categoryprods.catproderror = null;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.categoryprods.catprodloading = false;
                state.categoryprods.catpro = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.categoryprods.catprodloading = false;
                state.categoryprods.catproderror = action.payload;
            })

    }
})

export default CategorySlice.reducer;