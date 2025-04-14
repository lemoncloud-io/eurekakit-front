import React from 'react';
import { Easing, StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { AppColors } from '../../theme';

const CircularProgress = ({ progress }) => {
    return (
        <View style={styles.circularProgressView}>
            <AnimatedCircularProgress
                size={80}
                width={4}
                rotation={0}
                prefill={30}
                duration={10}
                fill={progress}
                tintColor={AppColors.main}
                easing={Easing.linear}
                backgroundColor={AppColors.white}
            >
                {() => <Text>{progress}%</Text>}
            </AnimatedCircularProgress>
        </View>
    );
};

const styles = StyleSheet.create({
    circularProgressView: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
});

export default CircularProgress;
