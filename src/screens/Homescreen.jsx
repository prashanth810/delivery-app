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

    const dispatch = useDispatch();

    const { categories, categoryloading, categoryerror, page, totalPages } = useSelector((state) => state.category.categorydata)

    useEffect(() => {
        dispatch(handlegetcategories({ page: 1, limit: 10 }));
    }, [dispatch]);

    // Load more when end of horizontal list is reached
    const loadMoreCategories = () => {
        if (!categoryloading && page < totalPages) {
            dispatch(handlegetcategories({ page: page + 1, limit: 10 }));
        }
    };

    const CategoryList = ({ cat, onPress }) => {

        return (
            <View key={cat._id}>
                <TouchableOpacity style={{ margin: 5, flexDirection: 'column', alignItems: "center", justifyContent: 'center' }} onPress={onPress}>
                    <View style={styles.catstyles}>
                        <Image
                            source={{ uri: cat.imageurl }}
                            style={styles.catimg}
                        />
                    </View>
                    <Text style={{ textAlign: "center", fontSize: 12 }}> {cat.name.slice(0, 15)} </Text>
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
                    ) : categories && categories.length > 0 ? (
                        <FlatList
                            data={[...categories].reverse()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={{ paddingHorizontal: 10 }}
                            onEndReached={loadMoreCategories}
                            onEndReachedThreshold={0.5}
                            renderItem={({ item }) => (
                                <CategoryList
                                    cat={item}
                                    onPress={() =>
                                        navigation.navigate("category", {
                                            categoryId: item._id,
                                            categoryname: item.name,
                                        })
                                    }
                                />
                            )}
                        />
                    ) : (
                        /* This shows only in the category section area, not full screen */
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No categories available</Text>
                        </View>
                    )}


                    {/* flash sales  */}
                    <View style={styles.flash}>
                        <View style={styles.flashrow}>
                            <Text style={styles.flashhead}> Flash Deals ⚡ </Text>
                            <Text style={styles.flashviewall}> View All </Text>
                        </View>
                        <View style={{ marginHorizontal: 10 }}>
                            <Image source={{ uri: "https://img.freepik.com/free-vector/sale-background-supermarket-template_23-2149378053.jpg" }}
                                width={"100%"} height={"160"} resizeMode='cover' borderRadius={10} />
                        </View>
                    </View>

                    {/* daily specials  */}
                    <View style={styles.flash}>
                        <View style={styles.flashrow}>
                            <Text style={styles.flashhead}> Daily Special </Text>
                            <Text style={styles.flashviewall}> View All </Text>
                        </View>
                    </View>


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
        width: 110,
        height: 90,
        resizeMode: "cover",
        borderRadius: 3
    },
    catimg: {
        width: 50,
        height: 50,
        backgroundColor: "#f4f4f5",
        borderRadius: 50,
        marginTop: 6
    },
    catstyles: {
        marginHorizontal: 8,
        paddingVertical: 7,
        width: 40,
        alignItems: "center",
    },
    emptyContainer: {
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    emptyText: {
        color: '#666',
        fontSize: 14,
        fontStyle: 'italic',
    },

})