import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SvgIcons from 'assets/svgs';
import Button from 'components/Button/Button';
import Input from 'components/Input';
import { hideLoading, showLoading } from 'components/Loading';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import { ELoginScreenTabKey, LoginScreenRouteProps } from 'screens/login/LoginScreen';
import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';
import { useAppDispatch } from 'states';
import { apiLoginTourGuide, apiLoginUser } from 'states/user';

interface ILoginCommonProps {
  route: LoginScreenRouteProps;
}

const LoginCommon = (props: ILoginCommonProps) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { route } = props;
  const { key } = route;
  const [securePassword, setSecurePassword] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();

  const onLogin = async () => {
    try {
      showLoading();
      if (key === ELoginScreenTabKey.user) {
        await dispatch(apiLoginUser({ email, password }));
      } else {
        await dispatch(apiLoginTourGuide({ email, password }));
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      showCustomToast(error?.response?.data?.info?.message)
      console.log('error', error);
    }
  };

  const renderInputEmail = () => (
    <View>
      <Text style={styles.title}>Email</Text>
      <Input value={email} onChangeText={setEmail} placeholder="Vui lòng nhập email" />
    </View>
  );

  const renderInputPassword = () => {
    const Icon = SvgIcons[`IcVisibility${securePassword ? 'Off' : ''}`];
    return (
      <View style={styles.inputPasswordContainer}>
        <Text style={styles.title}>Mật khẩu</Text>
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Vui lòng nhập mật khẩu"
          secureTextEntry={securePassword}
          icon={<Icon width={scales(15)} height={scales(15)} />}
          onPressIcon={() => setSecurePassword(!securePassword)}
        />
      </View>
    );
  };

  const renderForgotPasswordAndRegister = () => (
    <View style={styles.forgotAndRegisterContainer}>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.register}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );

  const renderButton = () => (
    <Button
      title="Đăng nhập"
      onPress={onLogin}
      customStyles={{ marginTop: scales(30), marginBottom: scales(20) }}
    />
  );

  const renderContent = () => (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.content}
      extraHeight={scales(125)}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      enableOnAndroid>
      {renderInputEmail()}
      {renderInputPassword()}
      {renderForgotPasswordAndRegister()}
      {renderButton()}
    </KeyboardAwareScrollView>
  );

  return <View style={styles.container}>{renderContent()}</View>;
};

export default LoginCommon;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.Color_Bg,
    },
    content: {
      marginHorizontal: scales(15),
    },
    title: {
      ...Fonts.inter400,
      fontSize: scales(14),
      color: color.Text_Dark_1,
      marginBottom: scales(8),
    },
    inputPasswordContainer: {
      marginTop: scales(20),
    },
    forgotAndRegisterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: scales(20),
    },
    forgotPassword: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: color.Text_Dark_1,
      textDecorationLine: 'underline',
    },
    register: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: color.Text_Dark_1,
    },
  });
};
