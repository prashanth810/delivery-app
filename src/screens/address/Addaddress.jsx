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
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { createaddress, fetchaddress } from '../../redux/slices/AddressSlice';

const Addaddress = () => {
    const [type, setType] = useState("HOME");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [flatno, setflatNo] = useState("");
    const [blockname, setblockName] = useState("");
    const [buildingname, setbuildingName] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [pincode, setPincode] = useState("");

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { profileuser } = useSelector((state) => state.auth.profile);
    const { getmyaddress } = useSelector((state) => state.address.getaddress);

    const handleSaveAddress = async () => {
        if (!name || !mobile || !flatno || !pincode) {
            Alert.alert("Error", "Please fill required fields");
            return;
        }

        if (mobile.length !== 10) {
            Alert.alert("Invalid", "Enter valid 10 digit mobile number");
            return;
        }

        const hasAddress = (getmyaddress || []).length > 0;

        const addressData = {
            type,
            name,
            mobile,
            flatNo: flatno,
            blockName: blockname,
            buildingName: buildingname,
            street,
            landmark,
            pincode,
            locality: street,
            isDefault: !hasAddress,
            userId: profileuser?._id,
        };

        try {
            await dispatch(createaddress(addressData)).unwrap();

            // 🔥 refresh address list
            await dispatch(fetchaddress(profileuser?._id));

            Alert.alert("Success", "Address added successfully ✅");

            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", error || "Failed to add address");
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "#fff" }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

            {/* 🔥 FORM */}
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 120 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={{ paddingHorizontal: 13 }}>

                    <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 15, textAlign: "center" }}>
                        New address
                    </Text>

                    <View style={{ gap: 12 }}>
                        <Input label="Name" value={name} setValue={setName} placeholder="Enter full name..." />
                        <Input label="Mobile Number" value={mobile} setValue={setMobile} placeholder="Mobile number..." keyboardType="numeric" />
                        <Input label="House / Flat No." value={flatno} setValue={setflatNo} placeholder="Enter house/flat no..." />
                        <Input label="Block Name" value={blockname} setValue={setblockName} placeholder="Enter block name..." />
                        <Input label="Building Name" value={buildingname} setValue={setbuildingName} placeholder="Enter building name..." />
                        <Input label="Street" value={street} setValue={setStreet} placeholder="Enter street..." />
                        <Input label="Landmark" value={landmark} setValue={setLandmark} placeholder="Enter landmark..." />
                        <Input label="Pincode" value={pincode} setValue={setPincode} placeholder="Enter pincode..." keyboardType="numeric" />
                    </View>

                    <Text style={{ paddingVertical: 10, color: "#828181", fontWeight: "500" }}>
                        SAVE AS
                    </Text>

                    <View style={styles.btntypes}>
                        {["HOME", "WORK", "OTHER"].map((item) => (
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
            </ScrollView>

            {/* 🔥 FIXED BUTTON */}
            <View style={styles.footer}>
                <Pressable style={styles.savebtn} onPress={handleSaveAddress}>
                    <Text style={styles.savetxt}>SAVE ADDRESS</Text>
                </Pressable>
            </View>

        </KeyboardAvoidingView>
    );
};

export default Addaddress;

const Input = ({ label, value, setValue, placeholder, keyboardType }) => (
    <View>
        <Text>{label}</Text>
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor="#cccccc"
            style={{
                color: "#000",
                borderBottomWidth: 1,
                borderColor: "#e0e0e0"
            }}
        />
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

    // 🔥 fixed footer
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#eee"
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
});