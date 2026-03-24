import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const TABS = [
    { name: 'home', icon: 'home' },
    { name: 'userprofile', icon: 'user' },
    { name: 'cart', icon: 'shopping-cart' },
    { name: 'orders', icon: 'box' },
];

const PILL_SIZE = 40;
const TAB_WIDTH = (Dimensions.get('window').width - 40) / TABS.length;
const getOffset = (index) => index * TAB_WIDTH + (TAB_WIDTH / 2) - (PILL_SIZE / 2);

const BottomNavigator = () => {
    const navigation = useNavigation();

    // ✅ Initialize pill at index 0 (home) position
    const pillX = useRef(new Animated.Value(getOffset(0))).current;

    const currentRoute = useNavigationState(state => {
        const route = state.routes[state.index];
        if (route.state) {
            return route.state.routes[route.state.index].name;
        }
        return route.name;
    });

    const activeIndex = TABS.findIndex(t => t.name === currentRoute);

    useEffect(() => {
        Animated.spring(pillX, {
            toValue: getOffset(activeIndex < 0 ? 0 : activeIndex),
            useNativeDriver: true,
            tension: 60,
            friction: 10,
        }).start();
    }, [activeIndex]);

    return (
        <View style={styles.bottomNav}>

            {/* Sliding circle pill */}
            <Animated.View
                style={[styles.pill, { transform: [{ translateX: pillX }] }]}
            />

            {TABS.map((tab, i) => {
                // ✅ Treat index 0 as active when no route matches (initial load)
                const isActive = activeIndex < 0 ? i === 0 : activeIndex === i;
                return (
                    <TouchableOpacity
                        key={tab.name}
                        style={styles.tabBtn}
                        onPress={() => navigation.navigate('main', { screen: tab.name })}
                    >
                        <Feather
                            name={tab.icon}
                            size={20}
                            color={isActive ? '#fff' : '#888'}
                        />
                    </TouchableOpacity>
                );
            })}

        </View>
    );
};

export default BottomNavigator;

const styles = StyleSheet.create({
    bottomNav: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        borderRadius: 40,
        height: 54,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 20,
        zIndex: 999,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        overflow: 'hidden',
    },
    pill: {
        position: 'absolute',
        width: PILL_SIZE,
        height: PILL_SIZE,
        borderRadius: PILL_SIZE / 2,
        backgroundColor: '#10B981',
    },
    tabBtn: {
        flex: 1,
        height: 54,
        alignItems: 'center',
        justifyContent: 'center',
    },
});