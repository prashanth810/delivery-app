import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const STEPS = [
    {
        key: "Pending",
        label: "Order Placed",
        desc: "Your order has been received",
        icon: "clipboard-text-outline",
    },
    {
        key: "Processing",
        label: "Processing",
        desc: "We're preparing your items",
        icon: "package-variant",
    },
    {
        key: "Shipped",
        label: "Shipped",
        desc: "Your order is on the way",
        icon: "truck-delivery-outline",
    },
    {
        key: "Delivered",
        label: "Delivered",
        desc: "Order delivered successfully",
        icon: "check-circle-outline",
    },
];

const getStepIndex = (status) => {
    if (status === "Cancelled") return -1;
    return STEPS.findIndex((s) => s.key === status);
};

const Trackorderdetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params; // ← pass full order object

    const currentIndex = getStepIndex(item?.status);
    const isCancelled = item?.status === "Cancelled";

    const formattedDate = item?.createdAt
        ? new Date(item.createdAt).toLocaleString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true,
        })
        : '—';

    const address = item?.address || {};
    const fullAddress = [
        address.flatNo,
        address.buildingName,
        address.street,
        address.landmark,
        address.locality,
        address.pincode,
    ].filter(Boolean).join(', ');

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Feather name="arrow-left" size={22} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Track Order</Text>
                <View style={{ width: 30 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 65 }}>

                {/* Order Info */}
                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Order ID</Text>
                        <Text style={styles.infoValue}>#{item?._id}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Placed on</Text>
                        <Text style={styles.infoValue}>{formattedDate}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Total</Text>
                        <Text style={[styles.infoValue, { color: "#16a34a", fontWeight: "700" }]}>
                            ₹{item?.totalAmount?.toLocaleString()}
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Payment</Text>
                        <Text style={styles.infoValue}>{item?.paymentMethod}</Text>
                    </View>
                </View>

                {/* Cancelled banner */}
                {isCancelled ? (
                    <View style={styles.cancelledBanner}>
                        <MaterialCommunityIcons name="close-circle-outline" size={22} color="#dc2626" />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.cancelledTitle}>Order Cancelled</Text>
                            <Text style={styles.cancelledDesc}>This order has been cancelled.</Text>
                        </View>
                    </View>
                ) : (
                    /* ── Tracking Steps ── */
                    <View style={styles.trackingCard}>
                        <Text style={styles.trackingTitle}>Order Status</Text>

                        {STEPS.map((step, index) => {
                            const isCompleted = index <= currentIndex;
                            const isActive = index === currentIndex;
                            const isLast = index === STEPS.length - 1;

                            return (
                                <View key={step.key} style={styles.stepRow}>

                                    {/* Left: icon + line */}
                                    <View style={styles.stepLeft}>
                                        <View style={[
                                            styles.iconCircle,
                                            isCompleted && styles.iconCircleCompleted,
                                            isActive && styles.iconCircleActive,
                                        ]}>
                                            <MaterialCommunityIcons
                                                name={step.icon}
                                                size={18}
                                                color={isCompleted ? "#fff" : "#d1d5db"}
                                            />
                                        </View>
                                        {/* Connector line */}
                                        {!isLast && (
                                            <View style={[
                                                styles.connectorLine,
                                                index < currentIndex && styles.connectorLineCompleted,
                                            ]} />
                                        )}
                                    </View>

                                    {/* Right: text */}
                                    <View style={styles.stepContent}>
                                        <Text style={[
                                            styles.stepLabel,
                                            isCompleted && styles.stepLabelCompleted,
                                            isActive && styles.stepLabelActive,
                                        ]}>
                                            {step.label}
                                        </Text>
                                        <Text style={styles.stepDesc}>{step.desc}</Text>

                                        {/* Active pulse badge */}
                                        {isActive && (
                                            <View style={styles.activeBadge}>
                                                <Text style={styles.activeBadgeText}>In Progress</Text>
                                            </View>
                                        )}
                                    </View>

                                </View>
                            );
                        })}
                    </View>
                )}

                {/* Delivery Address */}
                {fullAddress ? (
                    <View style={styles.addressCard}>
                        <View style={styles.addressHeader}>
                            <MaterialCommunityIcons name="map-marker-outline" size={18} color="#16a34a" />
                            <Text style={styles.addressTitle}>Delivery Address</Text>
                        </View>
                        <Text style={styles.addressText}>{address.name}</Text>
                        <Text style={styles.addressSub}>{fullAddress}</Text>
                        {address.mobile ? (
                            <Text style={styles.addressSub}>📞 {address.mobile}</Text>
                        ) : null}
                    </View>
                ) : null}

            </ScrollView>
        </View>
    );
};

