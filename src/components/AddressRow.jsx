import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const AddressRow = ({ item, isSelected, onRemove, onSelect, onEdit }) => {
    return (
        <Pressable style={styles.addrow} onPress={() => onSelect(item._id)}>
            <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 10 }}>

                {/* Icon */}
                <View style={styles.addresspopmain}>
                    <Ionicons name="home-outline" size={18} color="#16a34a" />
                </View>

                {/* Details */}
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 14, fontWeight: "500" }}> {item.type} </Text>
                        {item.isDefault ? (
                            <View style={[styles.selected, item.isDefault ? styles.selectedbg : styles.unselectedbg]} />
                        ) : null}
                    </View>

                    <Text style={{ fontSize: 13, fontWeight: "500", color: "#6b7280" }}> {item?.name} </Text>
                    <Text style={{ fontSize: 13, color: "#6b7280" }}> {item?.flatNo} </Text>
                    <Text style={{ fontSize: 13, color: "#6b7280" }}>
                        {item?.landmark}, {item?.locality} - {item?.pincode}
                    </Text>

                    {/* Edit / Delete buttons */}
                    <View style={styles.btns}>
                        <Pressable onPress={onEdit}>
                            <Text style={styles.actionbtns}>
                                <MaterialIcons name="edit" size={16} color="green" />
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => onRemove(item._id)}>
                            <Text style={styles.actionbtns}>
                                <FontAwesome name="trash-o" size={16} color="red" />
                            </Text>
                        </Pressable>
                    </View>
                </View>

            </View>
        </Pressable>
    )
}

export default AddressRow

const styles = StyleSheet.create({
    addrow: {
        borderWidth: 1,
        borderColor: "#f3f3f3",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 5,
        marginBottom: 4,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4,
    },
    addresspopmain: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#f0fdf4",
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 10,
    },
    selected: {
        width: 13,
        height: 13,
        borderRadius: 30,
    },
    selectedbg: {
        backgroundColor: "green",
    },
    unselectedbg: {
        backgroundColor: "transparent",
    },
    btns: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        gap: 10,
    },
    actionbtns: {
        paddingTop: 3,
    },
})