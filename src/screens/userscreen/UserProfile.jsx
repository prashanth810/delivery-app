import { Modal, StyleSheet, Text, TouchableOpacity, View, Animated, Dimensions, Pressable, ScrollView } from 'react-native'
import React, { useState, useRef, useEffect, memo, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, handleprofiledata, logoutuser } from '../../redux/slices/AuthSlice';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

const { height } = Dimensions.get('window');

const PROFILE_ITEMS = [
    { icon: 'gift-outline', title: 'Earn Rewards', subtitle: 'Invite friends and earn rewards' },
    { icon: 'call-outline', title: 'Contact Us', subtitle: 'Help regarding your recent purchase' },
    { divider: true },
    { icon: 'help-circle-outline', title: 'FAQs', subtitle: 'Frequently Asked Questions' },
    { icon: 'document-text-outline', title: 'Terms & Conditions' },
    { icon: 'shield-checkmark-outline', title: 'Privacy Policy' },
    { icon: 'information-circle-outline', title: 'Seller Information' },
    { icon: 'log-in-outline', title: 'Login' },
    { icon: 'earth-outline', title: 'Change Country' },
];

// ── Separate memo component for each menu item ──
const ProfileMenuItem = memo(({ item }) => (
    item?.divider ? (
        <View style={styles.divider} />
    ) : (
        <Pressable style={styles.profilemenu}>
            <View style={styles.iconsbg}>
                <Ionicons name={item.icon} size={18} color="#4b5563" />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.profielheadings}>{item.title}</Text>
                {item?.subtitle && <Text style={styles.subhead}>{item.subtitle}</Text>}
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
        </Pressable>
    )
));

const UserProfile = memo(() => {
    const [logout, setLogout] = useState(false);
    const slideAnim = useRef(new Animated.Value(height)).current;
    const dispatch = useDispatch();

    const { profileuser } = useSelector((state) => state.auth.profile);
    const { isauthenticate } = useSelector((state) => state.auth.logindata);

    useEffect(() => {
        dispatch(handleprofiledata());
        dispatch(checkAuth());
    }, [dispatch]);

    const maskedphone = profileuser?.phone
        ? `${profileuser.phone.slice(0, 3)}xxx ${profileuser.phone.slice(-4)}`
        : "";

    const openModal = useCallback(() => {
        setLogout(true);
        Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 4,
        }).start();
    }, [slideAnim]);

    const closeModal = useCallback((callback) => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setLogout(false);
            slideAnim.setValue(height);
            if (callback) callback();
        });
    }, [slideAnim]);

    const handleLogout = useCallback(async () => {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            console.error('Failed to clear storage:', e);
        }
        closeModal(() => dispatch(logoutuser()));
    }, [closeModal, dispatch]);

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 90 }}>

            {/* ── Title ── */}
            <Text style={styles.title}>Hi, {profileuser?.email || "Hi Guest👋"}</Text>

            {/* ── Auth State ── */}
            {!isauthenticate ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                    <Text>Please</Text>
                    <Pressable><Text style={{ color: 'purple', fontWeight: '600' }}>Login</Text></Pressable>
                    <Text>to enjoy your shopping</Text>
                </View>
            ) : (
                <View style={{ paddingTop: 6 }}>
                    <View style={styles.lable}>
                        <Text style={styles.subemail}>{profileuser?.email}</Text>
                        <Text style={styles.subemail}>{maskedphone}</Text>
                    </View>
                </View>
            )}

            {/* ── Menu Items ── */}
            <View style={{ paddingHorizontal: 3, paddingVertical: 10 }}>
                {PROFILE_ITEMS.map((item, id) => (
                    <ProfileMenuItem key={id} item={item} />
                ))}
            </View>

            {/* ── Logout Button ── */}
            <TouchableOpacity style={styles.logoutbtn} onPress={openModal}>
                <Text style={styles.logouttext}>Logout</Text>
            </TouchableOpacity>

            {/* ── Brand ── */}
            <View style={styles.brandmain}>
                <View style={styles.brandsubmain}>
                    <Ionicons name="leaf-outline" size={25} color="#7c3aed" />
                    <Text style={[styles.brand, { color: "#9333ea" }]}>Fresh </Text>
                    <Text style={[styles.brand, { color: "#16a34a" }]}>to </Text>
                    <Text style={[styles.brand, { color: "#9333ea" }]}>home</Text>
                </View>
            </View>

            {/* ── Logout Modal ── */}
            <Modal
                visible={logout}
                transparent={true}
                animationType="none"
                onRequestClose={() => closeModal()}>
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

        </ScrollView>
    );
});

export default UserProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 18,
        paddingHorizontal: 10,
        backgroundColor: '#FEFEFE',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222',
    },
    lable: {
        flexDirection: "column",
        gap: 4,
        paddingHorizontal: 4,
    },
    subemail: {
        fontSize: 14,
        color: "#606061",
    },
    logoutbtn: {
        borderWidth: 1,
        paddingVertical: 10,
        width: "52%",
        marginHorizontal: "auto",
        borderColor: "#d60404",
        backgroundColor: "#f7f0f0",
        borderRadius: 10,
    },
    logouttext: {
        textAlign: "center",
        fontWeight: '600',
        fontSize: 15,
        color: '#e53935',
    },
    divider: {
        height: 1,
        backgroundColor: "#e6e7e8",
        marginVertical: 5,
        marginHorizontal: 1,
    },
    profilemenu: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        gap: 8,
        marginBottom: 15,
    },
    iconsbg: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: "#f7f8fa",
        alignItems: "center",
        justifyContent: "center",
    },
    profielheadings: {
        color: "#595959",
        fontWeight: "500",
        fontSize: 13,
    },
    subhead: {
        fontSize: 11,
        color: "#666666",
        marginTop: 1,
    },
    brandmain: {
        marginTop: 12,
        alignItems: "center",
    },
    brandsubmain: {
        flexDirection: "row",
        alignItems: "center",
    },
    brand: {
        fontSize: 20,
        fontWeight: "bold",
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
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