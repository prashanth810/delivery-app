import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const CategoryMenu = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { categoryname } = route?.params;

    const [selectcat, setSelectcat] = useState(categoryname.name);
    const [model, setModel] = useState(false);

    const handleprevious = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}

            <View style={styles.header}>

                {/* LEFT SECTION */}
                <View style={styles.leftSection}>

                    <Pressable onPress={handleprevious}>
                        <Icon name="arrow-left" size={24} />
                    </Pressable>

                    <Pressable style={styles.categoryWrapper}>
                        <Text style={styles.categoryText}>
                            {selectcat}
                        </Text>

                        <FontAwesome name="angle-down" size={18} />
                    </Pressable>

                </View>

                {/* RIGHT SECTION */}
                <Pressable>
                    <EvilIcons name="search" size={26} />
                </Pressable>

            </View>


        </View>
    )
}

export default CategoryMenu

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingTop: 10,
        paddingBottom: 10,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },

    leftSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },

    categoryWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    categoryText: {
        fontSize: 18,
        fontWeight: "600",
    },
})