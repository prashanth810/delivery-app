import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Homescreen = () => {
    return (
        <View>
            <StatusBar barStyle={"light-content"} backgroundColor={"#15803d"} translucent={false} />
            <Text>Homescreen</Text>
        </View>
    )
}

export default Homescreen

const styles = StyleSheet.create({})