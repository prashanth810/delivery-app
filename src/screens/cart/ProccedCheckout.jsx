import { Alert, Dimensions, FlatList, Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DarkTheme, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, selectCartCount, selectCartItems, selectCartTotal } from '../../redux/slices/CartSlice';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Address from '../address/Address.jsx';
import { fetchaddress } from '../../redux/slices/AddressSlice.js';
import { handleprofiledata } from '../../redux/slices/AuthSlice.js';
import { handleCreateOrder, handlecreateRazorpayOrder } from '../../redux/slices/OrderSlice.js';
import RazorpayCheckout from 'react-native-razorpay';

const ProccedCheckout = () => {
    const [modelvisible, setModelvisible] = useState(false);
    const [deliverySlot, setDeliverySlot] = useState("ASAP");
    const [notes, setNotes] = useState("");
    const [query, setQuery] = useState("");
    const [payment, setPayment] = useState("ONLINE");
    const [isprocessing, setIsprocessing] = useState(false);
    const [selectedaddressId, setSelectedaddressId] = useState(null);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { profileuser, profileloading, profileerror,
    } = useSelector((state) => state.auth.profile);

    useEffect(() => {
        dispatch(handleprofiledata());
    }, [dispatch]);


    const cardheight = Dimensions.get("window").height;

    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const count = useSelector(selectCartCount);
    const clearcart = useSelector(clearCart);
    const loading = useSelector((state) => state.cart.loading);

    const { getalladdress, getaddressloading, getaddresserror
    } = useSelector((state) => state.address.getaddress);

    useEffect(() => {
        dispatch(fetchaddress());
    }, [dispatch]);

    const slotoptions = ["ASAP", "Today 6-8PM", "Tommorow 9-11 AM", "Tommorow 6-8 PM"];

    const carttotalitems = items?.reduce((sum, item) => sum + item.quantity, 0);
    const carttotalprice = items?.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0);

    // ✅ Fix: .find() to get default address from array (was .isDefault which is wrong)
    const defaultaddress = getalladdress?.find((item) => item.isDefault === true);

    const handlePayment = async () => {
        console.log("payments started")
        if (!defaultaddress) {
            Alert.alert("No address found", "Please set a default address before placing order.");
            return;
        }
        if (items.length === 0) {
            Alert.alert("Cart is empty");
            return;
        }

        setIsprocessing(true);
        try {
            if (payment == "COD") {
                const orderdata = {
                    items: items.map((item) => ({
                        productId: item._id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                    })),
                    totalAmount: carttotalprice,
                    address: {
                        name: defaultaddress.name,
                        mobile: defaultaddress.mobile,
                        flatNo: defaultaddress.flatNo,
                        buildingName: defaultaddress.buildingName,
                        street: defaultaddress.street,
                        landmark: defaultaddress.landmark,
                        locality: defaultaddress.locality,
                        pincode: defaultaddress.pincode,
                        type: defaultaddress.type,
                    },
                    paymentMethod: "COD",
                };

                console.log("COD orderdata ✅", orderdata);

                // ✅ FIXED: was commented out — now actually dispatching
                const result = await dispatch(handleCreateOrder(orderdata)).unwrap();
                console.log("COD order saved ✅", result);

                dispatch(clearCart());
                navigation.navigate("OrderConfirmation", { orderdata: result.order });

            } else {
                // ✅ Step 1: Create Razorpay order from backend
                const orderData = {
                    amount: carttotalprice,
                    currency: "INR",
                    receipt: `receipt_${Date.now()}`,
                };

                // ✅ Step 2: unwrap() to get actual data from thunk
                const razorpayOrder = await dispatch(handlecreateRazorpayOrder(orderData)).unwrap();
                console.log("razorpayOrder ✅", razorpayOrder);

                const cleanedContact = profileuser?.phone?.replace(/\D/g, "").slice(-10);

                // ✅ Step 3: Razorpay options
                const options = {
                    description: "FreshToHome Order",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Blank_Black.svg/200px-Blank_Black.svg.png",
                    currency: razorpayOrder.currency,
                    key: "rzp_test_SQEc80b35A7O2k",
                    amount: razorpayOrder.amount.toString(),
                    name: "FreshToHome",
                    order_id: razorpayOrder.razorpayOrderId,
                    prefill: {
                        email: profileuser?.email || "test@example.com",
                        contact: cleanedContact,
                        name: profileuser?.name || "Test User",
                    },
                    theme: { color: "#16a34a" },
                    retry: { enabled: true, max_count: 3 },
                };

                // ✅ Step 4: Open Razorpay checkout
                const data = await RazorpayCheckout.open(options).catch((error) => {
                    console.log(error, "razorpay open error");
                    Alert.alert("Payment Failed", "Razorpay could not open");
                });

                // ✅ Step 5: Payment success → save full order to DB
                if (data?.razorpay_payment_id) {
                    const fullOrderData = {
                        items: items.map((item) => ({
                            productId: item._id,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                        })),
                        totalAmount: carttotalprice,
                        address: {
                            name: defaultaddress.name,
                            mobile: defaultaddress.mobile,
                            flatNo: defaultaddress.flatNo,
                            buildingName: defaultaddress.buildingName,
                            street: defaultaddress.street,
                            landmark: defaultaddress.landmark,
                            locality: defaultaddress.locality,
                            pincode: defaultaddress.pincode,
                            type: defaultaddress.type,
                        },
                        paymentMethod: "ONLINE",
                        paymentId: data.razorpay_payment_id,
                        razorpayOrderId: razorpayOrder.razorpayOrderId,
                    };

                    console.log("ONLINE fullOrderData ✅", fullOrderData);

                    // ✅ FIXED: added await + unwrap() — was missing before
                    const result = await dispatch(handleCreateOrder(fullOrderData)).unwrap();
                    console.log("ONLINE order saved ✅", result);

                    dispatch(clearCart());
                    navigation.navigate("OrderConfirmation", { orderdata: result.order });
                }
            }
        }
        catch (error) {
            console.error("payment error", error);
            Alert.alert("Failed to process order", error?.message || "Something went wrong");
        }
        finally {
            setIsprocessing(false);
        }
    }

    const Slots = ({ label, selected, onPress }) => {
        return (
            <Pressable
                onPress={onPress}
                style={[styles.slotBtn, selected && styles.slotBtnSelected]}>
                <Text style={[styles.slotText, selected && styles.slotTextSelected]}>
                    {label}
                </Text>
            </Pressable>
        )
    }

    const ListHeader = () => (
        <>
            {/* Address */}
            <View style={styles.section}>
                <Address setModelvisible={setModelvisible} getalladdress={getalladdress} getaddressloading={getaddressloading} getaddresserror={getaddresserror} />
            </View>

            {/* Delivery Slot */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Delivery Slot</Text>
                <View style={styles.scrollslots}>
                    <Text style={styles.sectionSubtitle}>Choose when you'd like your orders</Text>
                    <FlatList
                        data={slotoptions}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Slots
                                label={item}
                                selected={deliverySlot === item}
                                onPress={() => setDeliverySlot(item)}
                            />
                        )}
                        style={{ marginBottom: 4 }}
                    />
                    <Text style={styles.sectionSubtitle}>Add note for delivery (optional)</Text>
                    <TextInput
                        value={notes}
                        onChangeText={setNotes}
                        placeholder='Leave at door / call on arrival...'
                        placeholderTextColor={"#ccc"}
                        style={styles.noteinp}
                    />
                </View>
            </View>

            {/* Payment Methods */}
            <View style={styles.payments}>
                <Text style={styles.sectionTitle}>Payment Methods</Text>
                <View style={styles.paymentoptions}>
                    <TouchableOpacity style={styles.onlinepay} onPress={() => setPayment("ONLINE")}>
                        <View style={[styles.dot, payment === "ONLINE" && styles.dotactive]} />
                        <Text style={styles.paytext}>Pay Online (Razorpay)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.onlinepay} onPress={() => setPayment("COD")}>
                        <View style={[styles.dot, payment === "COD" && styles.dotactive]} />
                        <Text style={styles.paytext}>Cash On Delivery</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Order Summary Title */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Order Summary</Text>
            </View>
        </>
    );

    const Addressrow = ({ item, isSelected }) => {
        console.log(item, 'ppppppp');
        return (
            <Pressable style={styles.addrow} >
                <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 10 }}>
                    <View style={styles.addresspopmain}>
                        <Ionicons name="home-outline" size={18} color="#16a34a" />
                    </View>

                    <View style={{ flex: 1, }}>
                        <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, fontWeight: "500" }}> {item.type} </Text>
                            {item.isDefault ? (
                                <View style={[styles.selected, isSelected ? styles.selectedbg : styles.unselectedbg]} />
                            ) : ("")}
                        </View>
                        <Text style={{ fontSize: 13, fontWeight: "500", color: "#6b7280" }}> {item?.name} </Text>
                        <Text style={{ fontSize: 13, color: "#6b7280" }}> {item?.flatNo} </Text>
                        <Text style={{ fontSize: 13, color: "#6b7280" }}> {item?.landmark}, {item?.locality}- {item?.pincode} </Text>

                        {/* button for edit , delete */}
                        <View style={styles.btns}>
                            <Pressable>
                                <Text style={styles.actionbtns}> Edit </Text>
                            </Pressable>

                            <Pressable>
                                <Text style={styles.actionbtns}> Delete </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>


            </Pressable>
        )
    }

    const ListFooter = () => (
        <View style={{ paddingHorizontal: 10, marginTop: 4 }}>
            <View style={styles.orderdetails}>
                <View style={[styles.subtotal, { paddingTop: 4 }]}>
                    <Text style={styles.orderdetailsub}>Sub Total</Text>
                    <Text style={styles.orderdetailsub}>₹{carttotalprice.toFixed(0)}</Text>
                </View>
                <View style={styles.subtotal}>
                    <Text style={styles.orderdetailsub}>Delivery Fee</Text>
                    <Text style={styles.orderdetailsub}>Free</Text>
                </View>
                <View style={[styles.subtotal, { borderTopWidth: 1, borderColor: "#f5f2f2", paddingTop: 8 }]}>
                    <Text style={styles.orderdettotal}>Total</Text>
                    <Text style={styles.orderdettotalammount}>₹{carttotalprice.toFixed(0)}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Checkout</Text>

            {/* ✅ Single FlatList - no nested ScrollView */}
            <FlatList
                data={items}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListHeaderComponent={<ListHeader />}
                ListEmptyComponent={
                    <View style={styles.section}>
                        <Text style={{ color: '#999', textAlign: 'center' }}>No items in your cart</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={styles.bgcolor}>
                        <View style={styles.orderItem}>
                            <Image source={{ uri: item?.imageurl }} style={styles.orderimages} />
                            <View style={{ flex: 1, paddingLeft: 10 }}>
                                <Text style={styles.itemName} numberOfLines={2}>{item?.name}</Text>
                                <Text style={styles.itemQty}>Qty: {item?.quantity} x ₹{item.price}</Text>
                            </View>
                            <Text style={styles.itemPrice}>₹{item.quantity * item?.price}</Text>
                        </View>
                    </View>
                )}
                ListFooterComponent={<ListFooter />}
            />

            {/* ✅ Continue button outside FlatList - always at bottom */}
            <View style={styles.continueWrapper}>
                <TouchableOpacity
                    style={styles.continueBtn}
                    onPress={handlePayment}
                    disabled={isprocessing}>
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "500", color: "#fff", paddingBottom: 4, }}> Procced to Payment  </Text>
                        <Text style={styles.continueleft}>
                            {carttotalitems} item{carttotalitems !== 1 ? "s" : ""}
                            {"  •  "}
                            ₹{carttotalprice.toFixed(0)}
                        </Text>
                    </View>
                    <Text style={styles.continueright}>
                        {isprocessing ? "Processing..." : "Continue"}
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal visible={modelvisible} animationType="slide" transparent >

                <View style={styles.mainmodel}>
                    <View style={styles.submainmodel}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5, }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}> Select Address </Text>
                            <Pressable onPress={() => setModelvisible(false)}>
                                <Ionicons name="close" size={20} color={"#000"} />
                            </Pressable>
                        </View>

                        <View style={styles.inprow}>
                            <Ionicons name="search" size={18} color={"#9ca3af"} />
                            <TextInput
                                value={query}
                                onChange={setQuery}
                                placeholder='Search Address'
                                placeholderTextColor={"#ccc"}
                                style={styles.inpstyle}
                            />
                        </View>

                        <View>
                            <FlatList
                                data={getalladdress?.filter(a => a.type.toLowerCase().includes(query.toLowerCase()) || a.locality.toLowerCase().includes(query.toLowerCase()))}
                                contentContainerStyle={{ paddingBottom: 90 }}
                                renderItem={({ item }) => {
                                    return (
                                        <Addressrow
                                            item={item}
                                            isSelected={selectedaddressId == item?.id}
                                            onRemove={(id) => removeAddress(id)}
                                        // onSelect={(id) => {
                                        //     selectaddress(id)
                                        // }}
                                        />
                                    )
                                }}
                            />

                            <Pressable style={styles.addnewaddress} onPress={() => { setModelvisible(false); navigation.navigate("addnewaddress") }}>
                                <Text style={styles.addbtntext}> + ADD NEW ADDRESS </Text>
                            </Pressable>

                            <Pressable style={styles.dontbtn} onPress={() => setModelvisible(false)}>
                                <Text style={styles.donetxt}> DONE </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default ProccedCheckout

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#ededed" },
    header: { textAlign: "center", fontSize: 18, fontWeight: "700", paddingVertical: 4 },
    section: { paddingHorizontal: 12, marginBottom: 4 },
    sectionTitle: { fontSize: 14, fontWeight: '600', color: '#111', marginBottom: 6 },
    sectionSubtitle: { fontSize: 13, color: '#6b7280', marginVertical: 8 },

    // Slots
    slotBtn: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', marginRight: 5 },
    slotBtnSelected: { backgroundColor: '#0B983E', borderColor: '#0B983E' },
    slotText: { fontSize: 12, color: '#333', fontWeight: "600" },
    slotTextSelected: { color: '#fff', fontWeight: '600' },
    scrollslots: { backgroundColor: "white", borderWidth: 1, borderColor: "#f7f5f5", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 15, elevation: 10, shadowColor: "#ccc", shadowOpacity: 0.8 },
    noteinp: { borderWidth: 1, borderColor: "#f7f7f7", backgroundColor: "#fafafa", paddingHorizontal: 8, borderRadius: 8, fontSize: 14, color: "#000" },

    // Payment
    payments: { paddingHorizontal: 10, marginBottom: 4 },
    paymentoptions: { backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, flexDirection: "column", gap: 8 },
    dot: { width: 16, height: 16, backgroundColor: "transparent", borderWidth: 1.5, borderColor: "#ccc", borderRadius: 20 },
    dotactive: { backgroundColor: "green", borderColor: "green" },
    onlinepay: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 4 },
    paytext: { fontSize: 14, color: "#111" },

    // Order items
    orderItem: { flexDirection: 'row', alignItems: 'center' },
    bgcolor: { backgroundColor: '#fff', marginHorizontal: 12, marginBottom: 8, borderRadius: 10, padding: 10, elevation: 2 },
    orderimages: { width: 60, height: 60, borderRadius: 8, resizeMode: 'cover' },
    itemName: { fontSize: 13, fontWeight: '600', color: '#111' },
    itemQty: { fontSize: 12, color: '#6b7280', marginTop: 2 },
    itemPrice: { fontSize: 13, fontWeight: '700', color: '#0B983E' },

    // Order details / totals
    orderdetails: { flexDirection: "column", gap: 10, borderTopWidth: 1, borderColor: "#f5f2f2", paddingTop: 5, backgroundColor: "#fff", padding: 14, borderRadius: 10 },
    subtotal: { flexDirection: 'row', alignItems: "center", justifyContent: "space-between" },
    orderdetailsub: { color: "#7d7c7c", fontSize: 14 },
    orderdettotal: { color: "#292828", fontWeight: "600" },
    orderdettotalammount: { color: "#292828", fontWeight: "700", fontSize: 16 },

    // ✅ Continue button - outside FlatList, always at bottom
    continueWrapper: {
        paddingHorizontal: 8,
        paddingVertical: 10,
        marginBottom: 50,
    },
    continueBtn: {
        backgroundColor: '#0B983E',
        borderRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    continueleft: { color: '#fff', fontSize: 14, fontWeight: '600', paddingHorizontal: 2 },
    continueright: { backgroundColor: "#ffff", fontSize: 15, fontWeight: '600', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
    mainmodel: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "flex-end",
    },
    submainmodel: {
        backgroundColor: "#ffff",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        height: "65%",
        padding: 15
    },
    inprow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: "#f3f4f6",
        paddingHorizontal: 7,
        borderRadius: 8,
        marginVertical: 6,
    },
    inpstyle: {
        flex: 1,
        fontSize: 14,
        color: "#000"
    },
    addresspopmain: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#f0fdf4",
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 10,
    },
    selected: {
        width: 13,
        height: 13,
        borderRadius: 30,
    },
    selectedbg: {
        backgroundColor: "green",
    },
    unselectedbg: {
        backgroundColor: "transparent",
    },
    addrow: {
        borderWidth: 1,
        borderColor: "#f3f3f3",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 5,
        marginBottom: 4,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4,
    },
    actionbtns: {
        color: "#9333ea",
        fontWeight: "semibold",
    },
    btns: {
        flexDirection: "row",
        marginTop: 4,
    },
    addnewaddress: {
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#9333ea",
        paddingVertical: 10,
        borderRadius: 10,
    },
    addbtntext: {
        textAlign: 'center',
        color: "#9333ea",
    },
    dontbtn: {
        backgroundColor: "green",
        paddingVertical: 10,
        marginTop: 15,
        borderRadius: 10,
    },
    donetxt: {
        textAlign: "center",
        color: "#ffff",
        fontSize: 16,
        fontWeight: "500",
    },
})