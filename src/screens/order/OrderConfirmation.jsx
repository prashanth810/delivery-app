import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import animation from '../../assets/animation.json';

const OrderConfirmation = () => {
    const dispatch = useDispatch();
    const routes = useRoute();
    const order = routes?.params?.orderdata;
    const navigation = useNavigation();

    const statusStyles = {
        Pending: { bg: "#fef08a", text: "#854d0e" },
        Confirmed: { bg: "#dcfce7", text: "#16a34a" },
        Delivered: { bg: "#dbeafe", text: "#1d4ed8" },
        Cancelled: { bg: "#fee2e2", text: "#b91c1c" },
    };

    const currentStatus = statusStyles[order?.status] || statusStyles.Pending;

    return (
        <View style={styles.container}>

            {/* ── Lottie fills the top half as a background ── */}
            <View style={styles.lottieWrapper}>
                <LottieView
                    source={animation}
                    autoPlay
                    loop
                    style={styles.lottie}
                />
            </View>

            {/* ── Content sits on top, centered ── */}
            <View style={styles.content}>

                {/* Check icon */}
                <View style={styles.checkcirclebg}>
                    <Ionicons name="checkmark-circle" size={40} color="#16a34a" />
                </View>

                {/* Title */}
                <Text style={styles.title}>Order Placed!</Text>

                {/* Subtitle */}
                <Text style={styles.subtitle}>
                    Your order #{order?._id} has been placed successfully!
                </Text>

                {/* Order Details Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Order Details</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Total</Text>
                        <Text style={styles.value}>₹{order?.totalAmount?.toFixed(0)}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.label}>Items</Text>
                        <Text style={styles.value}>{order?.items?.length}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.label}>Status</Text>
                        <View style={[styles.statusBadge, { backgroundColor: currentStatus.bg }]}>
                            <Text style={[styles.statusText, { color: currentStatus.text }]}>
                                {order?.status}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.label}>Payment</Text>
                        <Text style={styles.value}>{order?.paymentMethod}</Text>
                    </View>
                </View>

                {/* Buttons */}
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => navigation.navigate("home")}
                >
                    <Text style={styles.primaryBtnText}>Continue Shopping</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => navigation.navigate("orders")}
                >
                    <Text style={styles.secondaryBtnText}>View Orders</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default OrderConfirmation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    // ── Lottie as full-screen background ──
    lottieWrapper: {
        ...StyleSheet.absoluteFillObject, // covers entire screen behind content
        alignItems: "center",
        justifyContent: "flex-start",
        zIndex: 0,
    },
    lottie: {
        width: "100%",
        height: "100%",
    },

    // ── Foreground content ──
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        zIndex: 1,
    },

    checkcirclebg: {
        backgroundColor: "#dcfce7",
        borderRadius: 40,
        padding: 14,
        marginBottom: 16,
    },

    title: {
        fontSize: 24,
        fontWeight: "800",
        color: "#111",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 13,
        textAlign: "center",
        color: "#6b7280",
        paddingHorizontal: 12,
        marginBottom: 24,
        lineHeight: 20,
    },

    // ── Card ──
    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginBottom: 24,
        // Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 1,
    },

    cardTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111",
        marginBottom: 14,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
    },

    divider: {
        height: 1,
        backgroundColor: "#f3f4f6",
    },

    label: {
        fontSize: 14,
        color: "#6b7280",
    },

    value: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111",
    },

    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 20,
    },

    statusText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#16a34a",
    },

    // ── Buttons ──
    primaryBtn: {
        width: "100%",
        backgroundColor: "#16a34a",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 12,
    },

    primaryBtnText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },

    secondaryBtn: {
        width: "100%",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#16a34a",
    },

    secondaryBtnText: {
        color: "#16a34a",
        fontSize: 15,
        fontWeight: "600",
    },
});