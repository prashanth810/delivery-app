import {
    Dimensions, FlatList, Image, Pressable,
    StyleSheet, Text, TouchableOpacity, View
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByCategory, handlegetcategories } from '../redux/slices/CategorySlice'
import { addToCart, incrementQty, decrementQty, selectItemQty } from '../redux/slices/CartSlice'
import CategoryModel from './CategoryModel.jsx';
import CartModelfooter from './CartModelfooter.jsx';

const CategoryMenu = () => {
    const [count, setCount] = useState(1);
    const route = useRoute();
    const navigation = useNavigation();
    const { categoryname, categoryId } = route?.params;

    const dispatch = useDispatch();
    const { width } = Dimensions.get("window");
    const card_width = (width - 32) / 2;

    const { catpro, catprodloading, catproderror } = useSelector((state) => state.category.categoryprods);
    const { categories } = useSelector((state) => state.category.categorydata);
    const cartItems = useSelector((state) => state.cart.items);

    useEffect(() => {
        dispatch(handlegetcategories());
    }, [dispatch]);

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchProductsByCategory(categoryId));
        }
    }, [categoryId]);

    const [categoriess, setCategoriess] = useState(categoryname);
    const [categoriesModal, setCategoriesModal] = useState(false);

    const handleprevious = () => navigation.goBack();

    // Get quantity of a specific product in cart
    const getItemQty = (productId) => {
        const found = cartItems.find((i) => i._id === productId);
        return found ? found.quantity : 0;
    };

    const handleAdd = (item) => {
        dispatch(addToCart(item));
    };

    const handleIncrement = (productId) => {
        dispatch(incrementQty(productId));
    };

    const handleDecrement = (productId) => {
        dispatch(decrementQty(productId));
    };

    // Render each product card
    const Rendercatproducts = ({ item }) => {
        const qty = getItemQty(item._id);

        return (
            <Pressable style={[styles.card, { width: card_width }]}>
                {/* ── Image Box ── */}
                <View style={styles.imageBox}>
                    <Image source={{ uri: item?.imageurl }} style={styles.image} />

                    <View style={styles.stock}>
                        <Text style={{ fontSize: 12, fontWeight: "500" }}> {count} pack</Text>
                    </View>

                    <TouchableOpacity style={styles.heart}>
                        <FontAwesome name="heart-o" size={12} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* ── Info Box ── */}
                <View style={styles.infoBox}>
                    <Text style={styles.productName} numberOfLines={2}>{item?.name}</Text>
                    <Text style={styles.productdesc} numberOfLines={2}>{item?.description}</Text>

                    <View style={styles.priceRow}>
                        <Text style={styles.productPrice}>₹{item?.price}</Text>

                        {qty === 0 ? (
                            <TouchableOpacity
                                style={styles.addBtn}
                                activeOpacity={0.8}
                                onPress={() => handleAdd(item)}
                            >
                                <Text style={styles.addBtnText}>ADD</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.qtyControl}>
                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => handleDecrement(item._id)}
                                >
                                    <Text style={styles.qtyBtnText}>−</Text>
                                </TouchableOpacity>

                                <Text style={styles.qtyNumber}>{qty}</Text>

                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => handleIncrement(item._id)}
                                >
                                    <Text style={styles.qtyBtnText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>

                {/* ── Get In Banner ── */}
                <View style={styles.getin}>
                    <Text style={styles.getintext}>⚡ GET IN 15 MIN</Text>
                </View>
            </Pressable>
        );
    };

    const handleSelectCategory = (id) => {
        dispatch(fetchProductsByCategory(id));
    };

    const handleviewcart = () => {
        navigation.navigate("cart");
    }

    return (
        <View style={styles.container}>
            {/* ── Header ── */}
            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <Pressable onPress={handleprevious}>
                        <Icon name="arrow-left" size={24} />
                    </Pressable>

                    <Pressable style={styles.categoryWrapper} onPress={() => setCategoriesModal(true)}>
                        <Text style={styles.categoryText}>{categoriess}</Text>
                        <FontAwesome name="angle-down" size={18} />
                    </Pressable>
                </View>

                <Pressable>
                    <EvilIcons name="search" size={26} />
                </Pressable>
            </View>

            {/* ── Product Grid ── */}
            {catpro.length === 0 ? (
                <View style={styles.emptyBox}>
                    <Text>No Products found !!!</Text>
                </View>
            ) : (
                <View style={{ flex: 1, marginHorizontal: 4, paddingBottom: 55 }}>
                    <FlatList
                        data={catpro}
                        keyExtractor={(item, i) => item._id || String(i)}
                        showsVerticalScrollIndicator={false}
                        renderItem={Rendercatproducts}
                        numColumns={2}
                        ListEmptyComponent={
                            <Text style={{ color: "lightgray", textAlign: "center" }}>
                                No products in this category
                            </Text>
                        }
                    />
                </View>
            )}

            {/* ── Category Modal ── */}
            <CategoryModel
                categoriesmodel={categoriesModal}
                setCategoriesModal={setCategoriesModal}
                setCategories={setCategoriess}
                cat={categories}
                onSelectCategory={handleSelectCategory}
            />

            <CartModelfooter onPress={handleviewcart} text={"View Cart"} />
        </View>
    );
};

