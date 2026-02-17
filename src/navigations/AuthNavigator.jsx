import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loginpage from '../components/Loginpage';



const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='login' component={Loginpage} />
            {/* <Stack.Screen name='signup' component={Registerpage} /> */}
        </Stack.Navigator>
    )
}

export default AuthNavigator;