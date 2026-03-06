import {
    StyleSheet, Text, View, FlatList,
    Image, TouchableOpacity, Pressable,
    ActivityIndicator
} from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { fetchCart, decrementQty, removeFromCart, clearCart, selectCartItems, selectCartTotal, selectCartCount, incrementQty } from '../../redux/slices/CartSlice'

const Cartscreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const items = useSelector(selectCartItems)
    const total = useSelector(selectCartTotal)
    const count = useSelector(selectCartCount)
    const loading = useSelector((state) => state.cart.loading)

    // Load cart from AsyncStorage when screen mounts
    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])

    const handleIncrement = (id) => dispatch(incrementQty(id))
    const handleDecrement = (id) => dispatch(decrementQty(id))
    const handleRemove = (id) => dispatch(removeFromCart(id))
    const handleClearAll = () => dispatch(clearCart())

    // ── Single cart item row ──
    const RenderCartItem = ({ item }) => (
        <View style={styles.itemCard}>
            {/* Product Image */}
            <Image source={{ uri: item?.imageurl }} style={styles.itemImage} />

            {/* Info */}
            <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>{item?.name}</Text>
                <Text style={styles.itemDesc} numberOfLines={1}>{item?.description}</Text>
                <Text style={styles.itemPrice}>₹{item?.price}</Text>
            </View>

            {/* Right: qty + delete */}
            <View style={styles.itemRight}>
                {/* Delete button */}
                <TouchableOpacity onPress={() => handleRemove(item._id)} style={styles.deleteBtn}>
                    <Icon name="trash-can-outline" size={18} color="#e53935" />
                </TouchableOpacity>

                {/* — qty + controls */}
                <View style={styles.qtyControl}>
                    <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => handleDecrement(item._id)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.qtyBtnText}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyNumber}>{item.quantity}</Text>

                    <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => handleIncrement(item._id)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* subtotal per item */}
                <Text style={styles.itemSubtotal}>₹{item.price * item.quantity}</Text>
            </View>
        </View>
    )

    // ── Empty cart view ──
    const EmptyCart = () => (
        <View style={styles.emptyContainer}>
            <Icon name="cart-off" size={80} color="#ddd" />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>Add items to get started</Text>
            <TouchableOpacity
                style={styles.shopBtn}
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
            >
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

                <Text style={styles.headerTitle}>My Cart</Text>

                {items.length > 0 && (
                    <TouchableOpacity onPress={handleClearAll}>
                        <Text style={styles.clearText}>Clear All</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* ── Item count badge ── */}
            {items.length > 0 && (
                <View style={styles.countBadge}>
                    <Icon name="cart-outline" size={16} color="purple" />
                    <Text style={styles.countText}>{count} item{count > 1 ? 's' : ''} in cart</Text>
                </View>
            )}

            {/* ── Loading ── */}
            {loading && (
                <View style={styles.loadingBox}>
                    <ActivityIndicator size="large" color="purple" />
                </View>
            )}

            {/* ── Cart Items List ── */}
            {!loading && (
                <FlatList
                    data={items}
                    keyExtractor={(item, i) => item._id || String(i)}
                    renderItem={RenderCartItem}
                    contentContainerStyle={items.length === 0 ? { flex: 1 } : { paddingBottom: 160 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<EmptyCart />}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            )}

            {/* ── Bottom Checkout Bar ── */}
            {items.length > 0 && (
                <View style={styles.bottomBar}>
                    {/* Bill summary */}
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

                    {/* Checkout button */}
                    <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.85}>
                        <Icon name="lightning-bolt" size={18} color="#fff" />
                        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                    </TouchableOpacity>
                </View>
            )}

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
        gap: 6,
        backgroundColor: "#f3e5f5",
        marginHorizontal: 16,
        marginTop: 12,
        marginBottom: 4,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    countText: {
        fontSize: 13,
        color: "purple",
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
        marginHorizontal: 16,
        marginTop: 10,
        borderRadius: 12,
        padding: 12,
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
    },
    itemInfo: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    itemName: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 3,
    },
    itemDesc: {
        fontSize: 11,
        color: "#999",
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 13,
        fontWeight: "700",
        color: "#444",
    },

    // ── Right side ──
    itemRight: {
        alignItems: "center",
        gap: 6,
    },
    deleteBtn: {
        padding: 4,
    },
    qtyControl: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "purple",
        borderRadius: 8,
        overflow: "hidden",
    },
    qtyBtn: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    qtyBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 18,
    },
    qtyNumber: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "700",
        minWidth: 22,
        textAlign: "center",
    },
    itemSubtotal: {
        fontSize: 13,
        fontWeight: "800",
        color: "purple",
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
})