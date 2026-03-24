import {
    StyleSheet, Text, View, FlatList,
    Image, TouchableOpacity, Pressable,
    ActivityIndicator
} from 'react-native'
import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { fetchCart, decrementQty, removeFromCart, incrementQty, selectCartItems, selectCartTotal, selectCartCount } from '../../redux/slices/CartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartModelfooter from '../../categories/CartModelfooter'
import SimilarProducts from './SimilarProducts.jsx'

// ==============================
// Cart Item Card — outside main component
// ✅ prevents re-render on every state change
// ==============================
const RenderCartItem = React.memo(({ item, onIncrement, onDecrement, onRemove }) => {
    const navigation = useNavigation();

    const handleviewproduct = (id) => {
        navigation.navigate("products", { screen: "singleproduct", params: { productid: id } })
    };

    return (
        <View style={styles.itemCard}>

            {/* Left: Info */}
            <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>{item?.name}</Text>
                <Text style={styles.itemSubtotal}>₹{item.price * item.quantity}</Text>

                <View style={styles.delremove}>
                    <View style={styles.delivery}>
                        <Ionicons name="bicycle-sharp" color="#3c3c3c" size={16} />
                        <Text style={styles.deliveryText}> Today 15 minutes</Text>
                    </View>

                    <TouchableOpacity onPress={() => onRemove(item._id)} style={styles.deleteBtn}>
                        <Icon name="trash-can-outline" size={16} color="#c2c2c2" />
                        <Text style={styles.removeText}> Remove </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Right: Image + Qty */}
            <View>
                <TouchableOpacity onPress={() => handleviewproduct(item?._id)}>
                    <Image source={{ uri: item?.imageurl }} style={styles.itemImage} />
                </TouchableOpacity>

                <View style={styles.itemRight}>
                    <View style={styles.qtyControl}>
                        <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={() => onDecrement(item._id)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.qtyBtnText}>−</Text>
                        </TouchableOpacity>

                        <Text style={styles.qtyNumber}>{item.quantity}</Text>

                        <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={() => onIncrement(item._id)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.qtyBtnText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    )
});


// ==============================
// Empty Cart View — outside main component
// ==============================
const EmptyCart = ({ onShop }) => (
    <View style={styles.emptyContainer}>
        <Icon name="cart-off" size={80} color="#ddd" />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Add items to get started</Text>
        <TouchableOpacity style={styles.shopBtn} onPress={onShop} activeOpacity={0.8}>
            <Text style={styles.shopBtnText}>Continue Shopping</Text>
        </TouchableOpacity>
    </View>
);


// ==============================
// Main Cart Screen
// ==============================
const Cartscreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const count = useSelector(selectCartCount);
    const loading = useSelector((state) => state.cart.loading);

    // load cart on mount
    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    // ✅ useCallback prevents new function on every render
    const handleIncrement = useCallback((id) => dispatch(incrementQty(id)), [dispatch]);
    const handleDecrement = useCallback((id) => dispatch(decrementQty(id)), [dispatch]);
    const handleRemove = useCallback((id) => dispatch(removeFromCart(id)), [dispatch]);

    const handleCheckout = () => navigation.navigate("checkout");
    const handleShop = () => navigation.navigate("products");

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-left" size={24} color="#1a1a1a" />
                </Pressable>
                <Text style={styles.headerTitle}>Your Cart</Text>
                <Text />
            </View>

            {/* Loading */}
            {loading && (
                <View style={styles.loadingBox}>
                    <ActivityIndicator size="large" color="purple" />
                </View>
            )}

            {/* Cart List */}
            {!loading && (
                <>
                    {/* Promo banner */}
                    {items.length > 0 && (
                        <View style={styles.countBadge}>
                            <Text style={styles.countText}>Get 2 Dairy Products @129</Text>
                            <Text style={{ color: "#10B981" }}> | </Text>
                            <Text style={styles.countText}>129DR (TCA)</Text>
                        </View>
                    )}

                    <FlatList
                        data={items}
                        keyExtractor={(item, i) => item._id || String(i)}
                        // ✅ renderItem uses useCallback so no unnecessary re-renders
                        renderItem={({ item }) => (
                            <RenderCartItem
                                item={item}
                                onIncrement={handleIncrement}
                                onDecrement={handleDecrement}
                                onRemove={handleRemove}
                            />
                        )}
                        contentContainerStyle={items.length === 0 ? { flex: 1 } : { paddingBottom: 160 }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<EmptyCart onShop={handleShop} />}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        ListFooterComponent={items.length > 0 ? <SimilarProducts items={items} /> : null}
                    />
                </>
            )}

            {/* Checkout Button */}
            <CartModelfooter text={"Proceed To Checkout"} onPress={handleCheckout} />

        </View>
    );
};

export default Cartscreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    backBtn: {
        padding: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1a1a1a",
    },
    countBadge: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f2fcf9",
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#10B981",
    },
    countText: {
        fontSize: 13,
        color: "#10B981",
        fontWeight: "600",
    },
    loadingBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    itemCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginHorizontal: 14,
        marginTop: 10,
        borderRadius: 10,
        padding: 9,
        alignItems: "center",
        elevation: 1,
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
    },
    itemImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
        backgroundColor: "#f5f5f5",
        resizeMode: "cover",
        alignSelf: "center",
    },
    itemInfo: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    itemName: {
        fontSize: 13,
        fontWeight: "500",
        color: "#636262",
        marginBottom: 3,
    },
    itemSubtotal: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#636262",
    },
    itemRight: {
        paddingTop: 5,
    },
    deleteBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    removeText: {
        color: "#c2c2c2",
        fontSize: 12,
    },
    deliveryText: {
        color: "#c2c2c2",
        fontSize: 13,
    },
    qtyControl: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0fcf8",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#10B981",
        overflow: "hidden",
    },
    qtyBtn: {
        paddingHorizontal: 9,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    qtyBtnText: {
        color: "#10B981",
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 18,
    },
    qtyNumber: {
        color: "#10B981",
        fontSize: 12,
        fontWeight: "800",
        minWidth: 20,
        textAlign: "center",
    },
    separator: {
        height: 1,
        backgroundColor: "transparent",
    },
    delivery: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    delremove: {
        flexDirection: "column",
        gap: 5,
        paddingTop: 6,
    },
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 60,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1a1a1a",
        marginTop: 16,
    },
    emptySubtitle: {
        fontSize: 14,
        color: "#999",
        marginTop: 6,
        marginBottom: 24,
    },
    shopBtn: {
        backgroundColor: "purple",
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 10,
    },
    shopBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
});