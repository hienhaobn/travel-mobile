/* eslint-disable import/no-extraneous-dependencies */
import notifee, { AndroidImportance, AndroidLaunchActivityFlag } from '@notifee/react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import Config from 'react-native-config';

const NotificationChannelId = 'drexchange';
const NotificationChannelName = 'drexchange';

const createDefaultChannel = async () => {
    if (Platform.OS === 'android') {
        await notifee.createChannel({
            id: NotificationChannelId,
            name: NotificationChannelName,
            importance: AndroidImportance.DEFAULT,
        });
    }
};

const pushNotificationLocal = async (res: FirebaseMessagingTypes.RemoteMessage) => {
    const iconNotification = `ic_launcher_${Config.APP_PREFIX === 'villbit' ? 'pibit' : 'monas'}`;
    await notifee.displayNotification({
        id: res?.data?.id || res?.messageId || Date.now()?.toString?.(),
        title: res?.notification?.title || '',
        body: res?.notification?.body || '',
        android: {
            // largeIcon: iconNotification,
            channelId: NotificationChannelId,
            smallIcon: iconNotification,
            importance: AndroidImportance.DEFAULT,
            pressAction: {
                id: 'default',
                launchActivity: 'default',
                launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
            },
        },
        data: {
            payload: (res?.data && JSON.stringify(res?.data)) || '',
        },
    });
};

const handleNotification = async () => {
    await createDefaultChannel();
    // await quitStateHandle();
    // await backgroundHandle();
};

const NotificationServices = {
    handleNotification,
    pushNotificationLocal,
};

export default NotificationServices;
