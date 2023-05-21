import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Image, ImageURISource, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

import Images from 'assets/images';

import Button from 'components/Button/Button';

import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

export enum DialogType {
  one = 'One Button',
  two = 'Two Button',
}

export interface DialogProps {
  isConfirm?: boolean;
  type?: DialogType;
  icon?: ImageURISource;
  title?: string;
  message?: string;
  textButtonClose?: string;
  textButtonConfirm?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  renderContent?: React.ReactElement;
  withoutHideKB?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
}

const Dialog = (props: DialogProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = myStyles(theme);
  const {
    isConfirm = false,
    type = DialogType.one,
    icon,
    title,
    message,
    textButtonClose,
    textButtonConfirm,
    onClose,
    onConfirm,
    renderContent,
    titleStyle,
    messageStyle,
  } = props;

  useEffect(() => {
    const backAction = () => {
      onClose();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const renderIcon = () => {
    if (icon) {
      return (
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} />
        </View>
      );
    }
    const iconConfirmation = Images[`CONFIRMATION${isConfirm ? '' : '_SUCCESS'}_${theme.toUpperCase()}`];
    return (
      <View style={styles.iconContainer}>
        <Image source={iconConfirmation} style={styles.icon} />
      </View>
    );
  };

  const renderTitle = () => (title ? <Text style={[styles.title, titleStyle]}>{title}</Text> : null);

  const renderMessage = () => (message ? <Text style={[styles.message, messageStyle]}>{message}</Text> : null);

  const renderButton = () => {
    switch (type) {
      case DialogType.two:
        return (
          <View style={styles.viewButton}>
            {renderButtonClose()}
            {renderButtonConfirm()}
          </View>
        );
      case DialogType.one:
      default:
        return <View style={styles.viewButton}>{renderButtonConfirm()}</View>;
    }
  };

  const renderButtonClose = () => (
    <Button
      title={textButtonClose || t('close')}
      customStyles={styles.buttonClose}
      customTextStyles={styles.buttonTextClose}
      onPress={onClose}
      disableGradient
    />
  );

  const renderButtonConfirm = () => (
    <Button
      title={textButtonConfirm || 'OK'}
      customStyles={styles.button}
      customTextStyles={styles.buttonText}
      onPress={onConfirm}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderIcon()}
        {renderTitle()}
        {renderMessage()}
        {renderContent}
        {renderButton()}
      </View>
    </View>
  );
};

export default Dialog;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginHorizontal: scales(40),
      backgroundColor: color.Color_Bg_Separator,
      padding: scales(15),
      borderRadius: scales(6),
    },
    content: {
      flex: 1,
      alignItems: 'center',
    },
    iconContainer: {
      paddingBottom: scales(10),
    },
    icon: {
      width: scales(50),
      height: scales(50),
    },
    title: {
      ...Fonts.inter600,
      fontSize: scales(16),
      color: color.Text_Dark_1,
      textAlign: 'center',
      paddingBottom: scales(10),
    },
    message: {
      ...Fonts.inter400,
      fontSize: scales(14),
      color: color.Text_Dark_1,
      textAlign: 'center',
    },
    button: {
      flex: 1,
      marginTop: scales(25),
    },
    buttonText: {
      color: color.black,
    },
    buttonClose: {
      flex: 1,
      marginTop: scales(25),
      marginRight: scales(15),
      borderWidth: scales(1),
      borderColor: color.Text_Color_Opacity_30,
    },
    buttonTextClose: {
      color: color.Text_Dark_1,
    },
    viewButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
};
