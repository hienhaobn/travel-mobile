/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-explicit-any */
import notifee, { AndroidImportance, AndroidLaunchActivityFlag } from '@notifee/react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { getThemeColor } from 'utils/getThemeColor';

const AndroidNotificationChannelId = 'Travel';
const AndroidNotificationChannelName = 'Travel';

const TIME_OUT_OPEN_NOTIFY = 1200;

export interface IFirebaseVariables {
    token?: string | undefined;
}

export const FirebaseVariables: IFirebaseVariables = {
    token: undefined,
};

export interface IPushNotificationParams {
    id: string;
}

interface ICallBackInit {
    onUpdateToken?: any;
    onNewMessage?: any;
    onOpenPushNotification?: (params: IPushNotificationParams) => void;
}

export default class FirebaseUtils {
    private static instance: FirebaseUtils;
    private unsubscribe: any = undefined;

    public static getInstance() {
        if (!FirebaseUtils.instance) {
            FirebaseUtils.instance = new FirebaseUtils();
        }
        return FirebaseUtils.instance;
    }

    public init(params?: ICallBackInit) {
        this.register();
        this.onSubscribeNotify(params?.onUpdateToken);
        this.handleNotification(params);
    }

    private register = async () => {
        await this.requestPermission();
        await this.createDefaultChannels();
    };

    private async requestPermission() {
        const enabled = await messaging().hasPermission();
        if (!enabled) {
            // user has permissions
        } else {
            await messaging().requestPermission();
            // User has authorised
        }
        await notifee.requestPermission();
    }

    private createDefaultChannels = async () => {
        if (Platform.OS === 'android') {
            await notifee.createChannel({
                id: AndroidNotificationChannelId,
                name: AndroidNotificationChannelName,
                importance: AndroidImportance.HIGH,
            });
        }
    };

    public unSubscribeNotification() {
        this.removeAllNotifyLocal();
        // const deviceId = DeviceInfo.getUniqueId();
        // const token = firebaseVariables.token;
        // if (!!this.unsubscribe) {
        //   this.unsubscribe();
        //   this.unsubscribe = undefined;
        // }
        // if (!deviceId || !token) return;
        // FirebaseUtils.getInstance().deleteToken();
    }

    public removeAllNotifyLocal() {
        notifee.cancelAllNotifications();
        notifee.setBadgeCount(0);
    }

    private async getFCMToken() {
        const token = await messaging().getToken();
        if (token) {
            FirebaseVariables.token = token;
        }
        return token;
    }

    private deleteToken() {
        // if (firebaseVariables.token) {
        //   messaging().deleteToken(firebaseVariables.token);
        //   firebaseVariables.token = undefined;
        // }
    }

    private onSubscribeNotify = async (onUpdateToken?: any) => {
        // const device_id = await DeviceInfo.getUniqueId()
        const token = await this.getFCMToken();
        if (!token) {
            return;
        }

        console.log('device token', token);

        onUpdateToken?.(token);
    };

    private handleNotification(paramsCallback?: ICallBackInit) {
        this.handleMessageNotification(paramsCallback);
        this.handleInitNotification(paramsCallback);
        this.handleNotificationOpened(paramsCallback);
    }

    private handleMessageNotification(paramsCallback?: ICallBackInit) {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = undefined;
        }

        this.unsubscribe = messaging().onMessage(res => {
            this.onPushNotificationLocal(res, paramsCallback);
        });
    }

    private async onPushNotificationLocal(res: FirebaseMessagingTypes.RemoteMessage, paramsCallback?: ICallBackInit) {
        await notifee.displayNotification({
            id: res?.data?.id || Date.now()?.toString?.(),
            title: res?.notification?.title || AndroidNotificationChannelName,
            body: res?.notification?.body || '',
            android: {
                channelId: AndroidNotificationChannelId,
                color: getThemeColor().Color_Primary,
                // largeIcon: 'ic_launcher',
                // smallIcon: 'ic_notification',
                importance: AndroidImportance.HIGH,
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

        paramsCallback?.onNewMessage?.();
    }

    private handleNotificationOpened(paramsCallback?: ICallBackInit) {
        messaging().onNotificationOpenedApp(res => {
            // console.tron.log(
            //   'Notification caused app to open from background state: ',
            //   res,
            // );
            let params: any = res?.data || undefined;
            if (!params) {
                return;
            }
            if (typeof params === 'string') {
                params = JSON.parse(params);
            }
            this.onOpenPushNotification(params, paramsCallback);
        });
    }

    private handleInitNotification(paramsCallback?: ICallBackInit) {
        messaging()
            .getInitialNotification()
            .then(res => {
                if (res) {
                    // console.tron.log(
                    //   'Notification caused app to open from quit state: ',
                    //   res,
                    // );
                    let params: any = res?.data || undefined;
                    if (!params) {
                        return;
                    }
                    if (typeof params === 'string') {
                        params = JSON.parse(params);
                    }
                    setTimeout(() => {
                        this.onOpenPushNotification(params, paramsCallback);
                    }, TIME_OUT_OPEN_NOTIFY);
                }
            });
    }

    private onOpenPushNotification = (params: IPushNotificationParams, paramsCallback?: ICallBackInit) => {
        if (!params) {
            return;
        }
        paramsCallback?.onOpenPushNotification?.(params);
    };
}
