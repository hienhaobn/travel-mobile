import * as React from 'react';
import {
    ActivityIndicator,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle
} from 'react-native';
import { getThemeColor } from 'utils/getThemeColor';

export interface LoadingViewProps {
    style?: StyleProp<ViewStyle>;
    top?: number;
}

export default class LoadingView extends React.PureComponent<LoadingViewProps> {
    public render() {
        const { top: marginTop } = this.props;
        return (
            <View style={[styles.container, { marginTop }, this.props.style]}>
                <ActivityIndicator size="small" color={getThemeColor().Color_Primary} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
