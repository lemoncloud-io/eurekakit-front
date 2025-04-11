import React from 'react';
import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';

import { useNavigation } from '@react-navigation/native';

export const EurekaPageWebViewScreen = () => {
    const navigation = useNavigation();
    const URL = 'http://localhost:5003';

    return (
        <SafeAreaView>
            <WebView source={{ uri: URL }} />
        </SafeAreaView>
    );
};
