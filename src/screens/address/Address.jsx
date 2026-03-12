import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchaddress } from '../../redux/slices/AddressSlice.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Address = ({ setModelvisible, getalladdress, getaddressloading, getaddresserror }) => {


    const Renderaddress = ({ item }) => {
        return (
            <>
                <View style={styles.delivercard}>

                    {/* Left home icon */}
                    <View style={styles.homebg}>
                        <Ionicons name="home-outline" size={20} color="#16a34a" />
                    </View>

                    {/* Address details + Change button */}
                    <View style={styles.addressContent}>

                        <View style={styles.topRow}>
                            <Text style={styles.typeText}>{item.type}</Text>
                            <TouchableOpacity onPress={() => setModelvisible(true)}>
                                <Text style={styles.changeText}>Change</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.nameText}>{item.name}</Text>

                        <Text style={styles.addressText}>
                            Flat No : {item.flatNo}
                        </Text>
                        <Text style={styles.addressText}>
                            {item.buildingName} , {item.landmark}
                        </Text>
                        <Text style={styles.addressText}>
                            {item.locality} - {item.pincode}
                        </Text>



                        {item.isDefault && (
                            <View style={styles.preferredRow}>
                                <AntDesign name="star" size={13} color="#f59e0b" />
                                <Text style={styles.preferredText}>Preferred delivery address</Text>
                            </View>
                        )}

                    </View>
                </View>
            </>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Deliver to</Text>

            {getaddressloading ? (
                <Text style={styles.loadingText}>Loading...</Text>
            ) : (
                <FlatList
                    data={getalladdress.filter((item) => item.isDefault === true)}
                    keyExtractor={(item) => item._id}
                    renderItem={Renderaddress}
                />
            )}

        </View>
    );
};

export default Address;

const styles = StyleSheet.create({
    container: {
        paddingTop: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
        marginBottom: 10,
    },
    delivercard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
        alignItems: 'flex-start',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    homebg: {
        backgroundColor: '#f0fdf4',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addressContent: {
        flex: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    typeText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111',
        textTransform: 'capitalize',
    },
    changeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#7c3aed',
    },
    nameText: {
        fontSize: 13,
        color: '#858383',
        marginBottom: 2,
    },
    addressText: {
        fontSize: 13,
        color: '#858383',
        lineHeight: 18,
    },
    preferredText: {
        fontSize: 12,
        color: '#858383',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#999',
    },
    preferredRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingTop: 4,
    },
});