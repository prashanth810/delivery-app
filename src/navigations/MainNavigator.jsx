import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from '../screens/Homescreen';
import BottomNavigator from './Bottomtabnavigator';


const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <View style={Styles.container}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='main' component={Homescreen} />


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