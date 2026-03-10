import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectCartCount, selectCartItems, selectCartTotal } from '../../redux/slices/CartSlice';

const ProccedCheckout = () => {
    const [modelvisible, setModelvisible] = useState(false);
    const [deliverySlot, setDeliverySlot] = useState("ASAP");
    const [notes, setNotes] = useState("");
    const [payment, setPayment] = useState("ONLINE");
    const [isprocessing, setIsprocessing] = useState(false);

    const navigation = useNavigation();

    const items = useSelector(selectCartItems)
    console.log(items, 'iiiiiiiiiiiiiii')
    const total = useSelector(selectCartTotal)
    const count = useSelector(selectCartCount)
    const loading = useSelector((state) => state.cart.loading);



    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header}> Checkout </Text>
            </View>

            <ScrollView style={styles.scrolcontainer}
                showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

            </ScrollView>
        </View>
    )
}

export default ProccedCheckout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ededed",
    },
    header: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
        paddingVertical: 4
    },
    scrolcontainer: {
        flex: 1,
        paddingHorizontal: 5,
    },
})