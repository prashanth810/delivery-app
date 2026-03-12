import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native';
// import { handlegetmyorders } from '../../redux/slices/OrderSlice';

const OrderConfirmation = () => {
    const dispatch = useDispatch();
    const routes = useRoute();
    const order = routes?.params?.orderdata;

    console.log(order, 'ooooooooooooj')

    // const { getorderdata, getorderloading, getordererror } = useSelector((state) => state.order.getorders)

    // useEffect(() => {
    //     dispatch(handlegetmyorders());
    // }, [dispatch]);

    // console.log(getorderdata, 'dddddddddddddddd');

    return (
        <View>
            <Text>OrderConfirmation</Text>
        </View>
    )
}

export default OrderConfirmation

const styles = StyleSheet.create({})