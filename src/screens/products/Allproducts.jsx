import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { handlegetcategories, fetchProductsByCategory } from '../../redux/slices/CategorySlice.js';
import { addToCart, decrementQty, incrementQty } from '../../redux/slices/CartSlice.js';
import Categorymenuskeliton from '../../components/Categorymenuskeliton.jsx';

const Allproductsbycategory = () => {
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { categories, categoryloading, page, totalPages } = useSelector((state) => state.category.categorydata);
    const { catpro, catprodloading } = useSelector((state) => state.category.categoryprods);
    const cartItems = useSelector((state) => state.cart.items);

    useEffect(() => {
        dispatch(handlegetcategories({ page: 1, limit: 20 }));
    }, [dispatch]);

    // ── Auto select first category ──
    useEffect(() => {
        if (categories?.length > 0 && !activeCategoryId) {
            const firstId = categories[0]._id;
            setActiveCategoryId(firstId);
            dispatch(fetchProductsByCategory({ categoryId: firstId, page: 1, limit: 20 }));
        }
    }, [categories]);

    const getItemQty = (productId) => {
        const found = cartItems.find((i) => i._id === productId);
        return found ? found.quantity : 0;
    };

    const handleCategoryPress = (id) => {
        setActiveCategoryId(id);
        dispatch(fetchProductsByCategory({ categoryId: id, page: 1, limit: 20 }));
    };

    const SidebarSkeleton = () => (
        <View>
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <View key={i} style={styles.skeletonItem}>
                    <View style={styles.skeletonCircle} />
                    <View style={styles.skeletonLine} />
                    <View style={styles.skeletonLineShort} />
                </View>
            ))}
        </View>
    );

    // ── Sidebar Category Item ──
    const SidebarCat = ({ item }) => {
        const isActive = activeCategoryId === item._id;
        return (
            <TouchableOpacity
                style={[styles.sidebarItem, isActive && styles.sidebarItemActive]}
                onPress={() => handleCategoryPress(item._id)}
                activeOpacity={0.8}
            >
                {isActive && <View style={styles.activeBar} />}
                <Image
                    source={{ uri: item.imageurl }}
                    style={[styles.sidebarImg, isActive && styles.sidebarImgActive]}
                />
                <Text
                    style={[styles.sidebarName, isActive && styles.sidebarNameActive]}
                    numberOfLines={2}
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    // ── Right Product Card ──
    const CatProductCard = ({ item }) => {
        const qty = getItemQty(item._id);
        return (
            <TouchableOpacity
                style={styles.catProductCard}
                onPress={() => navigation.navigate("singleproduct", { productid: item._id })}
                activeOpacity={0.9} >
                <View style={styles.catProductImgBox}>
                    <Image source={{ uri: item.imageurl }} style={styles.catProductImg} resizeMode="cover" />
                    {item.stock === 0 && (
                        <View style={styles.outOfStockOverlay}>
                            <Text style={styles.outOfStockText}>Out of Stock</Text>
                        </View>
                    )}
                </View>
                <View style={styles.catProductInfo}>
                    <Text style={styles.catProductName} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.catProductDesc} numberOfLines={1}>{item.description}</Text>
                    <View style={styles.catProductBottom}>
                        <Text style={styles.catProductPrice}>₹{item.price}</Text>
                        {qty === 0 ? (
                            <TouchableOpacity
                                style={styles.addBtn}
                                onPress={() => dispatch(addToCart(item))}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.addBtnText}>ADD</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.qtyControl}>
                                <TouchableOpacity style={styles.qtyBtn} onPress={() => dispatch(decrementQty(item._id))}>
                                    <Text style={styles.qtyBtnText}>−</Text>
                                </TouchableOpacity>
                                <Text style={styles.qtyNumber}>{qty}</Text>
                                <TouchableOpacity style={styles.qtyBtn} onPress={() => dispatch(incrementQty(item._id))}>
                                    <Text style={styles.qtyBtnText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />

            {/* ── Header ── */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Feather name="arrow-left" size={22} color="#1a1a1a" />
                </Pressable>
                <Text style={styles.headerTitle}>All Products</Text>
                <Pressable
                    onPress={() => navigation.navigate("cart")}
                    style={styles.cartBtn}
                >
                    <Feather name="shopping-cart" size={20} color="#1a1a1a" />
                    {cartItems.length > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>
                                {cartItems.length}
                            </Text>
                        </View>
                    )}
                </Pressable>
            </View>

            {/* ── Body: Sidebar + Products ── */}
            <View style={styles.body}>

                {/* ── Left Sidebar ── */}
                <View style={styles.sidebar}>
                    {categoryloading ? (
                        <SidebarSkeleton />
                    ) : (
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item._id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => <SidebarCat item={item} />}
                            contentContainerStyle={styles.productsContent}
                        />
                    )}
                </View>

                {/* ── Right Products ── */}
                <View style={styles.productsArea}>
                    {catprodloading ? (
                        <Categorymenuskeliton />
                    ) : catpro?.length === 0 ? (
                        <View style={styles.centerBox}>
                            <Text style={styles.emptyText}>No products found</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={catpro}
                            keyExtractor={(item) => item._id}
                            numColumns={2}
                            columnWrapperStyle={styles.catColumnWrapper}
                            contentContainerStyle={styles.productsContent}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => <CatProductCard item={item} />}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

export default Allproductsbycategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },

    // ── Header ──
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    backBtn: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#1a1a1a",
        flex: 1,
        textAlign: "center",
    },
    cartBtn: {
        padding: 4,
        position: "relative",
    },
    cartBadge: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "#15803d",
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    cartBadgeText: {
        color: "#fff",
        fontSize: 9,
        fontWeight: "700",
    },

    // ── Body ──
    body: {
        flex: 1,
        flexDirection: "row",
    },

    // ── Left Sidebar ──
    sidebar: {
        width: 82,
        backgroundColor: "#f7f7f7",
        borderRightWidth: 1,
        borderRightColor: "#efefef",
    },
    sidebarItem: {
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 6,
        position: "relative",
        backgroundColor: "#f7f7f7",
    },
    sidebarItemActive: {
        backgroundColor: "#fff",
    },
    activeBar: {
        position: "absolute",
        left: 0,
        top: "15%",
        bottom: "15%",
        width: 3,
        backgroundColor: "#15803d",
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
    },
    sidebarImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#eee",
        marginBottom: 6,
        opacity: 0.55,
    },
    sidebarImgActive: {
        opacity: 1,
        borderWidth: 1.5,
        borderColor: "#15803d",
    },
    sidebarName: {
        fontSize: 10,
        textAlign: "center",
        color: "#bbb",
        fontWeight: "500",
        lineHeight: 13,
    },
    sidebarNameActive: {
        color: "#15803d",
        fontWeight: "700",
    },

    // ── Right Products ──
    productsArea: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    productsContent: {
        padding: 8,
        paddingBottom: 60,
    },
    catColumnWrapper: {
        gap: 5,
        marginBottom: 5,
    },
    catProductCard: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#efefef",
    },
    catProductImgBox: {
        width: "100%",
        height: 100,
        padding: 10,
        backgroundColor: "#f5f5f5",
        position: "relative",
    },
    catProductImg: {
        width: "100%",
        height: "100%",
    },
    outOfStockOverlay: {
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.35)",
        alignItems: "center",
        justifyContent: "center",
    },
    outOfStockText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 11,
    },
    catProductInfo: {
        padding: 7,
    },
    catProductName: {
        fontSize: 12,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 2,
        lineHeight: 16,
    },
    catProductDesc: {
        fontSize: 10,
        color: "#aaa",
        marginBottom: 6,
    },
    catProductBottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    catProductPrice: {
        fontSize: 13,
        fontWeight: "800",
        color: "#15803d",
    },

    // ── ADD / QTY ──
    addBtn: {
        borderWidth: 1.5,
        borderColor: "#10B981",
        paddingHorizontal: 9,
        paddingVertical: 3,
        borderRadius: 6,
        backgroundColor: "#fff",
    },
    addBtnText: {
        color: "#10B981",
        fontWeight: "700",
        fontSize: 11,
    },
    qtyControl: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#10B981",
        backgroundColor: "#f0fdf8",
        borderRadius: 6,
    },
    qtyBtn: {
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    qtyBtnText: {
        color: "#10B981",
        fontSize: 14,
        fontWeight: "700",
    },
    qtyNumber: {
        color: "#10B981",
        fontSize: 12,
        fontWeight: "700",
        minWidth: 16,
        textAlign: "center",
    },

    // ── Empty / Loading ──
    centerBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText: {
        color: "#aaa",
        fontSize: 14,
    },
    skeletonItem: {
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 6,
        gap: 5,
    },
    skeletonCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#e8e8e8",
        marginBottom: 4,
    },
    skeletonLine: {
        width: 50,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#e8e8e8",
    },
    skeletonLineShort: {
        width: 35,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#efefef",
    },
});