import React from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CategoryModel = ({
    categoriesModal,
    setCategoriesModal,
    setCategories,
    cat,
    onSelectCategory
}) => {
    return (
        <Modal visible={categoriesModal} transparent animationType="slide">
            <View style={styles.modalOverlay}>

                {/* Backdrop — tap to close */}
                <TouchableOpacity
                    style={styles.backdropTouch}
                    activeOpacity={1}
                    onPress={() => setCategoriesModal(false)}
                />

                {/* Sheet Content */}
                <View style={styles.modalContent}>

                    {/* ── Header ── */}
                    <View style={styles.sheetHeader}>
                        <Text style={styles.catheading}>Categories</Text>
                        <TouchableOpacity
                            onPress={() => setCategoriesModal(false)}
                            style={styles.closeBtn}
                        >
                            <Icon name="close" size={18} color="#1a1a1a" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    {/* ── Categories Grid ── */}
                    <FlatList
                        data={cat || []}
                        keyExtractor={(item) => item._id}
                        numColumns={3}
                        columnWrapperStyle={styles.columnWrapper}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.catCard}
                                activeOpacity={0.75}
                                onPress={() => {
                                    setCategories(item.name);
                                    onSelectCategory(item._id);
                                    setCategoriesModal(false);
                                }}
                            >
                                <View style={styles.imgWrapper}>
                                    <Image
                                        source={{ uri: item.imageurl }}
                                        style={styles.catImg}
                                        resizeMode="cover"
                                    />
                                </View>
                                <Text style={styles.modalText} numberOfLines={2}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default CategoryModel;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: 'flex-end',
    },
    backdropTouch: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 16,
        maxHeight: "65%",
    },
    sheetHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingBottom: 12,
    },
    catheading: {
        fontWeight: "700",
        fontSize: 18,
        color: "#1a1a1a",
    },
    closeBtn: {
        padding: 4,
        backgroundColor: "#f5f5f5",
        borderRadius: 20,
    },
    divider: {
        height: 1,
        backgroundColor: "#f0f0f0",
        marginBottom: 8,
    },
    listContent: {
        paddingHorizontal: 12,
        paddingBottom: 20,
    },
    columnWrapper: {
        gap: 10,
        marginBottom: 10,
    },
    catCard: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 6,
        backgroundColor: "#fafafa",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#f0f0f0",
    },
    imgWrapper: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
        marginBottom: 7,
        borderWidth: 1,
        borderColor: "#e5e5e5",
    },
    catImg: {
        width: "100%",
        height: "100%",
    },
    modalText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#333",
        textAlign: "center",
        lineHeight: 15,
    },
});