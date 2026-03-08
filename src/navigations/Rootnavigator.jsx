// Rootnavigator.js
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator();

const Rootnavigator = () => {
    const [isauthenticate, setIsauthenticate] = useState(true);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isauthenticate ? (
                <Stack.Screen name="main" component={MainNavigator} />
            ) : (
                <Stack.Screen name='auth'>
                    {() => <AuthNavigator onLogin={() => setIsauthenticate(true)} />}
                </Stack.Screen>
            )}
        </Stack.Navigator>
    );
};

export default Rootnavigator;