import React from 'react';
import { Platform } from 'react-native';

import FirebaseUtils from 'services/firebase';
import { apiRegisterDevice } from 'states/message/fetchNotification';

const useFirebase = () => {
    const onUpdateToken = (token?: string) => {
        apiRegisterDevice({ type: Platform.OS === 'ios' ? 'IOS' : 'ADR', deviceToken: token });
    };
    React.useEffect(() => {
        FirebaseUtils.getInstance().init?.({
            onUpdateToken,
        });
    }, [apiRegisterDevice]);
};

export default useFirebase;
