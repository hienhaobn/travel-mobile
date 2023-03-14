import { EThemeColor } from 'constants/index';

export const getThemeColor = (theme = EThemeColor.Light) => {
    // Todo: check dark mode

    // if (theme === EThemeColor.Dark) {
    //   return Dark;
    // }
    return Light;
};
