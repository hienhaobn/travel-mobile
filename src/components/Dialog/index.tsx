import React from 'react';
import { Animated, Keyboard, StyleSheet } from 'react-native';
import RootSiblings from 'react-native-root-siblings';

import Dialog, { DialogProps } from 'components/Dialog/Dialog';
import DropdownItem, { DropdownProps } from 'components/Dialog/DropdownItem';
import TouchableOpacity from 'components/TouchableOpacity';

import { Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

const elements = [];

export default class DialogUtil {
    public static async showDropdown(dropdownConfig: DropdownProps) {
        const {
            width,
            height,
            px,
            py,
            selected,
            data,
            onSelect,
            theme,
            textStyle = {},
            withoutHideKB = false,
            dismissCallback,
        } = dropdownConfig;
        const animated = new Animated.Value(0);
        await animated.setValue(0);
        await Animated.timing(animated, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();

        const isEnoughHeight =
            Sizes.scrHeight - height - data.length * scales(45) - (Sizes.bottomSpace + scales(60)) - scales(5) > py;

        const marginTop = isEnoughHeight ? py + height + scales(5) : py - scales(45) * data.length - scales(5);

        const opacityAnim = animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        const handleDismiss = () => {
            this.dismiss();
            if (dismissCallback) {
                dismissCallback();
            }
        };

        const sibling = new RootSiblings(
            (
                <TouchableOpacity activeOpacity={1} style={styles.dropdownContainer} onPress={handleDismiss}>
                    <Animated.View
                        style={{
                            opacity: opacityAnim,
                            width,
                            backgroundColor: getThemeColor().bgDropdown,
                            marginLeft: px,
                            marginTop,
                            borderRadius: scales(6),
                            overflow: 'hidden',
                        }}>
                        {data.map((item, index) => {
                            return (
                                <DropdownItem
                                    item={item}
                                    selected={selected}
                                    key={index.toString()}
                                    onSelect={onSelect}
                                    onClose={handleDismiss}
                                    textStyle={textStyle}
                                />
                            );
                        })}
                    </Animated.View>
                </TouchableOpacity>
            )
        );

        if (!withoutHideKB) {
            Keyboard.dismiss();
        }
        elements.push(sibling);
    }

    public static async showMessageDialog(dialogConfig: DialogProps) {
        const animated = new Animated.Value(0.1);
        await animated.setValue(0.1);
        await Animated.spring(animated, {
            toValue: 1,
            tension: 65,
            friction: 5,
            useNativeDriver: true,
        }).start();

        const sibling = new RootSiblings(
            (
                <TouchableOpacity activeOpacity={1} style={styles.container} onPress={this.dismiss}>
                    <Animated.View style={{ transform: [{ scale: animated }] }}>
                        <Dialog {...dialogConfig} onClose={this.dismiss} />
                    </Animated.View>
                </TouchableOpacity>
            )
        );

        if (!dialogConfig?.withoutHideKB) {
            Keyboard.dismiss();
        }
        elements.push(sibling);
    }

    public static dismiss() {
        const lastSibling = elements.pop();
        if (lastSibling) {
            lastSibling.destroy();
        }
    }
}

const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, .6)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    container: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, .6)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
});
