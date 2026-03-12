import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getalladdress } from '../services/AddressService';

// get all addressess
export const fetchaddress = createAsyncThunk("address/fetch", async (_, thunkAPI) => {
    try {
        const response = await getalladdress();
        return response.data.data;  // ← .data.data not .data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

const initialState = {
    getaddress: {
        getalladdress: [],
        getaddressloading: false,
        getaddresserror: null,
    },

};

const AddressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchaddress.pending, (state) => {
                state.getaddress.getaddressloading = true;
                state.getaddress.getaddresserror = null;
            })
            .addCase(fetchaddress.fulfilled, (state, action) => {
                state.getaddress.getaddressloading = false;
                state.getaddress.getalladdress = action.payload;
            })
            .addCase(fetchaddress.rejected, (state, action) => {
                state.getaddress.getaddressloading = false;
                state.getaddress.getaddresserror = action.payload;
            })
    },
});

export default AddressSlice.reducer;