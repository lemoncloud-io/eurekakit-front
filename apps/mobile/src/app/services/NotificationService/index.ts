import { PermissionsAndroid, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

import { NotificationHandler } from '../../utils';

export default class NotificationService {
    constructor(onTokenReceived: any, onNotificationReceived: any, onRegistrationError: any) {
        NotificationHandler.attachTokenReceived(onTokenReceived);
        NotificationHandler.attachNotificationReceived(onNotificationReceived);
        NotificationHandler.attachRegistrationError(onRegistrationError);

        PushNotification.getApplicationIconBadgeNumber((num: number) => {
            PushNotification.setApplicationIconBadgeNumber(num);
        });
    }

    checkPermissions(cbk: any) {
        return PushNotification.checkPermissions(cbk);
    }

    requestPermissions() {
        return PushNotification.requestPermissions();
    }

    cancelNotifications() {
        PushNotification.cancelLocalNotifications();
    }

    cancelAll() {
        PushNotification.cancelAllLocalNotifications();
    }

    abandonPermissions() {
        PushNotification.abandonPermissions();
    }

    checkPushNotificationsPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
            } catch (error) {
                console.log(error);
            }
        }
    };
}
