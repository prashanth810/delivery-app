import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather';


const Header = () => {
    const navigation = useNavigation();



    return (
        <View style={{
            flexDirection: "column",
            gap: 3
        }}>
            <Text style={[styles.textcolor, {
                paddingTop: 5,
                fontSize: 15,
                color: "#cccc",
            }]}>Delivery Started</Text>

            <View>
                <Text style={[styles.textcolor, {
                    fontSize: 20,
                    fontWeight: "800",
                    paddingVertical: 3
                }]}>15 Minutes ⚡</Text>

                <View style={styles.addresrow}>
                    <View style={styles.address}>
                        <Text style={[styles.textcolor, {
                            color: "#ccc",

                        }]}>503245 - Dharyapur</Text>
                        <FontAwesome
                            name="angle-down"
                            size={18}
                            style={{ marginLeft: 5, color: "#fff" }}
                        />
                    </View>

                    <View style={styles.icons}>
                        <Pressable onPress={() => navigation.navigate("userprofile")}>
                            <Feather name='user' size={20} color={"#fff"} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    address: {
        flexDirection: 'row',
        alignItems: 'center',
        rowGap: 2
    },
    addresrow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
    },
    icons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 10,
    },
    textcolor: {
        color: "#fff"
    },
});
