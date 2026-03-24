import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux';
import { selectCartCount, selectCartItems, selectCartTotal } from '../redux/slices/CartSlice';

const CartModelfooter = ({ text, onPress }) => {
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const count = useSelector(selectCartCount);


    return (
        <>
            {items.length > 0 && (
                <View style={styles.container}>
                    {/* Bill summary */}
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <Text style={styles.billLabel}> {count} {count === 1 ? "Item" : "Items"} </Text>

                        <Text style={{ borderRightWidth: 1.5, borderColor: "#ffff", }} />

                        <Text style={styles.billValue}>₹{total}</Text>
                    </View>

                    {/* Checkout button */}
                    <TouchableOpacity style={styles.viewcart} activeOpacity={0.75} onPress={onPress} >
                        <Text style={styles.checkoutText}> {text} </Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    )
}

export default CartModelfooter

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 78,
        backgroundColor: "#10B981",
        left: 5,
        right: 5,
        padding: 8,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    billLabel: {
        color: "#fff",
        fontSize: 14,
        fontWeight: 700
    },

    billValue: {
        color: "#fff",
        fontWeight: "bold",
    },

    totalLabel: {
        color: "#fff",
        fontSize: 12
    },

    totalValue: {
        color: "#fff",
        fontWeight: "bold"
    },

    viewcart: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8
    },

    checkoutText: {
        color: "#10B981",
        fontWeight: "bold"
    }
});