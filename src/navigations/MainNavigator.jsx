import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from '../screens/Homescreen.jsx';
import BottomNavigator from './BottomNavigator.jsx';
import CategoryMenu from '../categories/CategoryMenu.jsx'


const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <View style={Styles.container}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='home' component={Homescreen} />
                <Stack.Screen name='category' component={CategoryMenu} />


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