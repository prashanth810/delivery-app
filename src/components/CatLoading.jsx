import { View, Text, ScrollView } from 'react-native'
import React from 'react'

const CatLoading = () => {
    const loaders = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <View>
            <ScrollView horizontal
                showsHorizontalScrollIndicator={false}>
                {loaders?.map((item, i) => (
                    <View key={i} className="mr-3 w-20 items-center">
                        <View className="w-14 h-14 bg-zinc-100 rounded-full animate-pulse" />
                        <View className="w-14 h-14 pt-3 bg-zinc-100 rounded-sm animate-pulse" />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default CatLoading