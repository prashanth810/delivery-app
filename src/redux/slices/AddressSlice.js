import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getalladdress, handleCreateAddress, handledeleteadd, handleMakeDefaultAddress, handleUpdateAddress } from '../services/AddressService';

// get my addressess
export const fetchaddress = createAsyncThunk("address/fetch", async (id, thunkAPI) => {
    try {
        const response = await getalladdress(id);
        return response.data.data;  // ← .data.data not .data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const deleteAddress = createAsyncThunk(
    "address/delete",
    async (id, thunkAPI) => {
        try {
            await handledeleteadd(id);
            return id; // return deleted id
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const makeDefaultAddress = createAsyncThunk(
    "address/makeDefault",
    async ({ id, userId }, thunkAPI) => {
        try {
            const response = await handleMakeDefaultAddress(id, userId);
            return response.data.data; // updated address
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// add new address
export const createaddress = createAsyncThunk(
    "address/create",
    async (data, thunkAPI) => {
        try {
            const response = await handleCreateAddress(data);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// ✅ update existing address
export const updateaddress = createAsyncThunk(
    "address/update",
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await handleUpdateAddress(id, data);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


const initialState = {
    getaddress: {
        getmyaddress: [],
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
                state.getaddress.getmyaddress = action.payload;
            })
            .addCase(fetchaddress.rejected, (state, action) => {
                state.getaddress.getaddressloading = false;
                state.getaddress.getaddresserror = action.payload;
            })

            // delete adress
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.getaddress.getmyaddress =
                    state.getaddress.getmyaddress.filter(
                        (item) => item._id !== action.payload
                    );
            })

            // make default addres
            .addCase(makeDefaultAddress.fulfilled, (state, action) => {
                const updated = action.payload;

                state.getaddress.getmyaddress =
                    state.getaddress.getmyaddress.map((item) => ({
                        ...item,
                        isDefault: item._id === updated._id
                    }));
            })

            // add new address
            .addCase(createaddress.fulfilled, (state, action) => {
                state.getaddress.getmyaddress.unshift(action.payload);
            })

            // ✅ update address — replace updated item in list
            .addCase(updateaddress.fulfilled, (state, action) => {
                const updated = action.payload;
                state.getaddress.getmyaddress = state.getaddress.getmyaddress.map((item) =>
                    item._id === updated._id ? updated : item
                );
            })
    },
});

export default AddressSlice.reducer;