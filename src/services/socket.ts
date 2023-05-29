import socketIO from 'socket.io-client';
import { onPushEventBus } from 'services/event-bus';
import store from '../states';

export const EVENTS_SOCKET = {
    MESSAGE: 'MESSAGE',
    RECEIVE_MESSAGE: 'receive-messages',
    RECEIVE_USERS: 'receive-users',
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
        this.listenReceiveMessage();
        this.listenReceiveUsers();
        this.connected();
    }

    public listenMessage() {
        this.socket.on(EVENTS_SOCKET.MESSAGE, () => {
            onPushEventBus(EVENTS_SOCKET.MESSAGE);
        })
    }

    public listenReceiveMessage() {
        this.socket.on(EVENTS_SOCKET.RECEIVE_MESSAGE, (messages) => {
            console.log('messages', messages);
            onPushEventBus(EVENTS_SOCKET.RECEIVE_MESSAGE);
        })
    }

    public listenReceiveUsers() {
        this.socket.on(EVENTS_SOCKET.RECEIVE_USERS, (users) => {
            console.log('users', users);
            onPushEventBus(EVENTS_SOCKET.RECEIVE_USERS);
        })
    }

    public connected() {
        this.socket.on('connect', () => {
            console.log(`⚡: Socket connected!`);
        })
    }

    private getTokenData = () => {
        const { users } = store.getState();
        const accessToken = users?.tokenInfo?.accessToken;
        return { accessToken };
    }
}