export default CategoryMenu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    categoryWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    categoryText: {
        fontSize: 18,
        fontWeight: "600",
    },
    emptyBox: {
        height: 96,
        alignItems: "center",
        justifyContent: "center",
    },

    // ── Card ──
    card: {
        margin: 6,
        borderRadius: 10,
        backgroundColor: "#fff",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        overflow: "hidden",
    },
    imageBox: {
        width: "100%",
        height: 110,
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
        borderRadius: 10,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    stock: {
        position: "absolute",
        left: 5,
        bottom: 4,
        backgroundColor: "#fff",
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 16,
    },
    heart: {
        width: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 6,
        top: 6,
        backgroundColor: "#fff",
        borderRadius: 16,
    },
    infoBox: {
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    productName: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1a1a1a",
        marginBottom: 3,
    },
    productdesc: {
        fontSize: 11,
        fontWeight: "400",
        color: "#999999",
    },
    productPrice: {
        fontSize: 15,
        color: "#444",
        fontWeight: "800",
        paddingTop: 5,
    },
    getin: {
        borderTopWidth: 1,
        borderColor: "#faf7f7",
        paddingVertical: 6,
        backgroundColor: "#fefaff",
    },
    getintext: {
        textAlign: "center",
        fontSize: 11,
        fontWeight: "bold",
        color: "purple",
    },

    // ── Cart Row ──
    cartRow: {
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 8,
    },

    // ADD button (when qty === 0)
    addBtn: {
        width: "80%",
        backgroundColor: "#fff",
        borderWidth: 1.5,
        borderColor: "purple",
        borderRadius: 8,
        paddingVertical: 6,
        alignItems: "center",
    },
    addBtnText: {
        color: "purple",
        fontWeight: "700",
        fontSize: 13,
        letterSpacing: 1,
    },

    // - qty + controls (when qty > 0)
    qtyControl: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "purple",
        borderRadius: 8,
        width: "80%",
        justifyContent: "space-between",
        overflow: "hidden",
    },
    qtyBtn: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    qtyBtnText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        lineHeight: 20,
    },
    qtyNumber: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700",
        minWidth: 20,
        textAlign: "center",
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 6,
    },

    addBtn: {
        borderWidth: 1.5,
        borderColor: "#10B981",
        paddingHorizontal: 16,
        paddingVertical: 4,
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
        backgroundColor: "#f2fcf9",
        borderRadius: 6,
    },

    qtyBtn: {
        paddingHorizontal: 8,
        paddingVertical: 3,
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
        minWidth: 20,
        textAlign: "center",
    },
});