export default Trackorderdetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
        elevation: 2,
    },
    backBtn: { padding: 4 },
    headerTitle: { fontSize: 17, fontWeight: "700", color: "#111" },

    // Info card
    infoCard: {
        backgroundColor: "#fff",
        margin: 12,
        borderRadius: 14,
        padding: 16,
        elevation: 1,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 4,
    },
    infoLabel: { fontSize: 13, color: "#3b3a3a", fontWeight: "600" },
    infoValue: { fontSize: 13, color: "#878686", fontWeight: "500" },
    divider: { height: 1, backgroundColor: "#f3f4f6", marginVertical: 6 },

    // Cancelled
    cancelledBanner: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fef2f2",
        borderWidth: 1,
        borderColor: "#fecaca",
        marginHorizontal: 12,
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
    },
    cancelledTitle: { fontSize: 15, fontWeight: "700", color: "#dc2626" },
    cancelledDesc: { fontSize: 13, color: "#ef4444", marginTop: 2 },

    // Tracking card
    trackingCard: {
        backgroundColor: "#fff",
        marginHorizontal: 12,
        borderRadius: 14,
        padding: 16,
        elevation: 1,
        marginBottom: 12,
    },
    trackingTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111",
        marginBottom: 20,
    },

    // Step row
    stepRow: {
        flexDirection: "row",
        minHeight: 64,
    },
    stepLeft: {
        alignItems: "center",
        width: 44,
    },
    iconCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#f3f4f6",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#e5e7eb",
    },
    iconCircleCompleted: {
        backgroundColor: "#16a34a",
        borderColor: "#16a34a",
    },
    iconCircleActive: {
        backgroundColor: "#16a34a",
        borderColor: "#bbf7d0",
        borderWidth: 3,
    },
    connectorLine: {
        width: 2,
        flex: 1,
        backgroundColor: "#e5e7eb",
        marginVertical: 3,
    },
    connectorLineCompleted: {
        backgroundColor: "#16a34a",
    },

    // Step content
    stepContent: {
        flex: 1,
        paddingLeft: 12,
        paddingBottom: 16,
    },
    stepLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#9ca3af",
        marginTop: 8,
    },
    stepLabelCompleted: {
        color: "#111",
    },
    stepLabelActive: {
        color: "#16a34a",
        fontWeight: "700",
    },
    stepDesc: {
        fontSize: 12,
        color: "#9ca3af",
        marginTop: 2,
    },
    activeBadge: {
        marginTop: 6,
        alignSelf: "flex-start",
        backgroundColor: "#dcfce7",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    activeBadgeText: {
        fontSize: 11,
        color: "#16a34a",
        fontWeight: "600",
    },

    // Address card
    addressCard: {
        backgroundColor: "#fff",
        marginHorizontal: 12,
        borderRadius: 14,
        padding: 16,
        elevation: 1,
    },
    addressHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 8,
    },
    addressTitle: { fontSize: 14, fontWeight: "700", color: "#111" },
    addressText: { fontSize: 14, fontWeight: "600", color: "#374151" },
    addressSub: { fontSize: 13, color: "#6b7280", marginTop: 3, lineHeight: 18 },
});