import { Image, ScrollView, StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'

const { width } = Dimensions.get("window");

const Bannercarosel = () => {
    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                <Image
                    source={{ uri: "https://cdn.freshtohome.com/media/banner/075c8778cfeed0f6.jpg" }}
                    style={styles.img}
                />

                <Image
                    source={{ uri: "https://cdn.freshtohome.com/media/banner/962d26724e8b1f8f.jpg" }}
                    style={styles.img}
                />

                <Image
                    source={{ uri: "https://cdn.freshtohome.com/media/banner/075c8778cfeed0f6.jpg" }}
                    style={styles.img}
                />
            </ScrollView>
        </View>
    )
}

export default Bannercarosel

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 4,
    },
    img: {
        width: width * 0.9,   // 90% of screen width
        height: 180,
        resizeMode: "cover",
        borderRadius: 15,
        marginRight: 16,
    },
})
