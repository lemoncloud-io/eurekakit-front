import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { AppColors } from '../../theme';

const LoadingBar = ({ percent, color = AppColors.main, height = 2 }) => {
    const style = {
        backgroundColor: color,
        width: `${percent}%`,
        height,
    };
    return <View style={[styles.container, style]} />;
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 2,
        top: getStatusBarHeight(true),
        left: 0,
    },
});

export default LoadingBar;
