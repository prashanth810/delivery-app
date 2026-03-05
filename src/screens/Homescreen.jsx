import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header'
import SearchInput from '../components/SearchInput';
import Bannercarosel from '../components/Bannercarosel';
import { useDispatch, useSelector } from 'react-redux';
import { handlegetcategories } from '../redux/slices/CategorySlice.js'
import CatLoading from '../components/CatLoading.jsx';
import { useNavigation } from '@react-navigation/native';
import MainNavigator from '../navigations/MainNavigator.jsx';



const Homescreen = () => {
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const navigation = useNavigation();

    const products = [
        {
            id: '1',
            name: 'Cow Milk Packet',
            price: 70,
            imageUrl:
                'https://cdn.zeptonow.com/production/tr:w-403,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/a05ee90f-d81b-43a5-8f40-8c16a981730e.jpeg',
        },
        {
            id: '2',
            name: 'Buffalo Milk',
            price: 80,
            imageUrl:
                'https://www.bbassets.com/media/uploads/p/l/40149834_1-nandini-shubham-milk.jpg',
        },
        {
            id: '3',
            name: 'Cow Milk Packet',
            price: 70,
            imageUrl:
                'https://cdn.zeptonow.com/production/tr:w-403,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/a05ee90f-d81b-43a5-8f40-8c16a981730e.jpeg',
        },
        {
            id: '4',
            name: 'Buffalo Milk',
            price: 80,
            imageUrl:
                'https://www.bbassets.com/media/uploads/p/l/40149834_1-nandini-shubham-milk.jpg',
        },
    ];

    const dispatch = useDispatch();

    const { categories, categoryloading, categoryerror } = useSelector((state) => state.category.categorydata)

    useEffect(() => {
        dispatch(handlegetcategories());
    }, [dispatch]);


    const CategoryList = ({ cat, onPress }) => {
        return (
            <View key={cat._id}>
                <TouchableOpacity style={{ margin: 5 }} onPress={onPress}>
                    <View style={styles.catstyles}>
                        <Image
                            source={{ uri: cat.imageurl }}
                            style={styles.catimg}
                        />
                    </View>
                    <Text style={{ textAlign: "center", fontSize: 12 }}> {cat.name} </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#15803d"} translucent={false} />

            <View style={styles.mainhead}>
                <Header />

                <View style={styles.searchinp}>
                    <SearchInput value={search} onChange={setSearch} />
                </View>
            </View>

            <ScrollView style={styles.caroselstarts}>
                <View style={styles.firstrow}>
                    <View style={styles.secondrow}>
                        <Bannercarosel />
                    </View>

                    {/* categories  */}
                    {categoryloading ? (
                        <CatLoading />
                    ) : (
                        <FlatList
                            data={categories}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={{ paddingHorizontal: 10 }}
                            renderItem={({ item }) => (
                                <CategoryList cat={item}
                                    onPress={() =>
                                        navigation.navigate("category", {
                                            categoryId: item._id,
                                            categoryname: item.name,
                                        })
                                    } />
                            )}
                        />
                    )}


                    {/* flash sales  */}
                    <View style={styles.flash}>
                        <View style={styles.flashrow}>
                            <Text style={styles.flashhead}> Flash Sale </Text>
                            <Text style={styles.flashviewall}> View All </Text>
                        </View>

                        <View style={{ backgroundColor: "#e8fff0", paddingVertical: 30, marginHorizontal: 10 }}>
                            <Text style={{ textAlign: 'center', color: "red" }}> Coming soon </Text>
                        </View>
                    </View>

                    {/* poojo specials  */}
                    <View style={styles.flash}>
                        <View style={styles.flashrow}>
                            <Text style={styles.flashhead}> Daily Special </Text>
                            <Text style={styles.flashviewall}> View All </Text>
                        </View>
                    </View>

                    {/* list of products  */}
                    <ScrollView horizontal showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10 }}>
                        {products?.map((item, i) => {
                            return (
                                <View key={i}>
                                    <View key={item.id} style={styles.prodimgview}>
                                        <Image source={{ uri: item.imageUrl }} style={styles.itemimg} />
                                    </View>
                                    <View style={styles.prodhead}>
                                        <Text style={styles.name}> {item.name} </Text>
                                        <Text style={styles.price}> ₹ {item.price} </Text>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}

export default Homescreen

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
    caroselstarts: {
        flex: 1,
        backgroundColor: "#ffff",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    firstrow: {
        paddingTop: 10
    },
    secondrow: {
        paddingHorizontal: 10
    },
    flash: {
        paddingVertical: 5,
    },
    flashrow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    flashhead: {
        fontSize: 16,
        fontWeight: "bold"
    },
    flashviewall: {
        color: "purple"
    },
    itemimg: {
        width: 150,
        height: 120,
        resizeMode: "cover",
        borderRadius: 3
    },
    prodimgview: {
        paddingRight: 12,
    },
    prodhead: {
        paddingTop: 6,
        gap: 5
    },
    name: {
        fontSize: 15,
        fontWeight: 500,
    },
    price: {
        fontSize: 17,
        fontWeight: 600
    },
    catimg: {
        width: 53,
        height: 53,
        borderRadius: 30,
        resizeMode: "cover"
    },
    catstyles: {
        width: 64,
        height: 64,
        backgroundColor: "#F3EBFF",
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: 5,
        marginTop: 15,
        borderRadius: "100%"
    }

})