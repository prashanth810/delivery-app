import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { createaddress, fetchaddress, updateaddress } from '../../redux/slices/AddressSlice';
import Feather from 'react-native-vector-icons/Feather';

const Addaddress = () => {

    // ✅ Get edit data if passed from navigation
    const route = useRoute();
    const editAddress = route.params?.editAddress || null;
    const isEditMode = !!editAddress;

    console.log(editAddress, 'eeeeeeeeeeeeeeeeeee')
    const [type, setType] = useState(editAddress?.type || "HOME");
    const [name, setName] = useState(editAddress?.name || "");
    const [mobile, setMobile] = useState(editAddress?.mobile || "");
    const [flatno, setflatNo] = useState(editAddress?.flatNo || "");
    const [buildingname, setbuildingName] = useState(editAddress?.buildingName || "");
    const [street, setStreet] = useState(editAddress?.street || "");
    const [landmark, setLandmark] = useState(editAddress?.landmark || "");
    const [pincode, setPincode] = useState(editAddress?.pincode || "");

    // ── Error State ──
    const [errors, setErrors] = useState({});

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { profileuser } = useSelector((state) => state.auth.profile);
    const { getmyaddress } = useSelector((state) => state.address.getaddress);

    // ── Validate all fields ──
    const validate = () => {
        const newErrors = {};

        if (!name.trim()) newErrors.name = "Name is required";
        if (!mobile.trim()) {
            newErrors.mobile = "Mobile number is required";
        } else if (mobile.length !== 10) {
            newErrors.mobile = "Enter a valid 10 digit mobile number";
        }
        if (!flatno.trim()) newErrors.flatno = "House / Flat No. is required";
        if (!street.trim()) newErrors.street = "Street is required";
        if (!pincode.trim()) {
            newErrors.pincode = "Pincode is required";
        } else if (pincode.length !== 6) {
            newErrors.pincode = "Enter a valid 6 digit pincode";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveAddress = async () => {
        if (!validate()) return;

        const addressData = {
            type,
            name,
            mobile,
            flatNo: flatno,
            buildingName: buildingname,
            street,
            landmark,
            pincode,
            locality: street,
            userId: profileuser?._id,
        };

        try {
            if (isEditMode) {
                // ✅ EDIT MODE — call update
                await dispatch(updateaddress({ id: editAddress._id, data: addressData })).unwrap();
                await dispatch(fetchaddress(profileuser?._id));
                Alert.alert("Success", "Address updated successfully ✅");
            } else {
                // ✅ ADD MODE — call create
                const hasAddress = (getmyaddress || []).length > 0;
                addressData.isDefault = !hasAddress;
                await dispatch(createaddress(addressData)).unwrap();
                await dispatch(fetchaddress(profileuser?._id));
                Alert.alert("Success", "Address added successfully ✅");
            }
            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", error || "Failed to save address");
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "#fff" }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

            <View style={{
                marginBottom: 15, backgroundColor: "#fff", elevation: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12, paddingHorizontal: 10
            }}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} />
                </Pressable>
                {/* ✅ Title changes based on mode */}
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    {isEditMode ? "Edit Address" : "New Address"}
                </Text>
                <Text />
            </View>

            {/* FORM */}
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 60 }}
                keyboardShouldPersistTaps="handled" >
                <View style={{ paddingHorizontal: 13 }}>

                    <View style={{ gap: 20 }}>
                        <Input
                            label="Name *"
                            value={name}
                            setValue={(val) => {
                                setName(val);
                                if (errors.name) setErrors((e) => ({ ...e, name: null }));
                            }}
                            placeholder="Enter full name..."
                            error={errors.name}
                        />
                        <Input
                            label="Mobile Number *"
                            value={mobile}
                            setValue={(val) => {
                                if (val.length <= 10) {
                                    setMobile(val);
                                    if (errors.mobile) setErrors((e) => ({ ...e, mobile: null }));
                                }
                            }}
                            placeholder="Mobile number..."
                            keyboardType="numeric"
                            maxLength={10}
                            error={errors.mobile}
                        />
                        <Input
                            label="House / Flat No. *"
                            value={flatno}
                            setValue={(val) => {
                                setflatNo(val);
                                if (errors.flatno) setErrors((e) => ({ ...e, flatno: null }));
                            }}
                            placeholder="Enter house/flat no..."
                            error={errors.flatno}
                        />
                        <Input
                            label="Building Name"
                            value={buildingname}
                            setValue={setbuildingName}
                            placeholder="Enter building name..."
                        />
                        <Input
                            label="Street *"
                            value={street}
                            setValue={(val) => {
                                setStreet(val);
                                if (errors.street) setErrors((e) => ({ ...e, street: null }));
                            }}
                            placeholder="Enter street..."
                            error={errors.street}
                        />
                        <Input
                            label="Landmark"
                            value={landmark}
                            setValue={setLandmark}
                            placeholder="Enter landmark..."
                        />
                        <Input
                            label="Pincode *"
                            value={pincode}
                            setValue={(val) => {
                                if (val.length <= 6) {
                                    setPincode(val);
                                    if (errors.pincode) setErrors((e) => ({ ...e, pincode: null }));
                                }
                            }}
                            placeholder="Enter pincode..."
                            keyboardType="numeric"
                            maxLength={6}
                            error={errors.pincode}
                        />
                    </View>

                    <Text style={{ paddingVertical: 10, color: "#828181", fontWeight: "500" }}>
                        SAVE AS
                    </Text>

                    <View style={styles.btntypes}>
                        {["HOME", "OFFICE", "OTHER"].map((item) => (
                            <Pressable
                                key={item}
                                style={[styles.homebtn, type === item ? styles.homeactive : styles.homeinactive]}
                                onPress={() => setType(item)}
                            >
                                <Text style={{ color: type === item ? "#fff" : "#000" }}>
                                    {item}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                </View>
                <View style={styles.footer}>
                    <Pressable style={styles.savebtn} onPress={handleSaveAddress}>
                        {/* ✅ Button text changes based on mode */}
                        <Text style={styles.savetxt}>
                            {isEditMode ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>

        </KeyboardAvoidingView>
    );
};

export default Addaddress;

// ── Input Component with error support ──
const Input = ({ label, value, setValue, placeholder, keyboardType, maxLength, error }) => (
    <View>
        <Text style={{ fontSize: 13, color: "#444", marginBottom: 2 }}>{label}</Text>
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            keyboardType={keyboardType}
            maxLength={maxLength}
            placeholderTextColor="#cccccc"
            style={{
                color: "#000",
                borderBottomWidth: 1,
                borderColor: error ? "#e53e3e" : "#e0e0e0",
                paddingVertical: 4,
            }}
        />
        {error ? (
            <Text style={styles.errorText}>⚠ {error}</Text>
        ) : null}
    </View>
);

const styles = StyleSheet.create({
    btntypes: {
        flexDirection: "row",
        gap: 8,
    },
    homebtn: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 15,
    },
    homeactive: {
        backgroundColor: "green",
    },
    homeinactive: {
        backgroundColor: "#e8e8e8",
    },
    footer: {
        marginTop: 30,
        paddingHorizontal: 5,
    },
    savebtn: {
        backgroundColor: "green",
        paddingVertical: 15,
        borderRadius: 10
    },
    savetxt: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
    errorText: {
        color: "#e53e3e",
        fontSize: 11,
        marginTop: 3,
    },
});