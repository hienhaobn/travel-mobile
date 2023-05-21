import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, StyleSheet, Text, TextStyle } from 'react-native';

import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

export interface DropdownProps {
    width: number;
    height: number;
    px: number;
    py: number;
    selected: string;
    data: string[];
    onSelect: (val: string) => void;
    theme: string;
    textStyle?: TextStyle;
    withoutHideKB?: boolean;
    dismissCallback?: () => void;
}

export interface DropdownItemProps {
    item: string;
    selected: string;
    onSelect: (val: string) => void;
    onClose: () => void;
    textStyle?: TextStyle;
}

const DropdownItem = (props: DropdownItemProps) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const styles = myStyles(theme);
    const { item, selected, onSelect, onClose, textStyle = {} } = props;

    useEffect(() => {
        const backAction = () => {
            onClose();
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, []);

    const onSelectItem = () => {
        onSelect(item);
        onClose();
    };

    return (
        <TouchableOpacity
            onPress={onSelectItem}
            style={[styles.container, selected === item ? { backgroundColor: getThemeColor().bgDropdownActive } : {}]}>
            <Text
                numberOfLines={1}
                style={[styles.text, textStyle, selected === item ? { color: getThemeColor().Text_Dark_1 } : {}]}>
                {t(item)}
            </Text>
        </TouchableOpacity>
    );
};

export default DropdownItem;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            height: scales(45),
            justifyContent: 'center',
            paddingHorizontal: scales(8),
        },
        text: {
            ...Fonts.inter400,
            color: color.Text_Dark_1,
            fontSize: scales(14),
        },
    });
};
