import React from 'react';
import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';

import { useNavigation } from '@react-navigation/native';

export const ModalWebViewScreen = ({ route }) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <WebView source={{ uri: route.params.url }} />
        </SafeAreaView>
    );
};
