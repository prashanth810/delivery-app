import { Image, StyleSheet, View, Dimensions, Text, Animated } from 'react-native'
import React, { useRef, useState } from 'react';
import { LinearGradient } from 'react-native-linear-gradient'

const { width } = Dimensions.get("window");

const ITEM_WIDTH = width * 0.88;
const ITEM_HEIGHT = width * 0.6;
const SPACING = 10;

const BANNERS = [
    {
        id: '1',
        title: 'Fresh Fish & Seafood',
        subtitle: 'Delivered to your door',
        uri: 'https://cdn.freshtohome.com/media/banner/075c8778cfeed0f6.jpg',
    },
    {
        id: '2',
        title: 'Farm Fresh Chicken',
        subtitle: 'No hormones, no antibiotics',
        uri: 'https://cdn.freshtohome.com/media/banner/962d26724e8b1f8f.jpg',
    },
    {
        id: '3',
        title: 'Daily Fresh Deals',
        subtitle: 'Up to 30% off today',
        uri: 'https://cdn.freshtohome.com/media/banner/075c8778cfeed0f6.jpg',
    },
];


// ==============================
// Single Banner Card
// ==============================
const SliderItem = ({ item }) => {
    return (
        <View style={styles.itemcontainer}>

            {/* Banner Image */}
            <Image source={{ uri: item.uri }} style={styles.img} />

            {/* Dark gradient + text at bottom */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.85)']}
                style={styles.gradient}
            >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
            </LinearGradient>

        </View>
    );
};


// ==============================
// Main Carousel
// ==============================
const Bannercarosel = () => {

    // tracks which dot is active
    const [activeIndex, setActiveIndex] = useState(0);

    // called every time scroll stops on a card
    const onScrollEnd = (e) => {
        const index = Math.round(
            e.nativeEvent.contentOffset.x / (ITEM_WIDTH + SPACING)
        );
        setActiveIndex(index);
    };

    return (
        <View style={styles.wrapper}>

            {/* Banner List */}
            <Animated.FlatList
                horizontal
                pagingEnabled
                data={BANNERS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <SliderItem item={item} />}
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH + SPACING}
                decelerationRate="fast"
                onMomentumScrollEnd={onScrollEnd}
                scrollEventThrottle={10}
            />

            {/* Dots at bottom */}
            <View style={styles.dotsContainer}>
                {BANNERS.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            // only color changes — active = green, inactive = grey
                            { backgroundColor: activeIndex === i ? '#10B981' : '#ccc' }
                        ]}
                    />
                ))}
            </View>

        </View>
    );
};

export default Bannercarosel;


// ==============================
// Styles
// ==============================
const styles = StyleSheet.create({

    wrapper: {
        alignItems: 'center',
        paddingVertical: 10,
    },

    // each card
    itemcontainer: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        marginHorizontal: SPACING / 2,
        borderRadius: 16,
        overflow: 'hidden',
    },

    // banner image fills the card
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    // gradient sits on bottom half of card
    gradient: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '55%',
        justifyContent: 'flex-end',
        padding: 14,
    },

    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.4,
        marginBottom: 4,
    },

    subtitle: {
        color: '#d9d9d9',
        fontSize: 12,
        letterSpacing: 0.3,
    },

    // dots row
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        gap: 6,
    },

    // every dot same size — only color changes
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },

});