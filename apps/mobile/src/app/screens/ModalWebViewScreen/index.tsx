import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import CloseIcon from '../../../assets/images/close.svg';
import { EUREKA_DEVICE_INFO, historyStateWrapperJS } from '../../const';
import { AppColors } from '../../theme';
import { getDeviceInfoJS, getWebViewInfoJS } from '../../utils';

import type { WebMessage } from '@lemon/types';

export const ModalWebViewScreen = ({ route }) => {
    const navigation = useNavigation();
    const webviewRef: any = useRef(null);

    const url = route.params.url;
    const title = route.params.title;
    const queryParams = route.params.queryParams || {};
    const loading = !!route.params.loading;
    const webViewStyles = route.params.styles ? route.params.styles : {};

    const [isReady, setIsReady] = useState(false);
    const [canGoBack, setCanGoBack] = useState(false);
    const [deviceInfoJS, setDeviceInfoJS] = useState('');

    const onAndroidBackPressOnModal = (): boolean => {
        if (canGoBack) {
            webviewRef.current.goBack();
            return true;
        }
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
        return true;
    };

    useEffect(() => {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', onAndroidBackPressOnModal);
            return () => BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPressOnModal);
        }
        return;
    }, [onAndroidBackPressOnModal]);

    useEffect(() => {
        const deviceInfoJS = AsyncStorage.getItem(EUREKA_DEVICE_INFO).then(deviceData => getDeviceInfoJS(deviceData));
        // TODO: build token on modal webview
        // const setTokenJS = authService.getSavedTokenData().then((savedToken) => setDataToLocalStorageJS(savedToken));
        const setTokenJS = '';
        const webViewInfoScript = getWebViewInfoJS('modal');
        // set LEMON DEVICE INFO and TOKEN
        Promise.all([deviceInfoJS, setTokenJS])
            .then(([deviceScript, tokenScript]) => deviceScript + tokenScript + webViewInfoScript)
            .then((script: string) => setDeviceInfoJS(script))
            .then(() => hideSplashScreen());
    }, []);

    const hideSplashScreen = () => {
        setIsReady(true);
    };

    const handleOnMessage = async (event: { nativeEvent: any }) => {
        try {
            const message: WebMessage = JSON.parse(event.nativeEvent.data);
            if (message.type === 'NavigationStateChange') {
                setNavigationState(event);
                return;
            }
        } catch (e) {
            return;
        }
    };

    const setNavigationState = event => {
        const data = event.nativeEvent;
        setCanGoBack(data.canGoBack);
    };

    const renderWebView = () => {
        const query = new URLSearchParams(queryParams).toString();
        const webURL = `${url}${query ? `?${query}` : ''}`;

        return (
            <WebView
                injectedJavaScriptBeforeContentLoaded={historyStateWrapperJS + deviceInfoJS}
                style={[webViewStyles]}
                ref={webviewRef}
                originWhitelist={['*']}
                source={{ uri: webURL }}
                startInLoadingState={loading}
                javaScriptEnabled
                scrollEnabled
                scalesPageToFit={true}
                ignoreSslError={true}
                domStorageEnabled={true}
                onMessage={handleOnMessage}
            />
        );
    };

    return (
        <>
            {isReady && (
                <SafeAreaView style={{ backgroundColor: AppColors.white, flex: 1 }}>
                    <View style={styles.title}>
                        <CloseIcon style={{ width: 24, height: 24 }} onPress={() => navigation.goBack()} />
                        <Text style={[{ fontWeight: '500', flex: 1, textAlign: 'center', marginRight: 24 }]}>
                            {title || ''}
                        </Text>
                    </View>
                    {url && renderWebView()}
                </SafeAreaView>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.gray,
    },
});
