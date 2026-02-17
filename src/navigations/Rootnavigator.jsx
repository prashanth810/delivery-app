import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';


const Stack = createNativeStackNavigator();

const Rootnavigator = () => {
    const isauthenticate = true;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isauthenticate ? (
                <Stack.Screen name="main" component={MainNavigator} />
            ) : (
                <Stack.Screen name='auth' component={AuthNavigator} />
            )}
        </Stack.Navigator>
    )
}

export default Rootnavigator