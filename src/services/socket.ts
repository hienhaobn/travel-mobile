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

export default class SocketUtils {
    public static getInstance() {
        if (!SocketUtils.instance) {
            SocketUtils.instance = new SocketUtils();
        }
        return SocketUtils.instance;
    }

    private static instance: SocketUtils;
    public socketFutures;

    public connect = (userId?: number) => {
        this.disconnect();
        this.socketFutures = this.initSocket();
    }

    public disconnect = () => {
        this.socketFutures?.close();
    }

    public initSocket = () => {
        const { accessToken } = this.getTokenData();

        return socketIO(Config.SOCKET_DOMAIN, {
            path: '/chat',
            query: {
                authorization: accessToken,
            },
            transports: ['websocket'],
        });
    }

    public listenMessage() {
        this.socketFutures.on(EVENTS_FUTURES.MESSAGE, () => {
            onPushEventBus(EVENTS_FUTURES.MESSAGE);
        })
    }

    private getTokenData = () => {
        const { users } = store.getState();
        const accessToken = users?.tokenInfo?.accessToken;
        return { accessToken };
    }
}
