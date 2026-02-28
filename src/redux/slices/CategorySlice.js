import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getcategories } from "../services/CategoryService";



export const handlegetcategories = createAsyncThunk("category/fetchcategories", async (_, thunkAPI) => {
    try {
        const resposne = await getcategories();
        return resposne.data.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

const initialState = {
    categorydata: {
        categories: [],
        categoryloading: false,
        categoryerror: null,
    },
}

const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
    }
})

export default CategorySlice.reducer;