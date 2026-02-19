import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchInput = ({ onChange, value, }) => {
    return (
        <View style={styles.searchinp}>
            <FontAwesome name="search" color={"#9CA3AF"} size={18} />

            <TextInput value={value} onChangeText={onChange}
                placeholder='Search products'
                placeholderTextColor={"#9CA3AF"}
                style={styles.input}
            />
        </View>
    )
}

export default SearchInput

const styles = StyleSheet.create({
    searchinp: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderRadius: 50,
        gap: 8,
    },
    input: {
        flex: 1,
    },
});
