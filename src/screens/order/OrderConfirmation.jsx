import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderConfirmation = () => {
    const dispatch = useDispatch();
    const routes = useRoute();
    const order = routes?.params?.orderdata;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.checkcirclebg}>
                <Ionicons name="checkmark-circle" size={35} color={"green"} />
            </View>
            <Text style={{ fontSize: 18, fontWeight: "800", paddingVertical: 6 }}> Order Placed </Text>

            <Text style={{ fontSize: 13, textAlign: "center", color: "#8a8a8a", paddingHorizontal: 8, paddingBottom: 12 }}> Your order #{order._id} has been placed successfully ! </Text>

            <View style={styles.orderdetails}>
                <View style={styles.ordersdata}>
                    <Text style={{ fontSize: 16, fontWeight: "600", paddingTop: 7 }}> Order Details </Text>
                    <Text style={styles.txt}> Total : {order.totalAmount.toFixed(0)} </Text>
                    <Text style={styles.txt}> Items : {order.items.length} </Text>
                    <Text style={styles.txt}> Status : {order.status} </Text>
                    <Text style={styles.txt}> Payment : {order.paymentMethod} </Text>
                </View>
            </View>


            <View>
                <TouchableOpacity style={styles.continueshping} onPress={() => navigation.navigate("home")}>
                    <Text style={styles.continuetxt}> Continue Shopping </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("orders")}>
                    <Text style={styles.vieworders}> View Orders </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OrderConfirmation

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    checkcirclebg: {
        backgroundColor: "#d3f0d9",
        borderRadius: 30,
        padding: 8,
    },
    continueshping: {
        backgroundColor: "green",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 15,
        marginVertical: 10,
    },
    continuetxt: {
        color: "#fff",
    },
    vieworders: {
        textAlign: "center",
        color: "green",
        fontWeight: "500"
    },
    orderdetails: {
        width: "93%",
        borderWidth: 1,
        borderColor: "#f7f7f7",
        borderRadius: 13,
    },
    ordersdata: {
        backgroundColor: "#fafcfa",
        paddingHorizontal: 18,
        paddingBottom: 13,
        width: "100%",
        flexDirection: "colimn",
        gap: 3,
        borderRadius: 13,
    },
    txt: {
        color: "#7d7d7d",
    }
})
