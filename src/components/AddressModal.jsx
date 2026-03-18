import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AddressRow from './AddressRow.jsx';

const AddressModal = ({
    modelvisible,
    setModelvisible,
    getmyaddress,
    query,
    setQuery,
    selectedaddressId,
    removeAddress,
    setDefaultAddress,
    navigation,
}) => {
    return (
        <Modal visible={modelvisible} animationType="slide" transparent>
            <View style={styles.mainmodel}>
                <View style={styles.submainmodel}>

                    {/* Header */}
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}> Select Address </Text>
                        <Pressable onPress={() => setModelvisible(false)}>
                            <Ionicons name="close" size={20} color={"#000"} />
                        </Pressable>
                    </View>

                    {/* Search Input */}
                    <View style={styles.inprow}>
                        <Ionicons name="search" size={18} color={"#9ca3af"} />
                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            placeholder='Search Address'
                            placeholderTextColor={"#ccc"}
                            style={styles.inpstyle}
                        />
                    </View>

                    {/* Address List + Buttons */}
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={(getmyaddress || []).filter(a =>
                                a?.type?.toLowerCase().includes(query.toLowerCase()) ||
                                a?.locality?.toLowerCase().includes(query.toLowerCase())
                            )}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            showsVerticalScrollIndicator={false}
                            style={{ flexGrow: 0, maxHeight: "65%" }}
                            renderItem={({ item }) => (
                                <AddressRow
                                    item={item}
                                    isSelected={selectedaddressId === item?._id}
                                    onRemove={removeAddress}
                                    onSelect={setDefaultAddress}
                                    onEdit={() => {
                                        setModelvisible(false);
                                        navigation.navigate("addnewaddress", { editAddress: item });
                                    }}
                                />
                            )}
                        />

                        <Pressable
                            style={styles.addnewaddress}
                            onPress={() => {
                                setModelvisible(false);
                                navigation.navigate("addnewaddress");
                            }}>
                            <Text style={styles.addbtntext}> + ADD NEW ADDRESS </Text>
                        </Pressable>

                        <Pressable style={styles.dontbtn} onPress={() => setModelvisible(false)}>
                            <Text style={styles.donetxt}> DONE </Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default AddressModal

const styles = StyleSheet.create({
    mainmodel: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "flex-end",
    },
    submainmodel: {
        backgroundColor: "#ffff",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        height: "65%",
        padding: 15,
    },
    inprow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: "#f3f4f6",
        paddingHorizontal: 7,
        borderRadius: 8,
        marginVertical: 6,
    },
    inpstyle: {
        flex: 1,
        fontSize: 14,
        color: "#000",
    },
    addnewaddress: {
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#9333ea",
        paddingVertical: 10,
        borderRadius: 10,
    },
    addbtntext: {
        textAlign: 'center',
        color: "#9333ea",
    },
    dontbtn: {
        backgroundColor: "green",
        paddingVertical: 10,
        marginTop: 15,
        borderRadius: 10,
    },
    donetxt: {
        textAlign: "center",
        color: "#ffff",
        fontSize: 16,
        fontWeight: "500",
    },
})