import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const BottomNavigator = () => {
    const navigation = useNavigation();

    // ✅ FIX: Get the actual current screen name, even if nested
    const currentRoute = useNavigationState(state => {
        // Get the active route in the navigation state
        const route = state.routes[state.index];

        // If this route has nested state (like MainStackNav), get the nested route
        if (route.state) {
            const nestedRoute = route.state.routes[route.state.index];
            return nestedRoute.name;
        }

        return route.name;
    });

    const isActive = (screen) => currentRoute === screen;

    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity onPress={() => navigation.navigate('main', { screen: 'home' })}>
                <Icon
                    name="home-outline"
                    size={28}
                    color={isActive('home') ? "#cccc" : "#000"}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('main', { screen: 'cart' })}>
                <Icon
                    name="cart"
                    size={28}
                    color={isActive('cart') ? "#cccc" : "#000"}
                />
            </TouchableOpacity>

        </View>
    );
};

export default BottomNavigator;

const styles = StyleSheet.create({
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: "#ffff",
        // borderTopLeftRadius: 35,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        // 🔥 IMPORTANT
        elevation: 20,     // Android shadow
        zIndex: 999,       // iOS stacking
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
    },

    // centerBtn: {
    //     width: 50,
    //     height: 50,
    //     borderRadius: 30,
    //     backgroundColor: COLORS.gradientEnd,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
});