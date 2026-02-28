import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Rootnavigator from './src/navigations/Rootnavigator';
import { Provider } from "react-redux";
import Mystore from './src/redux/store/Mystore.js'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={Mystore}>
        <NavigationContainer>
          <Rootnavigator />
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
