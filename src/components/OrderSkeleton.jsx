import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, ScrollView } from "react-native";

const OrderSkeleton = ({ key }) => {

    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.5,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const animatedStyle = { opacity };

    return (
        <View style={styles.container} key={key}>
            <Animated.View style={[styles.card, animatedStyle]}>

                <View style={styles.row}>
                    <View style={styles.boxLarge} />
                    <View style={styles.boxSmall} />
                </View>

                <View style={styles.line40} />
                <View style={styles.line28} />
                <View style={styles.line24} />

                <View style={styles.line48} />
                <View style={styles.line40} />
                <View style={styles.line32} />
                <View style={styles.line64} />

                <View style={styles.divider} />

                <View style={styles.line36} />

            </Animated.View>
        </View>
    );
};

export default OrderSkeleton;

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 16,
        marginVertical: 4,
    },

    card: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#e4e4e7",
        padding: 16,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    boxLarge: {
        height: 16,
        width: 120,
        borderRadius: 6,
        backgroundColor: "#e4e4e7",
    },

    boxSmall: {
        height: 20,
        width: 80,
        borderRadius: 50,
        backgroundColor: "#e4e4e7",
    },

    line40: {
        marginTop: 12,
        height: 12,
        width: 160,
        borderRadius: 6,
        backgroundColor: "#e4e4e7",
    },

    line28: {
        marginTop: 8,
        height: 12,
        width: 110,
        borderRadius: 6,
        backgroundColor: "#e4e4e7",
    },

    line24: {
        marginTop: 8,
        height: 12,
        width: 95,
        borderRadius: 6,
        backgroundColor: "#e4e4e7",
    },

    line48: {
        marginTop: 16,
        height: 12,
        width: 190,
        borderRadius: 6,
        backgroundColor: "#e4e4e7",
    },

    line32: {
        marginTop: 6,
        height: 12,
        width: 130,
        borderRadius: 6,
        backgroundColor: "#e4e4e7",
    },

    line64: {
        marginTop: 16,
        height: 12,
        width: 260,
        borderRadius: 6,
        backgroundColor: "#e4e4e7",
    },

    line36: {
        marginTop: 12,
        height: 16,
        width: 140,
        borderRadius: 6,
        backgroundColor: "#e4e4e7",
    },

    divider: {
        height: 1,
        width: "100%",
        backgroundColor: "#e4e4e7",
        marginTop: 16,
    }

});