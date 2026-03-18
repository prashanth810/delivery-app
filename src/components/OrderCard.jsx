import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

const getStatusStyle = (status) => {
    const key = status?.toLowerCase() || "";

    if (key.includes("delivered") || key.includes("completed")) {
        return styles.delivered;
    }

    if (key.includes("cancel")) {
        return styles.cancel;
    }

    if (key.includes("pending") || key.includes("processing")) {
        return styles.pending;
    }

    if (key.includes("shipped") || key.includes("out")) {
        return styles.shipped;
    }

    return styles.defaultStatus;
};

const OrderCard = ({ item }) => {
    const navigation = useNavigation();

    const statusStyle = getStatusStyle(item.status);
    const itemsCount = useMemo(() => item.items.reduce((acc, it) => acc + (it.quantity || 0), 0), [item.items]);

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <View style={styles.subhead}>
                    <Text style={styles.orderid}>Order #{item._id.slice(0, 10)}</Text>

                    <View style={[styles.statusBadge, statusStyle]}>
                        <Text style={[styles.statusText, statusStyle]}>
                            {item.status}
                        </Text>
                    </View>
                </View>

                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>
                        🗓️ {format(new Date(item.createdAt), 'PPP p')}
                    </Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.metaText}>
                        💳 {item.paymentMethod}
                    </Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.metaText}>
                        🛍️ {itemsCount} item{itemsCount === 1 ? '' : 's'}
                    </Text>
                </View>

                <View style={styles.bgdivider} />

                <View style={styles.itemsmap}>
                    <Text style={styles.itemshead}> Items </Text>
                    {item.items.map((it, id) => {
                        return (
                            <View style={styles.mapitems}>
                                <Text style={styles.quantityprice}> {it.quantity} X <Text> {it.name} </Text> </Text>

                                <Text style={styles.quantityprice}> {it.price.toFixed(2)} </Text>
                            </View>
                        )
                    })}
                </View>

                <View style={styles.totlamain}>
                    <View style={styles.subtotal}>
                        <Text style={styles.totaltxt}> Total </Text>
                        <Text style={styles.totalorderamount}> ₹{item.totalAmount.toFixed(2)} </Text>
                    </View>
                </View>

                <View style={styles.delhead}>
                    <Text style={styles.deladdtxt}>  Delivery Address </Text>
                    <Text style={styles.addresstxt}>
                        {item.address.street}, {item.address.buildingName}, {item.address.flatNo},{item.address.locality},{item.address.pincode}.

                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.trackmain} onPress={() => navigation.navigate("ordertracking", { item })}>
                <Text> 📦 Track Order </Text>
            </TouchableOpacity>
        </View>
    )
}

export default OrderCard

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginHorizontal: 8,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: "#f0eded",
        shadowColor: "#cccc",
    },

    head: {
        padding: 12,
    },

    subhead: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
    },

    statusText: {
        fontSize: 11,
        fontWeight: "500",
    },

    delivered: {
        backgroundColor: "#ECFDF5",
        borderColor: "#A7F3D0",
        color: "#047857",
    },

    cancel: {
        backgroundColor: "#FFF1F2",
        borderColor: "#FECDD3",
        color: "#BE123C",
    },

    pending: {
        backgroundColor: "#FFFBEB",
        borderColor: "#FDE68A",
        color: "#B45309",
    },

    shipped: {
        backgroundColor: "#EFF6FF",
        borderColor: "#BFDBFE",
        color: "#1D4ED8",
    },

    defaultStatus: {
        backgroundColor: "#F4F4F5",
        borderColor: "#E4E4E7",
        color: "#3F3F46",
    },
    // in StyleSheet.create({})
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    orderid: {
        fontSize: 14,
        fontWeight: "bold",
    },
    metaText: {
        fontSize: 11,
        color: "#acb0b5",   // text-zinc-500
    },
    dot: {
        fontSize: 15,
        color: "#D4D4D8",   // text-zinc-300
        marginHorizontal: 6,
    },
    bgdivider: {
        height: 1,
        backgroundColor: "#f5f2f2",
        marginTop: 8,
    },
    itemsmap: {
        paddingHorizontal: 8,
    },
    itemshead: {
        fontSize: 12,
        fontWeight: "semibold",
        color: "#334155",
        marginVertical: 6,
    },
    mapitems: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    quantityprice: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#acb0b5",
    },
    totlamain: {
        paddingVertical: 10,
        paddingHorizontal: 6,
        marginTop: 3,
    },
    subtotal: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    totaltxt: {
        fontSize: 14,
        color: "#334155",
        fontWeight: "semibold",
    },
    totalorderamount: {
        color: "#0F172A",
        fontWeight: "bold",
        fontSize: 15,
    },
    delhead: {
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    deladdtxt: {
        fontSize: 13,
        fontWeight: "500",
        color: "#6a6a6b",
    },
    addresstxt: {
        color: "#9a9b9c",
        fontSize: 12,
        paddingHorizontal: 4,
        paddingTop: 2,
    },
    trackmain: {
        borderTopWidth: 1,
        borderColor: "#f1f1f1",
        paddingVertical: 12,
        paddingHorizontal: 8,
        backgroundColor: "#fcf7fc",
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
    },
})