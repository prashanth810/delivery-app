import { Dimensions, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const Addaddress = () => {
    const [type, setType] = useState("HOME")
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [flatno, setflatNo] = useState("")
    const [blockname, setblockName] = useState("")
    const [buildingname, setbuildingName] = useState("")
    const [street, setStreet] = useState("")
    const [landmark, setLandmark] = useState("")
    const [pincode, setPincode] = useState("")

    const navigation = useNavigation();
    const width = Dimensions.get("window").height;

    return (
        // ✅ KeyboardAvoidingView wraps everything at the TOP level
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "#fff" }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <ScrollView
                style={{ flex: 1, paddingVertical: 10 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 65 }}
                keyboardShouldPersistTaps="handled" // ✅ tapping outside dismisses keyboard
            >
                <View style={styles.addresslayout}>
                    <View style={{ paddingHorizontal: 13 }}>

                        <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 15, textAlign: "center" }}> New address</Text>

                        <View style={{ flexDirection: "column", gap: width * 0.01 }}>
                            <View>
                                <Text> Name </Text>
                                <TextInput value={name} onChangeText={(e) => setName(e)}
                                    placeholder='Enter full name...' placeholderTextColor={"#cccc"} style={{ color: "#000", borderBottomWidth: 1, borderColor: "#e0e0e0" }} />
                            </View>

                            <View>
                                <Text> Mobile Number </Text>
                                <TextInput value={mobile} onChangeText={(e) => setMobile(e)}
                                    placeholder='mobile number...'
                                    keyboardType='numeric'
                                    placeholderTextColor={"#cccc"} style={{ color: "#000", borderBottomWidth: 1, borderColor: "#e0e0e0" }} />
                            </View>

                            <View >
                                <Text> House / Flat No. </Text>
                                <TextInput value={flatno} onChangeText={(e) => setflatNo(e)}
                                    placeholder='Enter house/flat no...' placeholderTextColor={"#cccc"} style={{ color: "#000", borderBottomWidth: 1, borderColor: "#e0e0e0" }} />
                            </View>

                            <View>
                                <Text> Block Name </Text>
                                <TextInput value={blockname} onChangeText={(e) => setblockName(e)}
                                    placeholder='Enter block name...' placeholderTextColor={"#cccc"} style={{ color: "#000", borderBottomWidth: 1, borderColor: "#e0e0e0" }} />
                            </View>

                            <View>
                                <Text> Building Name </Text>
                                <TextInput value={buildingname} onChangeText={(e) => setbuildingName(e)}
                                    placeholder='Enter building name...' placeholderTextColor={"#cccc"} style={{ color: "#000", borderBottomWidth: 1, borderColor: "#e0e0e0" }} />
                            </View>

                            <View>
                                <Text> Street </Text>
                                <TextInput value={street} onChangeText={(e) => setStreet(e)}
                                    placeholder='Enter street...' placeholderTextColor={"#cccc"} style={{ color: "#000", borderBottomWidth: 1, borderColor: "#e0e0e0" }} />
                            </View>

                            <View>
                                <Text> Landmark </Text>
                                <TextInput value={landmark} onChangeText={(e) => setLandmark(e)}
                                    placeholder='Enter landmark...' placeholderTextColor={"#cccc"} style={{ color: "#000", borderBottomWidth: 1, borderColor: "#e0e0e0" }} />
                            </View>

                            <View>
                                <Text> Pincode </Text>
                                <TextInput value={pincode} onChangeText={(e) => setPincode(e)}
                                    placeholder='Enter pincode...'
                                    keyboardType='numeric'
                                    placeholderTextColor={"#cccc"} style={{ color: "#000", borderBottomWidth: 1, borderColor: "#e0e0e0" }} />
                            </View>

                        </View>

                        <Text style={{ paddingVertical: 10, color: "#828181", fontWeight: "500" }}> SAVE AS </Text>
                        <View style={styles.btntypes}>
                            <Pressable style={[styles.homebtn, type == "HOME" ? styles.homeactive : styles.homeinactive]}
                                onPress={() => setType("HOME")}>
                                <Text style={[type == "HOME" ? { color: "#fff" } : { color: "#000", fontWeight: "500" }]}>
                                    Home
                                </Text>
                            </Pressable>

                            <Pressable style={[styles.homebtn, type == "WORK" ? styles.homeactive : styles.homeinactive]} // value OFFICE
                                onPress={() => setType("WORK")}>
                                <Text style={[type == "WORK" ? { color: "#fff" } : { color: "#000", fontWeight: "500" }]}>
                                    Work
                                </Text>
                            </Pressable>

                            <Pressable style={[styles.homebtn, type == "OTHER" ? styles.homeactive : styles.homeinactive]}
                                onPress={() => setType("OTHER")}>
                                <Text style={[type == "OTHER" ? { color: "#fff" } : { color: "#000", fontWeight: "500" }]}>
                                    Other
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <Pressable style={styles.savebtn}>
                    <Text style={styles.savetxt}> SAVE ADDRESS </Text>
                </Pressable>
            </ScrollView>



        </KeyboardAvoidingView>
    )
}

export default Addaddress

const styles = StyleSheet.create({
    btntypes: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    homebtn: {
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 15,
    },
    homeactive: {
        backgroundColor: "green",
    },
    homeinactive: {
        backgroundColor: "#e8e8e8",
    },
    savebtn: {
        backgroundColor: "green",
        paddingVertical: 15,
        marginTop: 15
    },
    savetxt: {
        color: "#ffff",
        textAlign: "center",
        fontWeight: "bold",
    },
    addresslayout: {
        justifyContent: "space-between",
    },
})