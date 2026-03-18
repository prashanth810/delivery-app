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
        role: "USER"
    });
    const [errors, setErrors] = useState({});
    const [isloading, setIsloading] = useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handlesignup = () => {
        navigation.navigate("signup");
    }

    const handlechange = (key, value) => {
        setFormdata(prev => ({ ...prev, [key]: value }));
        // ✅ Clear error on typing
        if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
    };

    // ✅ Validate fields
    const validate = () => {
        const newErrors = {};
        if (!formdata.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
            newErrors.email = "Enter a valid email address";
        }
        if (!formdata.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formdata.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlesubmit = async () => {
        if (!validate()) return;
        console.log("login started");
        setIsloading(true);
        try {
            const res = await dispatch(login(formdata)).unwrap();
            console.log(res, 'login success');
            await AsyncStorage.setItem("token", res.token);
            await AsyncStorage.setItem("userId", res?.data?._id);
            navigation.navigate('main', { screen: 'home' });
        } catch (error) {
            console.log(error, 'login failed');

            // ✅ Show friendly error based on message
            const msg = typeof error === "string" ? error : error?.message || "";

            if (msg.toLowerCase().includes("password")) {
                setErrors({ password: "Incorrect password. Please try again." });
            } else if (msg.toLowerCase().includes("email") || msg.toLowerCase().includes("user") || msg.toLowerCase().includes("not found")) {
                setErrors({ email: "No account found with this email." });
            } else if (msg.toLowerCase().includes("network") || msg.toLowerCase().includes("connect")) {
                setErrors({ general: "Network error. Please check your internet connection." });
            } else {
                setErrors({ general: msg || "Login failed. Please try again." });
            }
        } finally {
            setIsloading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.getstarts}>Get Started</Text>
            <Text style={styles.subtitle}>
                Enter Your details to pick your fresh food
            </Text>

            <View style={styles.inputWrapper}>

                {/* ✅ General error */}
                {errors.general ? (
                    <View style={styles.generalError}>
                        <Feather name="alert-circle" size={14} color="#dc2626" />
                        <Text style={styles.generalErrorText}>{errors.general}</Text>
                    </View>
                ) : null}

                {/* Email */}
                <Text style={styles.label}>Email</Text>
                <View style={[styles.inpstyle, errors.email && styles.inpError]}>
                    <Feather name="mail" size={16} color={errors.email ? "#dc2626" : "#c2c2c2"} />
                    <Text style={{ borderRightWidth: 1, borderColor: "#cccc" }} />
                    <TextInput
                        style={{ flex: 1, color: "#000" }}
                        placeholder="Enter Email"
                        value={formdata.email}
                        placeholderTextColor={"#9ca3af"}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={(e) => handlechange("email", e)}
                    />
                </View>
                {errors.email ? (
                    <Text style={styles.errorText}>⚠ {errors.email}</Text>
                ) : null}

                {/* Password */}
                <Text style={[styles.label, { marginTop: 6 }]}>Password</Text>
                <View style={[styles.inpstyle, errors.password && styles.inpError]}>
                    <TouchableOpacity onPress={() => setShowpass(!showpass)}>
                        {showpass ? (
                            <Feather name="eye" size={16} color={errors.password ? "#dc2626" : "#c2c2c2"} />
                        ) : (
                            <Feather name="eye-off" size={16} color={errors.password ? "#dc2626" : "#c2c2c2"} />
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
                {errors.password ? (
                    <Text style={styles.errorText}>⚠ {errors.password}</Text>
                ) : null}

            </View>

            <View style={{ width: "100%" }}>
                <TouchableOpacity
                    style={[styles.continue, isloading && { opacity: 0.7 }]}
                    onPress={handlesubmit}
                    disabled={isloading}>
                    <Text style={styles.continuetxt}>
                        {isloading ? "Logging in..." : "CONTINUE"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ width: "100%" }}>
                <TouchableOpacity style={styles.signin}>
                    <Text style={styles.singintxt}> Sign in With Google </Text>
                </TouchableOpacity>
            </View>

            <View style={{ width: "100%" }}>
                <TouchableOpacity style={styles.dontacc} onPress={handlesignup}>
                    <Text style={styles.dontacctxt}>Don't have an account? Sign Up</Text>
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
        gap: 6,
        marginBottom: 4,
    },
    label: {
        fontSize: 13,
        color: "#444",
        marginBottom: 2,
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
        gap: 8,
    },
    inpError: {
        borderColor: "#dc2626",
        backgroundColor: "#fff5f5",
    },
    errorText: {
        color: "#dc2626",
        fontSize: 11,
        marginTop: 2,
    },
    generalError: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#fff5f5",
        borderWidth: 1,
        borderColor: "#fca5a5",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 4,
    },
    generalErrorText: {
        color: "#dc2626",
        fontSize: 13,
        flex: 1,
    },
    continue: {
        borderWidth: 1,
        borderColor: "green",
        width: "100%",
        borderRadius: 30,
        backgroundColor: "#16a34a",
        marginTop: 16,
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
        marginTop: 14,
    },
    singintxt: {
        paddingVertical: 12,
        textAlign: "center",
        fontWeight: "700",
        fontSize: 15,
    },
    dontacc: {
        marginTop: 14,
    },
    dontacctxt: {
        color: "#0b4ad6",
        textAlign: "center",
    },
});