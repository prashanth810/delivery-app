import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const CategoryModel = ({
    categoriesmodel,
    setCategoriesModal,
    setCategories,
    cat,
    onSelectCategory
}) => {
    return (
        <Modal visible={categoriesmodel} transparent animationType="slide">
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setCategoriesModal(false)} >
                <Pressable activeOpacity={1} style={styles.modalContent}>
                    <Text style={styles.catheading}> Categories </Text>
                    {cat.map(item => (
                        <TouchableOpacity
                            key={item._id}
                            style={styles.modalItem}
                            onPress={() => {
                                setCategories(item.name);
                                onSelectCategory(item._id);
                                setCategoriesModal(false);
                            }} >
                            <Text style={styles.modalText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </Pressable>
            </TouchableOpacity>
        </Modal>
    );
};

export default CategoryModel

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: 'flex-end',
    },

    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 20,
    },

    modalItem: {
        paddingVertical: 10,
        alignItems: 'center',
    },

    modalText: {
        fontSize: 15,
        color: "#000",
    },
    catheading: {
        textAlign: 'center',
        fontWeight: "700",
        fontSize: 18,
    },
})