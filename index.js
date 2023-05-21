/**
 * @format
 */
import 'react-native-gesture-handler';

import messaging from '@react-native-firebase/messaging';
import { AppRegistry, LogBox, Platform, StatusBar, Text, TextInput, TouchableOpacity } from 'react-native';

import App from './App';
import { name as appName } from './app.json';

Text.defaultProps = {};
Text.defaultProps.maxFontSizeMultiplier = 1.0;
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
TouchableOpacity.defaultProps = TouchableOpacity.defaultProps || {};
TouchableOpacity.defaultProps.activeOpacity = 0.7;

if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor('transparent');
  StatusBar.setTranslucent(true);
}

StatusBar.setBarStyle('dark-content');

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'DEPRECATION WARNING',
    'Reanimated 2',
    '[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!',
    'Require cycle:',
    'ViewPropTypes will be removed from React Native',
    '(ADVICE) View ',
]);

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Received background message:', remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return <App />;
}
AppRegistry.registerComponent(appName, () => HeadlessCheck);
