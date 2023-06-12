import { useFocusEffect } from '@react-navigation/native';
import { Role } from 'constants/user';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { apiGetAvailableStatus, apiToggleAvailableStatus } from 'states/user/fetchAvailableStatus';
import { useSelectProfile } from 'states/user/hooks';

import { getInfor } from './src/api';
import { goToTourStatus } from './src/utils';


import { goToAccountInfo } from '../accountInfo/src/utils';


import SvgIcons from 'assets/svgs';
import Button from 'components/Button/Button';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import { navigate, resetStack } from 'navigation/utils';
import { useAppDispatch } from 'states';
import { logout } from 'states/user';
import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import Storages, { KeyStorage } from 'utils/storages';


const AccountScreen = () => {
  const { theme } = useTheme();
  const styles = myStyles(theme);

  const [role, setRole] = React.useState('');
  const [availableStatus, setAvailableStatus] = useState<boolean>(false);
  const profileMe = useSelectProfile();
  const dispatch = useAppDispatch();
  const profile = useSelectProfile();

  useFocusEffect(useCallback(() => {
    if (profile.role === 'TOURGUIDE') {
      getAvailableStatus();
    }
  }, []));

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getInfor();
        setRole(response.role);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();

  }, []);

  const getAvailableStatus = async () => {
    const response: boolean = await apiGetAvailableStatus();
    setAvailableStatus(response);
  };

  const onToggleAvailableStatus = async () => {
    setAvailableStatus(!availableStatus);
    await apiToggleAvailableStatus(!availableStatus);
  };

  const onLogOut = () => {
    dispatch(logout());
    Storages.remove(KeyStorage.Token);
    resetStack('Login');
  };

  return (
    role ?
      <View style={styles.container}>
        <ScrollView
          style={styles.wrapperContent}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.itemsContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.titleHeader}>Tài khoản</Text>
              {
                profileMe?.role === Role.TOURGUIDE && (
                  <Switch
                    trackColor={{ false: getThemeColor().Text_Dark_5, true: getThemeColor().Color_Primary }}
                    thumbColor={getThemeColor().white}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={onToggleAvailableStatus}
                    value={availableStatus}
                  />
                )
              }
            </View>
            <TouchableOpacity style={styles.itemContainer} onPress={goToAccountInfo}>
              <View style={styles.itemLeftContainer}>
                <View>
                  <SvgIcons.IcUserInfo
                    width={scales(30)}
                    height={scales(30)}
                    color={getThemeColor().Text_Dark_1}
                  />
                </View>
                <Text style={styles.title}>Thông tin tài khoản</Text>
              </View>
              <SvgIcons.IcForward
                width={scales(15)}
                height={scales(15)}
                color={getThemeColor().Text_Dark_1}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer} onPress={goToTourStatus}>
              <View style={styles.itemLeftContainer}>
                <View>
                  <SvgIcons.IcTourAccount
                    width={scales(30)}
                    height={scales(30)}
                    color={getThemeColor().Text_Dark_1}
                  />
                </View>
                <Text style={styles.title}>Chuyến đi</Text>
              </View>
              <SvgIcons.IcForward
                width={scales(15)}
                height={scales(15)}
                color={getThemeColor().Text_Dark_1}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigate('Payment')}>
              <View style={styles.itemLeftContainer}>
                <View>
                  <SvgIcons.IcWallet
                    width={scales(30)}
                    height={scales(30)}
                    color={getThemeColor().Text_Dark_1}
                  />
                </View>
                <Text style={styles.title}>Phương thức thanh toán</Text>
              </View>
              <SvgIcons.IcForward
                width={scales(15)}
                height={scales(15)}
                color={getThemeColor().Text_Dark_1}
              />
            </TouchableOpacity>
            {role === 'USER' ? <TouchableOpacity style={styles.itemContainer} onPress={() => navigate('Voucher')}>
              <View style={styles.itemLeftContainer}>
                <View>
                  <SvgIcons.IcVoucher
                    width={scales(30)}
                    height={scales(30)}
                    color={getThemeColor().Text_Dark_1}
                  />
                </View>
                <Text style={styles.title}>Mã giảm giá</Text>
              </View>
              <SvgIcons.IcForward
                width={scales(15)}
                height={scales(15)}
                color={getThemeColor().Text_Dark_1}
              />
            </TouchableOpacity> : null}
            {/* <TouchableOpacity style={styles.itemContainer} onPress={() => navigate('Voucher')}>
              <View style={styles.itemLeftContainer}>
                <View>
                  <SvgIcons.IcVoucher
                    width={scales(30)}
                    height={scales(30)}
                    color={getThemeColor().Text_Dark_1}
                  />
                </View>
                <Text style={styles.title}>Yêu cầu chuyến đi</Text>
              </View>
              <SvgIcons.IcForward
                width={scales(15)}
                height={scales(15)}
                color={getThemeColor().Text_Dark_1}
              />
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigate('Voucher')}>
              <View style={styles.itemLeftContainer}>
                <View>
                  <SvgIcons.IcForgotPassword
                    width={scales(30)}
                    height={scales(30)}
                    color={getThemeColor().Text_Dark_1}
                  />
                </View >
                <Text style={styles.title}>Đổi mật khẩu</Text>
              </View >
              <SvgIcons.IcForward
                width={scales(15)}
                height={scales(15)}
                color={getThemeColor().Text_Dark_1}
              />
            </TouchableOpacity >
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigate('Login')}>
              <View style={styles.itemLeftContainer}>
                <View>
                  <SvgIcons.IcMessageQuestion
                    width={scales(30)}
                    height={scales(30)}
                    color={getThemeColor().Text_Dark_1}
                  />
                </View>
                <Text style={styles.title}>Trung tâm hỗ trợ</Text>
              </View>
              <SvgIcons.IcForward
                width={scales(15)}
                height={scales(15)}
                color={getThemeColor().Text_Dark_1}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemContainer} onPress={onLogOut}>
              <View style={styles.itemLeftContainer}>
                <View>
                  <SvgIcons.IcLogout
                    width={scales(25)}
                    height={scales(25)}
                    color={getThemeColor().Text_Dark_1}
                  />
                </View>
                <Text style={styles.title}>Đăng xuất</Text>
              </View>
              <SvgIcons.IcForward
                width={scales(15)}
                height={scales(15)}
                color={getThemeColor().Text_Dark_1}
              />
            </TouchableOpacity>
          </View >
        </ScrollView >
      </View > : null
  );
};

const myStyles = (themeCurrent: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.Color_Bg,
    },
    wrapperContent: {
      flexGrow: 1,
      paddingHorizontal: scales(15),
    },
    contentContainer: {
      paddingBottom: scales(30),
      paddingTop: scales(20),
    },
    itemsContainer: {
      marginTop: scales(30),
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: scales(15),
    },
    itemIconLeft: {
      width: scales(30),
      height: scales(30),
    },
    itemLeftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_1,
      marginLeft: scales(15),
    },
    line: {
      borderWidth: 0.5,
      borderColor: color.Text_Dark_5,
      marginBottom: scales(15),
    },
    button: {
      marginHorizontal: scales(15),
      marginBottom: scales(15),
    },
    titleHeader: {
      ...Fonts.inter700,
      fontSize: scales(24),
      color: color.Text_Dark_1,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: scales(30),
    },
  });
};

export default AccountScreen;
