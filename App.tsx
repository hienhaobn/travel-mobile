import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import messaging from '@react-native-firebase/messaging';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-toast-notifications';
import toast from 'react-native-toast-notifications/lib/typescript/toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import StackNavigator from 'navigation/Navigation';

import store, { persistor } from 'states';

function App() {
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
