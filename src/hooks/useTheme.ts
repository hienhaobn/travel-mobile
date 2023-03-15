import { useColorScheme } from 'react-native';

import { EThemeColor, GlobalVariables } from 'constants/index';

export const useTheme = () => {
    const colorScheme = useColorScheme();

    // Todo
    const themeCurrent = EThemeColor.Light;

    if (colorScheme === 'dark') {
        // Todo
        // themeCurrent = EThemeColor.Dark;
    }

    GlobalVariables.themeCurrent = themeCurrent;

    return {
        themeCurrent,
    };
};
