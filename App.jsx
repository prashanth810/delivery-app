import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Rootnavigator from './src/navigations/Rootnavigator';
import { Provider } from "react-redux";
import Mystore from './src/redux/store/Mystore.js'

const SplashScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#15803d" }}>
      <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold" }}>🛒 FreshFood</Text>
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
    </View>
  );
};

const App = () => {
  const [loading, setLoading] = useState(false); // ✅ false = splash showing

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true); // ✅ after 1500ms hide splash
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={Mystore}>
        <NavigationContainer>
          {!loading ? (        // ✅ fixed: show splash when loading is false
            <SplashScreen />
          ) : (
            <Rootnavigator />
          )}
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15803d",
  }
});