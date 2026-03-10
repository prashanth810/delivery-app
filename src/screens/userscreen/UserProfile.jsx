import { Modal, StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions } from 'react-native'
import React, { useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logoutuser } from '../../redux/slices/AuthSlice';

const { height } = Dimensions.get('window');

const UserProfile = () => {
    const [logout, setLogout] = useState(false);
    const slideAnim = useRef(new Animated.Value(height)).current;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const openModal = () => {
        setLogout(true);
        Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 4,
        }).start();
    };

    const closeModal = (callback) => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setLogout(false);
            slideAnim.setValue(height); // ✅ Reset animation value for next open
            if (callback) callback(); // ✅ Fire callback AFTER animation completes
        });
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear(); // ✅ Await storage clear first
        } catch (e) {
            console.error('Failed to clear storage:', e);
        }

        closeModal(() => {
            dispatch(logoutuser());
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Profile</Text>

            <TouchableOpacity style={styles.logoutbtn} onPress={openModal}>
                <Text style={styles.logouttext}>Logout</Text>
            </TouchableOpacity>

            <Modal
                visible={logout}
                transparent={true}
                animationType="none"
                onRequestClose={closeModal}
            >
                <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => closeModal()} />

                <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
                    <View style={styles.handleBar} />
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarText}>👤</Text>
                    </View>
                    <Text style={styles.sheetTitle}>Logout Account</Text>
                    <Text style={styles.sheetSubtitle}>
                        You will be signed out of your account. You can log back in anytime.
                    </Text>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.confirmBtn} onPress={handleLogout}>
                        <Text style={styles.confirmText}>🚪  Yes, Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelBtn} onPress={() => closeModal()}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Modal>
        </View>
    );
};

export default UserProfile;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#222',
    },
    logoutbtn: {
        borderWidth: 1.5,
        borderColor: '#e53935',
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    logouttext: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
        color: '#e53935',
    },

    // Backdrop
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },

    // Bottom Sheet
    sheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        paddingBottom: 36,
        paddingTop: 12,
        alignItems: 'center',
        elevation: 20,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 16,
    },
    handleBar: {
        width: 42,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#ddd',
        marginBottom: 20,
    },
    avatarCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#fce4e4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 34,
    },
    sheetTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
        marginBottom: 8,
    },
    sheetSubtitle: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        lineHeight: 21,
        marginBottom: 20,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
    },
    confirmBtn: {
        width: '100%',
        backgroundColor: '#e53935',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    confirmText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    cancelBtn: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelText: {
        color: '#555',
        fontSize: 16,
        fontWeight: '600',
    },
});