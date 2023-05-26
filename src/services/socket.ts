import Config from 'react-native-config';
import socketIO from 'socket.io-client';
import { onPushEventBus } from 'services/event-bus';
import store from '../states';

export const EVENTS_FUTURES = {
    MESSAGE: 'MESSAGE',
    RECEIVE_MESSAGE: 'receive-messages',
    RECEIVE_USER: 'receive-users',
    GET_USERS: 'get-users',
    GET_MESSAGES: 'get-messages',
    JOIN_ROOM: 'join-room',
}

const SOCKET_DOMAIN='https://socket.ktravel.online';

export default class SocketUtils {
    public static getInstance() {
        if (!SocketUtils.instance) {
            SocketUtils.instance = new SocketUtils();
        }
        return SocketUtils.instance;
    }

    private static instance: SocketUtils;
    public socket;

    public connect = (userId?: number) => {
        this.disconnect();
        this.socket = this.initSocket();
        this.listenEvents(userId);
    }

    public disconnect = () => {
        this.socket?.close();
    }

    public initSocket = () => {
        const { accessToken } = this.getTokenData();

        console.log('accessToken', accessToken);
        return socketIO(SOCKET_DOMAIN, {
            path: "/chat",
            transportOptions: {
                polling: {
                    extraHeaders: {
                        Authorization: accessToken,
                    },
                },
            },
        });
    }

    public listenEvents(userId?: number) {
        this.listenMessage();
        this.connected();
    }

    public listenMessage() {
        this.socket.on(EVENTS_FUTURES.MESSAGE, () => {
            onPushEventBus(EVENTS_FUTURES.MESSAGE);
        })
    }

    public connected() {
        this.socket.on('connect', () => {
            console.log(`⚡: connected!`);
        })
    }

    private getTokenData = () => {
        const { users } = store.getState();
        const accessToken = users?.tokenInfo?.accessToken;
        return { accessToken };
    }
}
