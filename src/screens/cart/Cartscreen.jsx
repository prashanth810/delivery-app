import {
    StyleSheet, Text, View, FlatList,
    Image, TouchableOpacity, Pressable,
    ActivityIndicator
} from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { fetchCart, decrementQty, removeFromCart, clearCart, selectCartItems, selectCartTotal, selectCartCount, incrementQty } from '../../redux/slices/CartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartModelfooter from '../../categories/CartModelfooter'
import SimilarProducts from './SimilarProducts.jsx'

const Cartscreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const items = useSelector(selectCartItems)
    console.log(items, 'iiiiiiiiiiiiiii')
    const total = useSelector(selectCartTotal)
    const count = useSelector(selectCartCount)
    const loading = useSelector((state) => state.cart.loading);

    // Load cart from AsyncStorage when screen mounts
    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])

    const handleIncrement = (id) => dispatch(incrementQty(id))
    const handleDecrement = (id) => dispatch(decrementQty(id))
    const handleRemove = (id) => dispatch(removeFromCart(id))

    const handlecheckout = () => {
        navigation.navigate("checkout");
    }

    // ── Single cart item row ──
    const RenderCartItem = ({ item }) => (
        <>
            <View style={styles.itemCard}>

                {/* Info */}
                <View style={styles.itemInfo}>
                    <Text style={styles.itemName} numberOfLines={2}>{item?.name}</Text>

                    {/* subtotal per item */}
                    <Text style={styles.itemSubtotal}>₹{item.price * item.quantity}</Text>

                    <View style={styles.delremove}>
                        <View style={styles.delivery}>
                            <Ionicons
                                name="bicycle-sharp" color="#3c3c3c" size={16} />
                            <Text style={{ color: "#c2c2c2", fontSize: 13 }}> Today 15 minuates</Text>
                        </View>

                        <TouchableOpacity onPress={() => handleRemove(item._id)} style={styles.deleteBtn}>
                            <Icon name="trash-can-outline" size={16}
                                color="#c2c2c2" />
                            <Text style={{ color: "#c2c2c2", fontSize: 12 }}> Remove </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    {/* Product Image */}
                    <Image source={{ uri: item?.imageurl }} style={styles.itemImage} />

                    {/* Right: qty + delete */}
                    <View style={styles.itemRight}>
                        {/* — qty + controls */}
                        <View style={styles.qtyControl}>
                            <TouchableOpacity
                                style={styles.qtyBtn}
                                onPress={() => handleDecrement(item._id)}
                                activeOpacity={0.8}>
                                <Text style={styles.qtyBtnText}>−</Text>
                            </TouchableOpacity>
                            <Text style={styles.qtyNumber}>{item.quantity}</Text>
                            <TouchableOpacity
                                style={styles.qtyBtn}
                                onPress={() => handleIncrement(item._id)}
                                activeOpacity={0.8} >
                                <Text style={styles.qtyBtnText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )

    // ── Empty cart view ──
    const EmptyCart = () => (
        <View style={styles.emptyContainer}>
            <Icon name="cart-off" size={80} color="#ddd" />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>Add items to get started</Text>
            <TouchableOpacity
                style={styles.shopBtn}
                onPress={() => navigation.navigate("home")}
                activeOpacity={0.8} >
                <Text style={styles.shopBtnText}>Continue Shopping</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
            {/* ── Header ── */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-left" size={24} color="#1a1a1a" />
                </Pressable>

                <Text style={styles.headerTitle}> Your Cart </Text>
                <Text />
                {/* {items.length > 0 && (
                    <TouchableOpacity onPress={handleClearAll}>
                        <Text style={styles.clearText}>Clear All</Text>
                    </TouchableOpacity>
                )} */}
            </View>

            {/* ── Loading ── */}
            {loading && (
                <View style={styles.loadingBox}>
                    <ActivityIndicator size="large" color="purple" />
                </View>
            )}

            {/* ── Cart Items List ── */}
            {!loading && (
                <>
                    {/* ── Item count badge ── */}
                    <View View style={styles.countBadge}>
                        <Text style={styles.countText}> Get 2 Dairy Products @129</Text>
                        <Text style={{ color: "#10B981", }} > | </Text>
                        <Text style={styles.countText}> 129DR (TCA)</Text>
                    </View>

                    <FlatList
                        data={items}
                        keyExtractor={(item, i) => item._id || String(i)}
                        renderItem={RenderCartItem}
                        contentContainerStyle={items.length === 0 ? { flex: 1 } : { paddingBottom: 160 }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<EmptyCart />}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        ListFooterComponent={items.length > 0 ? <SimilarProducts items={items} /> : null}
                    />
                </>
            )}

            {/* ── Bottom Checkout Bar ── */}
            {/* {items.length > 0 && (
                <View style={styles.bottomBar}>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Subtotal ({count} items)</Text>
                        <Text style={styles.billValue}>₹{total}</Text>
                    </View>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Delivery Fee</Text>
                        <Text style={[styles.billValue, { color: "green" }]}>FREE</Text>
                    </View>
                    <View style={[styles.billRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>₹{total}</Text>
                    </View>

                    <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.85}>
                        <Icon name="lightning-bolt" size={18} color="#fff" />
                        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                    </TouchableOpacity>
                </View>
            )} */}

            <CartModelfooter text={"Procced To Checkout"} onPress={handlecheckout} />

        </View>
    )
}

export default Cartscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },

    // ── Header ──
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
    clearText: {
        fontSize: 13,
        color: "#e53935",
        fontWeight: "600",
    },

    // ── Count badge ──
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
        fontSize: 12,
        fontWeight: "500",
        color: "#065f46",
        textAlign: "center",
    },
    countText: {
        fontSize: 13,
        color: "#10B981",
        fontWeight: "600",
    },

    // ── Loading ──
    loadingBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    // ── Cart item card ──
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
        margin: "auto",
        borderRadius: 10,
        backgroundColor: "#f5f5f5",
        resizeMode: "cover",
    },
    itemInfo: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    itemName: {
        fontSize: 15,
        fontWeight: "500",
        color: "#1a1a1a",
        marginBottom: 3,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: "800",
        color: "#444",
    },

    // ── Right side ──
    itemRight: {
        paddingTop: 5
    },
    deleteBtn: {
        flexDirection: "row",
        alignItems: 'center',
        gap: 5,
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
    itemSubtotal: {
        fontSize: 17,
        fontWeight: "bold",
    },

    separator: {
        height: 1,
        backgroundColor: "transparent",
    },

    // ── Empty ──
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

    // ── Bottom checkout bar ──
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 80,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -3 },
        shadowRadius: 8,
    },
    billRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    billLabel: {
        fontSize: 13,
        color: "#777",
    },
    billValue: {
        fontSize: 13,
        color: "#444",
        fontWeight: "600",
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
        paddingTop: 8,
        marginTop: 4,
        marginBottom: 12,
    },
    totalLabel: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1a1a1a",
    },
    totalValue: {
        fontSize: 16,
        fontWeight: "800",
        color: "purple",
    },
    checkoutBtn: {
        backgroundColor: "purple",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 14,
        borderRadius: 12,
    },
    checkoutText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },
    delivery: {
        flexDirection: "row",
        alignItems: 'center',
        gap: 2
    },
    delremove: {
        flexDirection: "column",
        gap: 5,
        paddingTop: 6,
    },
})