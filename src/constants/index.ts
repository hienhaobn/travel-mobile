export enum EThemeColor {
    Light = 'Light',
    Dark = 'Dark',
}

interface GlobalVariableParams {
    themeCurrent: EThemeColor;
}

export const GlobalVariable: GlobalVariableParams = {
    themeCurrent: EThemeColor.Light,
};
