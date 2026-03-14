import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getcategories, handlegetproducts } from "../services/CategoryService";

// get all categories
export const handlegetcategories = createAsyncThunk("category/fetchcategories", async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
    try {
        const response = await getcategories(page, limit);
        return {
            data: response.data.data,
            page: response.data.page,
            totalPages: response.data.totalPages,
        };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


// fetch products by category id
export const fetchProductsByCategory = createAsyncThunk(
    "products/fetchByCategory",
    async ({ categoryId, page = 1, limit = 10 }, thunkAPI) => {
        try {
            const res = await handlegetproducts(categoryId, page, limit);
            return {
                data: res.data.data,
                page: res.data.page,
                categoryId,
            };
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
        page: 1,
        totalPages: 1,
    },
    categoryprods: {
        catpro: [],
        catprodloading: false,
        catproderror: null,
        page: 1,
        hasMore: true,
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
                const { data, page, totalPages } = action.payload;
                if (page === 1) {
                    state.categorydata.categories = data; // fresh load
                } else {
                    state.categorydata.categories = [...state.categorydata.categories, ...data]; // append
                }
                state.categorydata.page = page;
                state.categorydata.totalPages = totalPages;
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
                const { data, page, categoryId } = action.payload;

                if (page === 1) {
                    state.categoryprods.catpro = data; // fresh load or category switch
                } else {
                    state.categoryprods.catpro = [...state.categoryprods.catpro, ...data]; // append
                }

                state.categoryprods.page = page;
                state.categoryprods.hasMore = data.length === 10; // if less than limit, no more pages
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.categoryprods.catprodloading = false;
                state.categoryprods.catproderror = action.payload;
            })

    }
})

export default CategorySlice.reducer;