import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import OrderSkeleton from '../../../components/OrderSkeleton.jsx';
import OrderCard from '../../../components/OrderCard.jsx';
import { handlegetmyorders } from '../../../redux/slices/OrderSlice.js';

const MyOrders = () => {

    const dispatch = useDispatch();
    const { getorderdata, getorderloading } = useSelector((state) => state.order.getorders);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        dispatch(handlegetmyorders());
    }, [dispatch]);


    const onRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await dispatch(handlegetmyorders());
        setIsRefreshing(false);
    }, [dispatch]);

    console.log(getorderdata, 'gggggggggggggggg')

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Orders</Text>
                <Text style={styles.subtitle}>View your recent orders and their status</Text>
            </View>

            {getorderloading && !isRefreshing ? (
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}>
                    {[1, 2, 3, 4, 5].map((_, id) => (
                        <OrderSkeleton key={id} />
                    ))}
                </ScrollView>
            ) : getorderdata && getorderdata.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No orders found, back to shopping!</Text>
                </View>
            ) : (
                <FlatList
                    data={getorderdata}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50, paddingTop: 6 }}
                    renderItem={({ item }) => <OrderCard item={item} />}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    ListFooterComponent={<View style={styles.footer} />}
                />
            )}
        </View>
    );
};

export default MyOrders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0F172A",
    },
    subtitle: {
        fontSize: 13,
        color: "#71717A",
        marginTop: 2,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 14,
        color: "#71717A",
    },
    footer: {
        height: 15,
    },
});