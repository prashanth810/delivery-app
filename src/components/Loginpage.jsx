import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Loginpage = () => {
    const [showpass, setShowpass] = useState(false);
    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
    });

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handlesignup = () => {
        navigation.navigate("signup");
    }

    const handlechange = (key, value) => {
        setFormdata(prev => ({ ...prev, [key]: value }));
    };

    const handlesubmit = async () => {
        console.log("login started")
        try {
            const res = await dispatch(login(formdata)).unwrap();
            console.log(res.token, 'login success');
            await AsyncStorage.setItem("token", res.token);
            Alert.alert("Login Success");
            navigation.navigate('main', { screen: 'home' });
        } catch (error) {
            console.log(error, 'login failed');
            Alert.alert("Login Failed", error || "Something went wrong");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.getstarts}>Get Started</Text>
            <Text style={styles.subtitle}>
                Enter Your details to pick your fresh food
            </Text>

            <View style={styles.inputWrapper}>
                <Text> Email </Text>
                <View
                    style={styles.inpstyle}>
                    <Feather name="mail" size={16} color="#c2c2c2" />
                    <Text style={{ borderRightWidth: 1, borderColor: "#cccc" }} />
                    <TextInput
                        style={{ flex: 1, color: "#000" }}
                        placeholder="Enter Email"
                        value={formdata.email}
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
                        value={formdata.password}
                        secureTextEntry={!showpass}
                        placeholderTextColor={"#9ca3af"}
                        onChangeText={(e) => handlechange("password", e)}
                    />
                </View>
            </View>

            <View style={{ width: "100%" }}>
                <TouchableOpacity style={styles.continue} onPress={handlesubmit}>
                    <Text style={styles.continuetxt}> CONTINUE  </Text>
                </TouchableOpacity>
            </View>

            <View style={{ width: "100%" }}>
                <TouchableOpacity style={styles.signin}>
                    <Text style={styles.singintxt}> Sign in With Google  </Text>
                </TouchableOpacity>
            </View>

            <View style={{ width: "100%" }}>
                <TouchableOpacity style={styles.dontacc} onPress={handlesignup}>
                    <Text style={styles.dontacctxt}>Don't have an account? Sign Up  </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Loginpage

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
    signin: {
        borderWidth: 1,
        borderColor: "#cccc",
        width: "100%",
        borderRadius: 30,
        marginTop: 14
    },
    singintxt: {
        paddingVertical: 12,
        textAlign: "center",
        fontWeight: "700",
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