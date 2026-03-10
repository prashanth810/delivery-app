import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../redux/slices/AuthSlice';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator();

const Rootnavigator = () => {
    const dispatch = useDispatch();
    const { isauthenticate, isCheckingAuth } = useSelector(
        (state) => state.auth.logindata
    );

    // ✅ check token when app opens
    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    // ✅ show loading spinner until check is done (prevents flicker)
    if (isCheckingAuth) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="green" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isauthenticate ? (
                <Stack.Screen name="main" component={MainNavigator} />
            ) : (
                <Stack.Screen name="auth" component={AuthNavigator} />
            )}
        </Stack.Navigator>
    );
};

export default Rootnavigator;