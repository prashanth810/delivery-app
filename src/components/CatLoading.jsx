import { View, ScrollView, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

const CatLoading = () => {

    const loaders = Array.from({ length: 8 });

    const pulse = useRef(new Animated.Value(0.3)).current

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true
                }),
                Animated.timing(pulse, {
                    toValue: 0.3,
                    duration: 700,
                    useNativeDriver: true
                })
            ])
        ).start()
    }, [])

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {loaders.map((item, i) => (
                    <View key={i} style={styles.main}>
                        <Animated.View style={[styles.loader, { opacity: pulse }]} />
                        <Animated.View style={[styles.nameloader, { paddingTop: 4, opacity: pulse }]} />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default CatLoading

const styles = StyleSheet.create({
    main: {
        marginHorizontal: 12,
        paddingVertical: 7,
        width: 40,
        alignItems: "center",
    },
    loader: {
        width: 50,
        height: 50,
        backgroundColor: "#f4f4f5",
        borderRadius: 50,
        marginTop: 6
    },
    nameloader: {
        width: 33,
        height: 8,
        backgroundColor: "#f4f4f5",
        borderRadius: 50,
        marginTop: 6
    },
})