import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createdordeer, createordersrazor, getmyorders } from '../services/OrderService.js';

export const handlecreateRazorpayOrder = createAsyncThunk("order/createorder", async (data, thunkAPI) => {
    try {
        const response = await createordersrazor(data);
        return response.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const handleCreateOrder = createAsyncThunk("order/saveorder", async (data, thunkAPI) => {
    try {
        const response = await createdordeer(data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const handlegetmyorders = createAsyncThunk("orders/myorders", async (_, thunkAPI) => {
    try {
        const response = await getmyorders();
        return response.data.orders;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

const initialState = {
    razorpayorder: {
        razororderdata: {},
        razorpayloading: false,
        razorpayerror: null,
    },
    createorders: {
        createorderdata: {},
        createorderloading: false,
        createordererror: null,
    },
    getorders: {
        getorderdata: [],
        getorderloading: false,
        getordererror: null,
    }
};

const OrderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(handlecreateRazorpayOrder.pending, (state) => {
                state.razorpayorder.razorpayloading = true;
                state.razorpayorder.razorpayerror = null;
            })
            .addCase(handlecreateRazorpayOrder.fulfilled, (state, action) => {
                state.razorpayorder.razorpayloading = false;
                state.razorpayorder.razororderdata = action.payload;
            })
            .addCase(handlecreateRazorpayOrder.rejected, (state, action) => {
                state.razorpayorder.razorpayloading = false;
                state.razorpayorder.razorpayerror = action.payload;
            })


            // order creates 
            .addCase(handleCreateOrder.pending, (state) => {
                state.createorders.createorderloading = true;
                state.createorders.createordererror = null;
            })
            .addCase(handleCreateOrder.fulfilled, (state, action) => {
                state.createorders.createorderloading = false;
                state.createorders.createorderdata = action.payload;
            })
            .addCase(handleCreateOrder.rejected, (state, action) => {
                state.createorders.createorderloading = false;
                state.createorders.createordererror = action.payload;
            })

            // my orders data
            .addCase(handlegetmyorders.pending, (state) => {
                state.getorders.getorderloading = true;
                state.getorders.getordererror = null;
            })
            .addCase(handlegetmyorders.fulfilled, (state, action) => {
                state.getorders.getorderloading = false;
                state.getorders.getorderdata = action.payload;
            })
            .addCase(handlegetmyorders.rejected, (state, action) => {
                state.getorders.getorderloading = false;
                state.getorders.getordererror = action;
            })
    },
});

export default OrderSlice.reducer;