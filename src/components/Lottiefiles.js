import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const Lottiefiles = () => {
    const animationRef = useRef(null);

    return (
        <View style={styles.container}>
            <LottieView
                ref={animationRef}
                source={require('./assets/animation.json')}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    );
}

export default Lottiefiles;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animation: {
        width: 200,
        height: 200,
    },
});