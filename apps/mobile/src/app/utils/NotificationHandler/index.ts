import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

import PushNotificationIOS from '@react-native-community/push-notification-ios';

import { FIREBASE_SENDER_ID } from '../../../envs/secret.json';

class NotificationHandler {
    private registerHandler: any;
    private registrationErrorHandler: any;
    private notificationHandler: any;

    onNotification(notification: any) {
        if (typeof this.notificationHandler === 'function') {
            this.notificationHandler(notification);
        }
        if (Platform.OS === 'ios') {
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
    }

    onRegister(token: any) {
        if (typeof this.registerHandler === 'function') {
            this.registerHandler(token);
        }
    }

    onRegistrationError(error: any) {
        if (typeof this.registrationErrorHandler === 'function') {
            this.registrationErrorHandler(error);
        }
    }

    attachTokenReceived(handler: any) {
        this.registerHandler = handler;
    }

    attachNotificationReceived(handler: any) {
        this.notificationHandler = handler;
    }

    attachRegistrationError(handler: any) {
        this.registrationErrorHandler = handler;
    }
}

export const DEFAULT_CHANNEL_ID = 'io.lemoncloud.eurekakit.channel'; // should be same as android variables
export const DEFAULT_CHANNEL_NAME = 'eurekakit';

const notificationHandler = new NotificationHandler();

PushNotification.createChannel(
    {
        channelId: DEFAULT_CHANNEL_ID,
        channelName: DEFAULT_CHANNEL_NAME,
        importance: 5,
        vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`)
);

PushNotification.configure({
    onRegister: notificationHandler.onRegister.bind(notificationHandler),
    onRegistrationError: notificationHandler.onRegistrationError.bind(notificationHandler),
    onNotification: notificationHandler.onNotification.bind(notificationHandler),
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
    senderId: FIREBASE_SENDER_ID, // EurekaPage fcm sender id
});

export default notificationHandler;
