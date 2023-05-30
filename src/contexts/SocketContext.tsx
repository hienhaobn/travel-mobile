import { createContext } from 'react';
import { io } from 'socket.io-client';
import store from 'states';

const APP_WEBSOCKET_URL='https://socket.ktravel.online';

const { users } = store.getState();
const accessToken = users?.tokenInfo?.accessToken;

export const socket = io(APP_WEBSOCKET_URL!, {
    withCredentials: true,
    path: "/chat",
    transportOptions: {
        polling: {
            extraHeaders: {
                Authorization: accessToken,
            },
        },
    },
});

export const SocketContext = createContext(socket);
