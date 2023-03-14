import { useColorScheme } from 'react-native';

import { EThemeColor, GlobalVariable } from 'constants/index';

export const useMyTheme = () => {
    const colorScheme = useColorScheme();

    // Todo
    const themeCurrent = EThemeColor.Light;

    if (colorScheme === 'dark') {
        // Todo
        // themeCurrent = EThemeColor.Dark;
    }

    GlobalVariable.themeCurrent = themeCurrent;

    return {
        themeCurrent,
    };
};
