import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNRestart from 'react-native-restart';

import { AppColors } from '../../theme';

const { width, height } = Dimensions.get('window');

const reloadApp = () => {
    RNRestart.restart();
};

const WebViewError = () => {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{t('error.webview.serviceUnavailable')}</Text>
                <Text style={styles.subtitle}>{t('error.webview.tryAgainLater')}</Text>
                <Text style={styles.subtitle}>{t('error.webview.apologize')}</Text>
                <TouchableOpacity style={styles.button} onPress={reloadApp}>
                    <Text style={styles.buttonText}>{t('common.retry')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height,
        width,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    content: {
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: 22,
        paddingBottom: 16,
    },
    subtitle: {
        fontSize: 16,
    },
    button: {
        marginTop: 24,
        backgroundColor: AppColors.main,
        paddingHorizontal: 50,
        paddingVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default WebViewError;
