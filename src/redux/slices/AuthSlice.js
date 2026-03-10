import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handlelogin, handlesignup } from '../services/AuthService';

// singup 
export const signup = createAsyncThunk("auth/signup", async (data, thunkAPI) => {
    try {
        const response = await handlesignup(data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});


// login
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        const response = await handlelogin(data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

// ✅ check token on app start
export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, thunkAPI) => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            return true;
        }
        return false;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const initialState = {
    logindata: {
        loginuser: {},
        loginloading: false,
        loginerror: null,
        isauthenticate: false,
        isCheckingAuth: true, // ✅ prevents flicker on app start
    },
    signupdata: {
        signuser: {},
        signuploading: false,
        signuperror: null,
    }
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutuser: (state) => {
            state.logindata.isauthenticate = false;
            state.logindata.loginuser = {};
        },
    },
    extraReducers: (builder) => {
        builder
            // sign up
            .addCase(signup.pending, (state) => {
                state.signupdata.signuploading = true;
                state.signupdata.signuperror = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.signupdata.signuploading = false;
                state.signupdata.signuser = action.payload;
            })
            .addCase(signup.rejected, (state, action) => {
                state.signupdata.signuploading = false;
                state.signupdata.signuperror = action.payload;
            })

            // login
            .addCase(login.pending, (state) => {
                state.logindata.loginloading = true;
                state.logindata.loginerror = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.logindata.loginloading = false;
                state.logindata.loginuser = action.payload.data;
                state.logindata.isauthenticate = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.logindata.loginloading = false;
                state.logindata.loginerror = action.payload;
                state.logindata.isauthenticate = false;
            })
            // ✅ checkAuth cases
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.logindata.isauthenticate = action.payload;
                state.logindata.isCheckingAuth = false;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.logindata.isauthenticate = false;
                state.logindata.isCheckingAuth = false;
            })
    }
});

export const { logoutuser } = AuthSlice.actions;
export default AuthSlice.reducer;