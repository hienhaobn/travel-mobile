import { Text, View } from 'react-native';
import { Provider } from 'react-redux';

import store from 'states';

function App() {
    return (
        <Provider store={store}>
            <View>
                <Text>Abc</Text>
            </View>
        </Provider>
    );
}

export default App;
