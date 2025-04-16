import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

import SpinnerImage from '../../../assets/images/spinner_white.png';

const spinnerImageUri = Image.resolveAssetSource(SpinnerImage).uri;

const OverlaySpinner = () => {
    const animationValue = useRef(new Animated.Value(0)).current;
    const startAnimation = useCallback(() => {
        Animated.loop(
            Animated.timing(animationValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ).start();
    }, [animationValue]);

    useEffect(() => {
        startAnimation();
    }, [startAnimation]);

    const RotateData = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View
            style={[
                styles.spinnerView,
                {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
            ]}
        >
            <Animated.Image
                style={{
                    transform: [{ rotate: RotateData }],
                    width: 30,
                    height: 30,
                }}
                source={{
                    uri: spinnerImageUri,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerView: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default OverlaySpinner;
