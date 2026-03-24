import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Allproduts from '../screens/products/Allproducts.jsx'
import Singleproduct from '../screens/products/Singleproduct.jsx';
import Trackorderdetails from '../screens/order/trackOrder/Trackorderdetails.jsx';

const Stack = createNativeStackNavigator();

const Allproductsnavigator = () => {
    return (
        <View style={Styles.container}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='allproducts' component={Allproduts} />
                <Stack.Screen name='singleproduct' component={Singleproduct} />
                <Stack.Screen name='ordertracking' component={Trackorderdetails} />
            </Stack.Navigator>
        </View>
    )
}

export default Allproductsnavigator;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})