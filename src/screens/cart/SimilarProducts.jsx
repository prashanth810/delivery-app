import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQty, decrementQty } from '../../redux/slices/CartSlice'
import { fetchProductsByCategory } from '../../redux/slices/CategorySlice'


const SimilarProducts = ({ items }) => {
    const dispatch = useDispatch()

    // ✅ Get category_id from first cart item
    const categoryId = items?.[0]?.categoryId;

    // ✅ Get products from Redux (same slice CategoryMenu uses)
    const { catpro, catprodloading } = useSelector((state) => state.category.categoryprods)
    const cartItems = useSelector((state) => state.cart.items)

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchProductsByCategory(categoryId))  // ✅ reuse same thunk
        }
    }, [categoryId])

    // ✅ Filter out products already in cart
    const cartIds = new Set(cartItems.map((i) => i._id))
    const similarList = catpro.filter((p) => !cartIds.has(p._id))

    // ✅ Get qty of item in cart
    const getQty = (id) => {
        const found = cartItems.find((i) => i._id === id)
        return found ? found.quantity : 0
    }

    if (!categoryId || similarList.length === 0) return null

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}> Similar Products🛍️ </Text>
            </View>

            {catprodloading ? (
                <ActivityIndicator color="#10B981" style={{ marginVertical: 16 }} />
            ) : (
                <FlatList
                    data={similarList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => {
                        const qty = getQty(item._id)
                        return (
                            <View style={styles.card}>
                                <Image source={{ uri: item.imageurl }} style={styles.image} />

                                {/* ⚡ Badge */}
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>⚡ 15 MIN</Text>
                                </View>

                                <View style={styles.info}>
                                    <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                                    <Text style={styles.desc} numberOfLines={1}>{item.description}</Text>

                                    <View style={styles.priceRow}>
                                        <Text style={styles.price}>₹{item.price}</Text>

                                        {qty === 0 ? (
                                            // ✅ ADD button
                                            <TouchableOpacity
                                                style={styles.addBtn}
                                                onPress={() => dispatch(addToCart(item))}
                                                activeOpacity={0.8}
                                            >
                                                <Text style={styles.addText}>ADD</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            // ✅ +/- controls
                                            <View style={styles.qtyControl}>
                                                <TouchableOpacity
                                                    style={styles.qtyBtn}
                                                    onPress={() => dispatch(decrementQty(item._id))}
                                                >
                                                    <Text style={styles.qtyBtnText}>−</Text>
                                                </TouchableOpacity>
                                                <Text style={styles.qtyNumber}>{qty}</Text>
                                                <TouchableOpacity
                                                    style={styles.qtyBtn}
                                                    onPress={() => dispatch(incrementQty(item._id))}
                                                >
                                                    <Text style={styles.qtyBtnText}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            )}
        </View>
    )
}

export default SimilarProducts

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    listContent: {
        paddingHorizontal: 14,
        gap: 10,
    },

    // ── Card ──
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
        resizeMode: 'cover',
        backgroundColor: '#f5f5f5',
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
    badgeText: {
        fontSize: 9,
        fontWeight: '700',
        color: 'purple',
    },
    info: {
        padding: 8,
    },
    name: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1a1a1a',
        lineHeight: 16,
        marginBottom: 2,
    },
    desc: {
        fontSize: 10,
        color: '#999',
        marginBottom: 6,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 14,
        fontWeight: '800',
        color: '#1a1a1a',
    },

    // ADD button
    addBtn: {
        borderWidth: 1.5,
        borderColor: '#10B981',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 6,
        backgroundColor: '#fff',
    },
    addText: {
        color: '#10B981',
        fontWeight: '700',
        fontSize: 11,
    },

    // qty controls
    qtyControl: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#10B981',
        backgroundColor: '#f0fcf8',
        borderRadius: 6,
    },
    qtyBtn: {
        paddingHorizontal: 7,
        paddingVertical: 2,
    },
    qtyBtnText: {
        color: '#10B981',
        fontSize: 15,
        fontWeight: '700',
    },
    qtyNumber: {
        color: '#10B981',
        fontSize: 12,
        fontWeight: '700',
        minWidth: 18,
        textAlign: 'center',
    },
})