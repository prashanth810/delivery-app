import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from '../screens/Homescreen.jsx';
import BottomNavigator from './BottomNavigator.jsx';
import CategoryMenu from '../categories/CategoryMenu.jsx';
import CartScreen from '../screens/cart/Cartscreen.jsx';
import UserProfile from '../screens/userscreen/UserProfile.jsx';
import ProccedCheckout from '../screens/cart/ProccedCheckout.jsx';
import Addaddress from '../screens/address/Addaddress.jsx';
import OrderConfirmation from '../screens/order/OrderConfirmation.jsx';
import MyOrders from '../screens/order/myOrders/MyOrders.jsx';
import Allproducts from '../screens/products/Allproducts.jsx';
import Singleproduct from '../screens/products/Singleproduct.jsx';


const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <View style={Styles.container}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='home' component={Homescreen} />
                <Stack.Screen name='category' component={CategoryMenu} />
                <Stack.Screen name='userprofile' component={UserProfile} />
                <Stack.Screen name='cart' component={CartScreen} />
                <Stack.Screen name='checkout' component={ProccedCheckout} />
                <Stack.Screen name='addnewaddress' component={Addaddress} />
                <Stack.Screen name='OrderConfirmation' component={OrderConfirmation} />

                <Stack.Screen name='orders' component={MyOrders} />

                <Stack.Screen name='allproducts' component={Allproducts} />
                <Stack.Screen name='singleproduct' component={Singleproduct} />


            </Stack.Navigator>

            {/* bottom tab navigator  */}
            <BottomNavigator />
        </View>
    )
}

export default MainNavigator;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})