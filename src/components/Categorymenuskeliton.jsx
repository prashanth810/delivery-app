import { FlatList, StyleSheet, View, Dimensions } from 'react-native'
import React, { memo } from 'react'

const { width } = Dimensions.get('window');
const card_width = (width / 2) - 18;
const ARRAY = Array.from({ length: 9 });

const SkeletonCard = memo(() => (
    <View style={[styles.card, { width: card_width }]}>

        {/* ── Image Box ── */}
        <View style={styles.imageBox}>
            <View style={styles.imagePlaceholder} />

            <View style={styles.stock}>
                <View style={{ width: 40, height: 10, backgroundColor: '#e0e0e0', borderRadius: 4 }} />
            </View>

            <View style={styles.heart}>
                <View style={{ width: 12, height: 12, backgroundColor: '#e0e0e0', borderRadius: 6 }} />
            </View>
        </View>

        {/* ── Info Box ── */}
        <View style={styles.infoBox}>
            <View style={{ width: '90%', height: 12, backgroundColor: '#e0e0e0', borderRadius: 4, marginBottom: 6 }} />
            <View style={{ width: '60%', height: 12, backgroundColor: '#e0e0e0', borderRadius: 4, marginBottom: 6 }} />
            <View style={{ width: '100%', height: 10, backgroundColor: '#eeeeee', borderRadius: 4, marginBottom: 3 }} />
            <View style={{ width: '75%', height: 10, backgroundColor: '#eeeeee', borderRadius: 4, marginBottom: 8 }} />

            <View style={styles.priceRow}>
                <View style={{ width: 45, height: 14, backgroundColor: '#e0e0e0', borderRadius: 4 }} />
                <View style={styles.addBtn}>
                    <View style={{ width: 30, height: 10, backgroundColor: '#c8ecd4', borderRadius: 4 }} />
                </View>
            </View>
        </View>

        {/* ── Get In Banner ── */}
        <View style={styles.getin}>
            <View style={{ width: 100, height: 10, backgroundColor: '#e8d5f5', borderRadius: 4, alignSelf: 'center' }} />
        </View>

    </View>
));

const Categorymenuskeliton = memo(() => {
    return (
        <FlatList
            data={ARRAY}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
            renderItem={() => <SkeletonCard />}
        />
    );
});

export default Categorymenuskeliton;

const styles = StyleSheet.create({
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
    imagePlaceholder: {
        width: "100%",
        height: "100%",
        backgroundColor: "#e0e0e0",
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
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 4,
    },
    addBtn: {
        backgroundColor: "#f0faf3",
        borderWidth: 1,
        borderColor: "#d4edda",
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    getin: {
        borderTopWidth: 1,
        borderColor: "#faf7f7",
        paddingVertical: 6,
        backgroundColor: "#fefaff",
    },
});