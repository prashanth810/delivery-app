import { View, StyleSheet, ScrollView } from 'react-native'
import React, { memo } from 'react'

const ARRAY = Array.from({ length: 6 });

const SkeletonCard = memo(() => (
    <View style={styles.card}>
        {/* Image placeholder */}
        <View style={styles.image} />

        {/* Badge placeholder */}
        <View style={styles.badge}>
            <View style={{ width: 40, height: 8, backgroundColor: '#e9d5ff', borderRadius: 4 }} />
        </View>

        {/* Info */}
        <View style={styles.info}>
            <View style={{ width: '90%', height: 10, backgroundColor: '#e0e0e0', borderRadius: 4, marginBottom: 4 }} />
            <View style={{ width: '60%', height: 10, backgroundColor: '#e0e0e0', borderRadius: 4, marginBottom: 10 }} />

            <View style={styles.priceRow}>
                <View style={{ width: 35, height: 12, backgroundColor: '#e0e0e0', borderRadius: 4 }} />
                <View style={styles.addBtn}>
                    <View style={{ width: 28, height: 8, backgroundColor: '#c6f0e3', borderRadius: 4 }} />
                </View>
            </View>
        </View>
    </View>
));

const ProductCardSkeleton = memo(() => (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
    >
        {ARRAY.map((_, i) => (
            <SkeletonCard key={i} />
        ))}
    </ScrollView>
));

export default ProductCardSkeleton;

const styles = StyleSheet.create({
    listContent: {
        paddingHorizontal: 14,
        gap: 10,
        flexDirection: 'row',
    },
    card: {
        width: 140,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    image: {
        width: '100%',
        height: 100,
        backgroundColor: '#e0e0e0',
    },
    badge: {
        position: 'absolute',
        top: 6,
        left: 6,
        backgroundColor: '#fefaff',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e9d5ff',
    },
    info: {
        padding: 8,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addBtn: {
        borderWidth: 1.5,
        borderColor: '#10B981',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 6,
        backgroundColor: '#fff',
    },
});