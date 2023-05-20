/* eslint-disable @typescript-eslint/no-explicit-any */
import { Subject } from 'rxjs';

export interface BaseEventType {
    type: string;
    payload?: any;
}

export interface BaseEvent<Payload> {
    type: string;
    payload?: Payload;
}

export default class EventBus {
    public static getInstance(): EventBus {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }

    private static instance: EventBus;

    private eventSubject = new Subject<BaseEventType>();

    public get events() {
        return this.eventSubject.asObservable();
    }

    public post<T extends BaseEventType>(event: T): void {
        this.eventSubject.next(event);
    }
}

export const onPushEventBus = <T>(type: string, payload?: T) => {
    EventBus.getInstance().post({ type, payload });
};

export const EventBusName = {
    LOGOUT: 'LOGOUT',
    OPEN_BOTTOM_SHEET_ORDER_TOUR: 'OPEN_BOTTOM_SHEET_ORDER_TOUR',
    CLAIM_SUCCESS: 'CLAIM_SUCCESS',
    ACTION_ORDER: 'ACTION_ORDER',
};
