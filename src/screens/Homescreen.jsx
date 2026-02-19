import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header'
import SearchInput from '../components/SearchInput';
import Bannercarosel from '../components/Bannercarosel';

const Homescreen = () => {
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");

    const products = [
        {
            id: '1',
            name: 'Cow Milk Packet',
            price: 70,
            imageUrl: 'https://thumbs.dreamstime.com/b/farm-fresh-dairy-concept-depicted-cute-cow-figurine-placed-bottle-milk-creating-attractive-banner-high-quality-338868419.jpg',
        },
        {
            id: '2',
            name: 'Buffalo Milk',
            price: 80,
            imageUrl: 'https://thumbs.dreamstime.com/b/farm-fresh-dairy-concept-depicted-cute-cow-figurine-placed-bottle-milk-creating-attractive-banner-high-quality-338868419.jpg',
        },
        {
            id: '3',
            name: 'Fresh Curd',
            price: 50,
            imageUrl: 'https://thumbs.dreamstime.com/b/farm-fresh-dairy-concept-depicted-cute-cow-figurine-placed-bottle-milk-creating-attractive-banner-high-quality-338868419.jpg',
        },
        {
            id: '4',
            name: 'Paneer 200g',
            price: 95,
            imageUrl: 'https://thumbs.dreamstime.com/b/farm-fresh-dairy-concept-depicted-cute-cow-figurine-placed-bottle-milk-creating-attractive-banner-high-quality-338868419.jpg',
        },
        {
            id: '5',
            name: 'Butter 500g',
            price: 120,
            imageUrl: 'https://thumbs.dreamstime.com/b/farm-fresh-dairy-concept-depicted-cute-cow-figurine-placed-bottle-milk-creating-attractive-banner-high-quality-338868419.jpg',
        },
        {
            id: '6',
            name: 'Cheese Slices',
            price: 140,
            imageUrl: 'https://thumbs.dreamstime.com/b/farm-fresh-dairy-concept-depicted-cute-cow-figurine-placed-bottle-milk-creating-attractive-banner-high-quality-338868419.jpg',
        },
    ];



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
                    {/* <View>

                        </View> */}

                    {/* flash sales  */}
                    <View style={styles.flash}>
                        <View style={styles.flashrow}>
                            <Text style={styles.flashhead}> Flash Sale </Text>
                            <Text style={styles.flashviewall}> View All </Text>
                        </View>
                    </View>

                    {/* poojo specials  */}
                    <View style={styles.flash}>
                        <View style={styles.flashrow}>
                            <Text style={styles.flashhead}> Pojo Special </Text>
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
        height: 150,
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
    }

})