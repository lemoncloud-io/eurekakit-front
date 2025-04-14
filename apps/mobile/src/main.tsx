import React from 'react';
import { AppRegistry, Platform } from 'react-native';

import messaging from '@react-native-firebase/messaging';

import App from './app/App';
import { sendLocalNotification } from './app/utils';

messaging().setBackgroundMessageHandler(async notification => {
    const payload = notification.data || null;
    if (!payload) {
        return;
    }

    if (Platform.OS === 'android') {
        sendLocalNotification(notification);
    }
});

const HeadlessCheck = props => {
    if (Object.prototype.hasOwnProperty.call(props, 'isHeadless') && props.isHeadless) {
        return null;
    }

    return <App />;
};

AppRegistry.registerComponent('EurekaPage', () => HeadlessCheck);
