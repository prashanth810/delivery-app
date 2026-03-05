import { Animated, Dimensions, FlatList, Image, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, memo, useRef } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsByCategory } from '../redux/slices/CategorySlice'

const CategoryMenu = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { categoryname, categoryId } = route?.params;
    const scale = useRef(new Animated.Value(1)).current;

    const dispatch = useDispatch();
    const { width } = Dimensions.get("window");
    const card_width = (width - 32) / 2;

    const { catpro, catprodloading, catproderror } = useSelector((state) => state.category.categoryprods);

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchProductsByCategory(categoryId));
        }
    }, [categoryId]);

    const [selectcat, setSelectcat] = useState(categoryname);
    const [model, setModel] = useState(false);

    const handleprevious = () => {
        navigation.goBack();
    }


    const Rendercatproducts = ({ item }) => {
        return (
            <Pressable style={[styles.card, {
                width: card_width,
            }]}>
                <View style={styles.imageBox}>
                    <Image source={{ uri: item?.imageurl }} style={styles.image} />

                    <View style={styles.stock}>
                        <Text style={{ fontSize: 12, fontWeight: "500" }}>1 pack</Text>
                    </View>

                    <TouchableOpacity style={styles.heart}>
                        <FontAwesome name="heart-o" size={12} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.productName} numberOfLines={2}>{item?.name}</Text>

                    <Text style={styles.productdesc} numberOfLines={2}>{item?.description}</Text>

                    <Text style={styles.productPrice}> ₹{item?.price}</Text>
                </View>

                <View style={styles.getin}>
                    <Text style={styles.getintext}> ⚡ GET IN 15 MIN</Text>
                </View>
            </Pressable>
        );
    };


    return (
        <View style={styles.container}>
            {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}


            <View style={styles.header}>

                {/* LEFT SECTION */}
                <View style={styles.leftSection}>

                    <Pressable onPress={handleprevious}>
                        <Icon name="arrow-left" size={24} />
                    </Pressable>

                    <Pressable style={styles.categoryWrapper}>
                        <Text style={styles.categoryText}>
                            {categoryname}
                        </Text>

                        <FontAwesome name="angle-down" size={18} />
                    </Pressable>

                </View>

                {/* RIGHT SECTION */}
                <Pressable>
                    <EvilIcons name="search" size={26} />
                </Pressable>

            </View>


            {catpro.length === 0 ? (
                <View style={{ height: 96, alignItems: "center", justifyContent: "center" }}>
                    <Text> No Products found !!!</Text>
                </View>
            ) : (
                <View style={{ flex: 1, marginHorizontal: 4, marginBottom: 80 }}>
                    <FlatList
                        data={catpro}
                        keyExtractor={(item, i) => item._id || i}
                        showsVerticalScrollIndicator={false}
                        renderItem={Rendercatproducts}
                        numColumns={2}
                    />
                </View>
            )}



        </View>
    )
}

export default CategoryMenu

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
    // card wrapper
    card: {
        margin: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#f7f7f7",
    },

    // image container
    imageBox: {
        width: "100%",
        height: 110,
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        borderRadius: 10,
    },

    // image
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    // text wrapper
    infoBox: {
        paddingHorizontal: 8,
        paddingVertical: 10,
    },

    // product name
    productName: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1a1a1a",
        marginBottom: 3,
    },

    productdesc: {
        fontSize: 11,
        fontWeight: "400",
        color: "#1a1a1a",
    },

    // product price
    productPrice: {
        fontSize: 15,
        color: "#444",
        fontWeight: "800",
        paddingTop: 5,
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
    getin: {
        borderTopWidth: 1,
        borderColor: "#f7f7f7",
        paddingVertical: 8,
        backgroundColor: "#fefaff",
    },
    getintext: {
        textAlign: "center",
        fontSize: 13,
        fontWeight: "bold",
        color: "purple"
    },
})