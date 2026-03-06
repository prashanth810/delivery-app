import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = 'cart_items';

// ─── Helper ────────────────────────────────────────────────
const loadCart = async () => {
    const raw = await AsyncStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
};

const saveCart = async (items) => {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
};

// ─── Thunks ────────────────────────────────────────────────

// Fetch cart from AsyncStorage
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    return await loadCart();
});

// Add product OR increment if already exists
export const addToCart = createAsyncThunk('cart/addToCart', async (product) => {
    const items = await loadCart();
    const index = items.findIndex((i) => i._id === product._id);

    if (index !== -1) {
        items[index].quantity += 1;
    } else {
        items.push({ ...product, quantity: 1 });
    }

    await saveCart(items);
    return items;
});

// Increment quantity
export const incrementQty = createAsyncThunk(
    'cart/incrementQty',
    async (productId) => {
        const items = await loadCart()

        const index = items.findIndex(i => i._id === productId)

        if (index !== -1) {
            items[index].quantity = (items[index].quantity || 1) + 1
        }

        await saveCart(items)
        return items
    }
)

// Decrement quantity — removes item if qty hits 0
export const decrementQty = createAsyncThunk('cart/decrementQty', async (productId) => {
    let items = await loadCart();
    const index = items.findIndex((i) => i._id === productId);

    if (index !== -1) {
        if (items[index].quantity === 1) {
            items = items.filter((i) => i._id !== productId);
        } else {
            items[index].quantity -= 1;
        }
    }

    await saveCart(items);
    return items;
});

// Remove product completely
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId) => {
    let items = await loadCart();
    items = items.filter((i) => i._id !== productId);
    await saveCart(items);
    return items;
});

// Clear entire cart
export const clearCart = createAsyncThunk('cart/clearCart', async () => {
    await AsyncStorage.removeItem(CART_KEY);
    return [];
});

// ─── Slice ─────────────────────────────────────────────────
const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        const handlePending = (state) => { state.loading = true; state.error = null; };
        const handleFulfilled = (state, action) => { state.loading = false; state.items = action.payload; };
        const handleRejected = (state, action) => { state.loading = false; state.error = action.payload || action.error.message; };


        [fetchCart, addToCart, incrementQty, decrementQty, removeFromCart, clearCart].forEach((thunk) => {
            builder
                .addCase(thunk.pending, handlePending)
                .addCase(thunk.fulfilled, handleFulfilled)
                .addCase(thunk.rejected, handleRejected);
        });
    },
});

export default CartSlice.reducer;

// ─── Selectors ─────────────────────────────────────────────
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
    state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartCount = (state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectItemQty = (productId) => (state) =>
    state.cart.items.find((i) => i._id === productId)?.quantity ?? 0;