import { Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { fetchsingleproduct } from '../../redux/slices/ProductSlice';
import { addToCart, incrementQty, decrementQty } from '../../redux/slices/CartSlice.js';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get("window");

// ── Responsive scale helpers ──
const scale = (size) => (width / 375) * size;
const vscale = (size) => (height / 812) * size;
const mscale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const Singleproduct = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const productid = route?.params?.productid;

    const dispatch = useDispatch();
    const { product, singleprodctloading } = useSelector((state) => state.products.singleproduct);
    const cartItems = useSelector((state) => state.cart.items);

    const qty = cartItems.find((i) => i._id === product?._id)?.quantity || 0;

    useEffect(() => {
        if (productid) dispatch(fetchsingleproduct(productid));
    }, [productid]);

    if (singleprodctloading || !product) {
        return (
            <View style={styles.loadingBox}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />

            {/* ── Header ── */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Feather name="arrow-left" size={scale(22)} color="#1a1a1a" />
                </Pressable>
                <Text style={styles.headerTitle} numberOfLines={1}>Product Details</Text>
                <View style={{ width: scale(34) }} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* ── Product Image ── */}
                <View style={styles.imgBox}>
                    <Image
                        source={{ uri: product.imageurl }}
                        style={styles.productImg}
                        resizeMode="contain"
                    />
                </View>

                {/* ── Info Card ── */}
                <View style={styles.infoCard}>

                    {/* Name */}
                    <Text style={styles.productName}>{product.name}</Text>

                    {/* Delivery badge */}
                    <View style={styles.deliveryRow}>
                        <Ionicons name="bicycle-sharp" size={scale(14)} color="#10B981" />
                        <Text style={styles.deliveryText}>Free delivery · Get in 15 minutes</Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Price + Add to cart row */}
                    <View style={styles.priceCartRow}>
                        <View>
                            <Text style={styles.priceLabel}>Price</Text>
                            <Text style={styles.price}>₹{product.price}</Text>
                        </View>

                        {product.stock === 0 ? (
                            <View style={styles.outStockBadge}>
                                <Text style={styles.outStockText}>Out of Stock</Text>
                            </View>
                        ) : qty === 0 ? (
                            <TouchableOpacity
                                style={styles.addBtn}
                                activeOpacity={0.85}
                                onPress={() => dispatch(addToCart(product))}
                            >
                                <Feather name="shopping-cart" size={scale(14)} color="#fff" />
                                <Text style={styles.addBtnText}>Add to Cart</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.qtyControl}>
                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => dispatch(decrementQty(product._id))}
                                >
                                    <Text style={styles.qtyBtnText}>−</Text>
                                </TouchableOpacity>
                                <Text style={styles.qtyNumber}>{qty}</Text>
                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => dispatch(incrementQty(product._id))}
                                >
                                    <Text style={styles.qtyBtnText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <View style={styles.divider} />

                    {/* Description */}
                    <Text style={styles.descHead}>About this product</Text>
                    <Text style={styles.desc}>{product.description}</Text>

                    <View style={styles.divider} />

                    {/* Meta Row */}
                    <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                            <Feather name="package" size={scale(16)} color="#15803d" />
                            <Text style={styles.metaValue}>{product.stock}</Text>
                            <Text style={styles.metaLabel}>In Stock</Text>
                        </View>
                        <View style={styles.metaDivider} />
                        <View style={styles.metaItem}>
                            <Feather name="truck" size={scale(16)} color="#15803d" />
                            <Text style={styles.metaValue}>Free</Text>
                            <Text style={styles.metaLabel}>Delivery</Text>
                        </View>
                        <View style={styles.metaDivider} />
                        <View style={styles.metaItem}>
                            <Feather name="shield" size={scale(16)} color="#15803d" />
                            <Text style={styles.metaValue}>100%</Text>
                            <Text style={styles.metaLabel}>Genuine</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Singleproduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    loadingBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    loadingText: {
        color: "#aaa",
        fontSize: mscale(14),
    },

    // ── Header ──
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingHorizontal: scale(14),
        paddingVertical: vscale(14),
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    backBtn: {
        padding: scale(4),
    },
    headerTitle: {
        fontSize: mscale(16),
        fontWeight: "700",
        color: "#1a1a1a",
        flex: 1,
        textAlign: "center",
    },

    scrollContent: {
        paddingBottom: vscale(40),
    },

    // ── Image ──
    imgBox: {
        backgroundColor: "#fff",
        height: width * 0.75,
        paddingBottom: vscale(8),
        paddingTop: vscale(20),
    },
    productImg: {
        width: "100%",
        height: "100%",
    },

    // ── Info Card ──
    infoCard: {
        backgroundColor: "#fff",
        paddingHorizontal: scale(16),
        paddingVertical: vscale(18),
        marginTop: scale(8),
    },
    productName: {
        fontSize: mscale(17),
        fontWeight: "700",
        color: "#1a1a1a",
        lineHeight: mscale(25),
        marginBottom: vscale(10),
    },

    // ── Delivery ──
    deliveryRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(6),
        backgroundColor: "#f0fdf8",
        paddingHorizontal: scale(10),
        paddingVertical: vscale(7),
        borderRadius: scale(8),
        alignSelf: "flex-start",
    },
    deliveryText: {
        fontSize: mscale(12),
        color: "#10B981",
        fontWeight: "600",
    },

    divider: {
        height: 1,
        backgroundColor: "#f5f5f5",
        marginVertical: vscale(14),
    },

    // ── Price + Cart Row ──
    priceCartRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    priceLabel: {
        fontSize: mscale(11),
        color: "#aaa",
        marginBottom: vscale(2),
        fontWeight: "500",
    },
    price: {
        fontSize: mscale(24),
        fontWeight: "800",
        color: "#15803d",
    },

    // ── Add Button ──
    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(6),
        backgroundColor: "#15803d",
        paddingHorizontal: scale(14),
        paddingVertical: vscale(9),
        borderRadius: scale(20),
    },
    addBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: mscale(13),
    },

    // ── Qty Control ──
    qtyControl: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#10B981",
        backgroundColor: "#f0fdf8",
        borderRadius: scale(20),
        overflow: "hidden",
    },
    qtyBtn: {
        paddingHorizontal: scale(10),
        paddingVertical: vscale(5),
    },
    qtyBtnText: {
        color: "#10B981",
        fontSize: mscale(16),
        fontWeight: "700",
    },
    qtyNumber: {
        color: "#10B981",
        fontSize: mscale(13),
        fontWeight: "700",
        minWidth: scale(26),
        textAlign: "center",
    },

    // ── Out of stock ──
    outStockBadge: {
        backgroundColor: "#fef2f2",
        borderWidth: 1,
        borderColor: "#ef4444",
        paddingHorizontal: scale(14),
        paddingVertical: vscale(9),
        borderRadius: scale(10),
    },
    outStockText: {
        fontSize: mscale(13),
        color: "#ef4444",
        fontWeight: "600",
    },

    // ── Description ──
    descHead: {
        fontSize: mscale(14),
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: vscale(8),
    },
    desc: {
        fontSize: mscale(13),
        color: "#666",
        lineHeight: mscale(21),
    },

    // ── Meta Row ──
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#f9fafb",
        borderRadius: scale(12),
        paddingVertical: vscale(16),
        borderWidth: 1,
        borderColor: "#f0f0f0",
    },
    metaItem: {
        alignItems: "center",
        gap: vscale(4),
        flex: 1,
    },
    metaDivider: {
        width: 1,
        height: vscale(36),
        backgroundColor: "#e5e7eb",
    },
    metaValue: {
        fontSize: mscale(13),
        fontWeight: "700",
        color: "#1a1a1a",
        marginTop: vscale(4),
    },
    metaLabel: {
        fontSize: mscale(11),
        color: "#aaa",
        fontWeight: "500",
    },
});