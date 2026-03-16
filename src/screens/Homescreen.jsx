import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header'
import SearchInput from '../components/SearchInput';
import Bannercarosel from '../components/Bannercarosel';
import { useDispatch, useSelector } from 'react-redux';
import { handlegetcategories } from '../redux/slices/CategorySlice.js'
import CatLoading from '../components/CatLoading.jsx';
import { useNavigation } from '@react-navigation/native';
import { fetchallprodcuts } from '../redux/slices/ProductSlice.js';
import { addToCart, decrementQty, incrementQty } from '../redux/slices/CartSlice.js';
import Categorymenuskeliton from '../components/Categorymenuskeliton.jsx';
import Feather from 'react-native-vector-icons/Feather'

const Homescreen = () => {
    const [search, setSearch] = useState("");
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { categories, categoryloading, page, totalPages } = useSelector((state) => state.category.categorydata)
    const { products, prodctloading } = useSelector((state) => state.products.prodcutdata)
    const cartItems = useSelector((state) => state.cart.items);


    const handlesingleproduct = (id) => {
        navigation.navigate("singleproduct", {
            productid: id,
        });
    };

    useEffect(() => {
        dispatch(handlegetcategories({ page: 1, limit: 10 }));
        dispatch(fetchallprodcuts());
    }, [dispatch]);

    const handleaddtocart = (item) => {
        dispatch(addToCart(item));
    }

    const loadMoreCategories = () => {
        if (!categoryloading && page < totalPages) {
            dispatch(handlegetcategories({ page: page + 1, limit: 10 }));
        }
    };

    const getItemQty = (productId) => {
        const found = cartItems.find((i) => i._id === productId);
        return found ? found.quantity : 0;
    };

    // ── Category Item ──
    const CategoryList = ({ cat, onPress }) => (
        <TouchableOpacity style={styles.catItem} onPress={onPress}>
            <Image source={{ uri: cat.imageurl }} style={styles.catimg} />
            <Text style={styles.catName}>{cat.name.slice(0, 12)}</Text>
        </TouchableOpacity>
    );

    // ── View More Card (fills the 12th slot) ──
    const ViewMoreCard = () => (
        <TouchableOpacity
            style={[styles.productCard, styles.viewMoreCard]}
            onPress={() => navigation.navigate("allproducts")}
            activeOpacity={0.8}
        >
            <Text style={styles.viewMoreText}>View More <Feather name="arrow-right" size={15} color="#fff" /> </Text>
        </TouchableOpacity>
    );

    // ── Product Card ──
    const RenderProducts = ({ item }) => {
        const qty = getItemQty(item._id);
        return (
            <View style={styles.productCard}>
                <TouchableOpacity style={styles.productImgWrapper}
                    onPress={() => handlesingleproduct(item._id)}>
                    <Image source={{ uri: item.imageurl }} style={styles.productImg} resizeMode="cover" />
                    {item.stock === 0 && (
                        <View style={styles.outOfStockOverlay}>
                            <Text style={styles.outOfStockText}>Out of Stock</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.productDesc} numberOfLines={1}>{item.description}</Text>
                    <View style={styles.productBottom}>
                        <Text style={styles.productPrice}>₹{item.price}</Text>
                        {qty === 0 ? (
                            <TouchableOpacity
                                style={styles.addBtn}
                                activeOpacity={0.8}
                                onPress={() => handleaddtocart(item)} >
                                <Text style={styles.addBtnText}>ADD</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.qtyControl}>
                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => dispatch(decrementQty(item._id))}
                                >
                                    <Text style={styles.qtyBtnText}>−</Text>
                                </TouchableOpacity>
                                <Text style={styles.qtyNumber}>{qty}</Text>
                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => dispatch(incrementQty(item._id))}
                                >
                                    <Text style={styles.qtyBtnText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    // ── List Header (banner + categories + flash) ──
    const ListHeader = () => (
        <View>
            {/* Banner */}
            <View style={styles.bannerRow}>
                <Bannercarosel />
            </View>

            {/* Categories */}
            {categoryloading ? (
                <CatLoading />
            ) : categories?.length > 0 ? (
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.catList}
                    onEndReached={loadMoreCategories}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => (
                        <CategoryList
                            cat={item}
                            onPress={() => navigation.navigate("category", {
                                categoryId: item._id,
                                categoryname: item.name,
                            })}
                        />
                    )}
                />
            ) : null}

            {/* Flash Deals */}
            <View style={styles.sectionBlock}>
                <View style={styles.sectionRow}>
                    <Text style={styles.sectionHead}>Flash Deals ⚡</Text>
                    <Text style={styles.viewAll}>View All</Text>
                </View>
                <View style={styles.bannerImg}>
                    <Image
                        source={{ uri: "https://img.freepik.com/free-vector/sale-background-supermarket-template_23-2149378053.jpg" }}
                        style={{ width: "100%", height: 150, borderRadius: 10 }}
                        resizeMode="cover"
                    />
                </View>
            </View>

            {/* Daily Special heading */}
            <View style={styles.sectionRow}>
                <Text style={styles.sectionHead}> Special deals </Text>
                <Text style={styles.viewAll}>View All</Text>
            </View>

            {/* Products loading */}
            {prodctloading && (
                <Categorymenuskeliton />
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#15803d" translucent={false} />

            {/* Green header */}
            <View style={styles.mainhead}>
                <Header />
                <View style={styles.searchinp}>
                    <SearchInput value={search} onChange={setSearch} />
                </View>
            </View>

            {/* White body */}
            <View style={styles.body}>
                <FlatList
                    data={prodctloading ? [] : [...products.slice(0, 11), { _id: "viewmore", isViewMore: true }]}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    renderItem={({ item }) =>
                        item.isViewMore ? (
                            <ViewMoreCard />
                        ) : (
                            <RenderProducts item={item} />
                        )
                    }
                    ListHeaderComponent={<ListHeader />}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        !prodctloading ? (
                            <View style={styles.emptyBox}>
                                <Text style={styles.emptyText}>No products available</Text>
                            </View>
                        ) : null
                    }
                />
            </View>
        </View>
    );
};

export default Homescreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#15803d",
    },
    mainhead: {
        paddingHorizontal: 8,
    },
    searchinp: {
        marginVertical: 8,
    },
    body: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        borderTopRightRadius: 28,
        borderTopLeftRadius: 28,
        overflow: "hidden",
    },
    listContent: {
        paddingBottom: 100,
        backgroundColor: "#f5f5f5",
    },

    // ── Banner ──
    bannerRow: {
        paddingHorizontal: 10,
        paddingTop: 12,
        backgroundColor: "#fff",
    },

    // ── Categories ──
    catList: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#fff",
    },
    catItem: {
        alignItems: "center",
        marginHorizontal: 8,
        paddingVertical: 10,
    },
    catimg: {
        width: 42,
        height: 42,
        borderRadius: 27,
        backgroundColor: "#f0f0f0",
        borderWidth: 1,
        borderColor: "#ccc",
    },
    catName: {
        fontSize: 11,
        textAlign: "center",
        marginTop: 5,
        color: "#333",
        fontWeight: "500",
    },

    // ── Flash / Section ──
    sectionBlock: {
        backgroundColor: "#fff",
        paddingBottom: 10,
    },
    sectionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: "#fff",
    },
    sectionHead: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1a1a1a",
    },
    viewAll: {
        fontSize: 13,
        color: "purple",
        fontWeight: "500",
    },
    bannerImg: {
        paddingHorizontal: 10,
    },

    // ── Product Cards ──
    columnWrapper: {
        paddingHorizontal: 8,
        gap: 8,
        marginTop: 8,
    },
    productCard: {
        flex: 1,
        backgroundColor: "#fff",
        marginBottom: 8,
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#efefef",        // ← border instead of shadow
    },
    productImgWrapper: {
        width: "100%",
        height: 120,
        backgroundColor: "#f5f5f5",
    },
    productImg: {
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
        fontSize: 12,
    },
    productInfo: {
        padding: 8,
    },
    productName: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 2,
        lineHeight: 17,
    },
    productDesc: {
        fontSize: 11,
        color: "#aaa",
        marginBottom: 8,
    },
    productBottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    productPrice: {
        fontSize: 15,
        fontWeight: "800",
        color: "#15803d",
    },
    addBtn: {
        borderWidth: 1.5,
        borderColor: "#10B981",
        paddingHorizontal: 14,
        paddingVertical: 3,
        borderRadius: 6,
        backgroundColor: "#fff",
    },
    addBtnText: {
        color: "#10B981",
        fontWeight: "700",
        fontSize: 12,
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
        paddingHorizontal: 7,
        paddingVertical: 2,
    },
    qtyBtnText: {
        color: "#10B981",
        fontSize: 16,
        fontWeight: "700",
    },
    qtyNumber: {
        color: "#10B981",
        fontSize: 13,
        fontWeight: "700",
        minWidth: 18,
        textAlign: "center",
    },

    // ── Empty ──
    emptyBox: {
        paddingVertical: 30,
        alignItems: "center",
    },
    emptyText: {
        color: "#aaa",
        fontSize: 14,
    },
    viewMoreCard: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ccc",
    },
    viewMoreText: {
        fontSize: 15,
        color: "#fff",
        fontWeight: "700",
    },
});