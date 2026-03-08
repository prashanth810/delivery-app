import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const Registerpage = () => {
    const [showpass, setShowpass] = useState(false);
    const [formdata, setFormdata] = useState({
        phone: "",
        email: "",
        password: "",
    });

    const navigation = useNavigation();

    const handlelogin = () => {
        navigation.navigate("login");
    }

    const handlechange = (key, value) => {
        setFormdata(prev => ({ ...prev, [key]: value }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.getstarts}> Sign Up </Text>
            <Text style={styles.subtitle}>
                Create a account to pick your fresh food
            </Text>

            <View style={styles.inputWrapper}>
                <Text> Phone Number </Text>
                <View
                    style={styles.inpstyle}>
                    <Feather name="smartphone" size={16} color="#c2c2c2" />
                    <Text style={{ borderRightWidth: 1, borderColor: "#cccc" }} />
                    <TextInput
                        style={{ flex: 1, color: "#000" }}
                        placeholder="Enter phone number"
                        value={formdata.phone}
                        keyboardType='phone-pad'
                        placeholderTextColor={"#9ca3af"}
                        onChangeText={(e) => handlechange("name", e)}
                    />
                </View>


                <Text> Email </Text>
                <View
                    style={styles.inpstyle}>
                    <Feather name="mail" size={16} color="#c2c2c2" />
                    <Text style={{ borderRightWidth: 1, borderColor: "#cccc" }} />
                    <TextInput
                        style={{ flex: 1, color: "#000" }}
                        placeholder="Enter Email"
                        value={formdata.email}
                        keyboardType='email-address'
                        placeholderTextColor={"#9ca3af"}
                        onChangeText={(e) => handlechange("email", e)}
                    />
                </View>

                <Text> Password </Text>
                <View
                    style={styles.inpstyle}>
                    <TouchableOpacity onPress={() => setShowpass(!showpass)}>
                        {showpass ? (
                            <Feather name="eye" size={16} color="#c2c2c2" />
                        ) : (
                            <Feather name="eye-off" size={16} color="#c2c2c2" />
                        )}
                    </TouchableOpacity>
                    <Text style={{ borderRightWidth: 1, borderColor: "#cccc" }} />
                    <TextInput
                        style={{ flex: 1, color: "#000" }}
                        placeholder="Enter password"
                        keyboardType='password'
                        value={formdata.password}
                        secureTextEntry={!showpass}
                        placeholderTextColor={"#9ca3af"}
                        onChangeText={(e) => handlechange("password", e)}
                    />
                </View>
            </View>

            <View style={{ width: "100%" }}>
                <TouchableOpacity style={styles.continue}>
                    <Text style={styles.continuetxt}> Sign Up  </Text>
                </TouchableOpacity>
            </View>

            <View style={{ width: "100%" }}>
                <TouchableOpacity style={styles.dontacc} onPress={handlelogin}>
                    <Text style={styles.dontacctxt}> Alredy have an account? Login  </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Registerpage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },

    getstarts: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 20,
    },

    inputWrapper: {
        width: "100%",
        flexDirection: "column",
        gap: 10
    },

    inpstyle: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#cccc",
        paddingVertical: 3,
        paddingHorizontal: 14,
        borderRadius: 10,
        fontSize: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    continue: {
        borderWidth: 1,
        borderColor: "green",
        width: "100%",
        borderRadius: 30,
        backgroundColor: "#16a34a",
        marginTop: 16
    },
    continuetxt: {
        paddingVertical: 12,
        textAlign: "center",
        color: "#fff",
        fontSize: 15,
    },
    dontacc: {
        marginTop: 14
    },
    dontacctxt: {
        color: "#0b4ad6",
        textAlign: "center"
    },
});