import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// eslint-disable-next-line import/no-extraneous-dependencies
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-toast-notifications';
import toast from 'react-native-toast-notifications/lib/typescript/toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import StackNavigator from 'navigation/Navigation';

import store, { persistor } from 'states';


function App() {
  // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  // useEffect(() => {
  //   const getToken = async () => {
  //     const token = await messaging()
  //       .getToken();
  //     console.log(token);

  //     return token;
  //   }

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log(remoteMessage);

  //     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   // return unsubscribe;
  // }, []);
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <BottomSheetModalProvider>
          <PersistGate loading={null} persistor={persistor}>
            <StackNavigator />
          </PersistGate>
        </BottomSheetModalProvider>
        <Toast ref={(ref) => (toast = ref)} />
      </Provider>
    </RootSiblingParent>
  );
}

export default App;
