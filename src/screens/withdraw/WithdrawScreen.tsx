import BigNumber from 'bignumber.js';

import React, { useState } from 'react';

import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

import SvgIcons from 'assets/svgs';
import Button from 'components/Button/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import { useTheme } from 'hooks/useTheme';


import { fetchDeposit } from 'states/user/fetchDeposit';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { useFetchMe, useSelectProfile } from 'states/user/hooks';
import { formatCurrency } from 'utils/number';
import { createWithdrawReq } from './src/api';
import { showCustomToast } from 'utils/toast';

function WithdrawScreen() {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const [amount, setAmount] = useState<string>('');
  const profile = useSelectProfile();

  const renderHeader = () => (
    <Header
      showLineBottom
      title='Tạo yêu cầu rút tiền'
      iconRight={<SvgIcons.IcNote color={getThemeColor().Color_Gray} />}
    />
  );
  const renderBalance = () => {
    return (
      <View style={styles.balanceContainer}>
        <View style={styles.balanceContent}>
          <Text style={styles.balanceTitle}>Số dư tài khoản</Text>
          <Text style={styles.balanceValue}>{formatCurrency(profile.availableBalance)} VNĐ</Text>
        </View>
      </View>
    )
  };

  const renderNote = () => (
    <View style={styles.noteContainer}>
      <Text style={styles.noteTitle}>Xin lưu ý</Text>
      <View style={styles.noteContent}>
        <View style={styles.dot} />
        <Text style={styles.noteText}>Vui lòng nhập số tiền muốn rút, sau khi nhận được yêu cầu, đội ngũ quản trị viên sẽ xử lý yêu cầu của bạn sớm nhất có thể.</Text>
      </View>
      <View style={styles.noteContent}>
        <View style={styles.dot} />
        <Text style={styles.noteText}>
          Giới hạn rút tiền: từ 50.000đ đến 5.000.000đ trên một lần rút.
        </Text>
      </View>
      <View style={styles.noteContent}>
        <View style={styles.dot} />
        <Text style={styles.noteText}>
          Nếu cần hỗ trợ, bạn vui lòng liên lạc: 0388.476.663 hoặc qua email: nvdcodinglife@gmail.com để được hỗ trợ sớm nhất có thể.
        </Text>
      </View>
      <View style={styles.noteContent}>
        <View style={styles.dot} />
        <Text style={styles.noteText}>Vui lòng liên hệ với bộ phận hỗ trợ khách hàng của chúng tôi trong trường hợp thanh toán chậm trễ. Nếu số tiền gửi được yêu cầu và số tiền được chuyển khác nhau hoặc bạn quên nhập mã gửi tiền, vui lòng gửi yêu cầu đến trung tâm hỗ trợ của chúng tôi.</Text>
      </View>
      <View style={styles.noteContent}>
        <View style={[styles.dot, { backgroundColor: getThemeColor().red }]} />
        <Text style={[styles.noteText, { color: getThemeColor().red }]}>Việc rút tiền sẽ bị hạn chế trong thời gian check-in của hệ thống ngân hàng.</Text>
      </View>
    </View>
  );

  const renderInput = () => (
    <Input
      placeholder='Vui lòng nhập số tiền muốn rút'
      value={amount}
      onChangeText={setAmount}
      containerStyle={styles.input}
    />
  );

  const renderButton = () => (
    <Button
      customStyles={styles.buttonContainer}
      title='Tạo yêu cầu'
      onPress={onSubmit}
      disabled={!amount || new BigNumber(amount).isZero() || +amount < 50000 || +amount > +profile.availableBalance || +amount > 5000000}
    />
  );

  const onSubmit = async () => {
    const response = await createWithdrawReq(+amount);
    if (response?.statusCode === 200) {
      showCustomToast('Tạo yêu cầu thành công, vui lòng chờ quản trị viên duyệt');
      useFetchMe();

    } else {
      showCustomToast('Tạo yêu cầu thất bại')
    }
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {renderBalance()}
        {renderInput()}
        {renderButton()}
        {renderNote()}
      </ScrollView>
    </View>
  );
}

export default WithdrawScreen;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.Color_Bg,
    },
    content: {
      flexGrow: 1,
      paddingBottom: Sizes.bottomSpace + scales(10),

    },
    balanceContainer: {
      borderColor: color.Text_Dark_5,
      borderBottomWidth: 0.2,
      paddingBottom: scales(15),
      paddingHorizontal: scales(15),
    },
    balanceContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: scales(15),
    },
    balanceTitle: {
      ...Fonts.inter400,
      fontSize: scales(14),
      color: color.Text_Dark_4,
    },
    balanceValue: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: color.Text_Dark_2,
    },
    noteContainer: {
      paddingHorizontal: scales(15),
    },
    noteTitle: {
      ...Fonts.inter700,
      fontSize: scales(14),
      color: getThemeColor().Text_Dark_2,
    },
    noteContent: {
      flexDirection: 'row',
      paddingTop: scales(10),
    },
    dot: {
      width: scales(5),
      height: scales(5),
      borderRadius: scales(25),
      marginTop: scales(6),
      backgroundColor: color.Text_Dark_1,
    },
    noteText: {
      paddingLeft: scales(7),
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_4,
    },
    buttonContainer: {
      marginHorizontal: scales(15),
      marginTop: scales(5),
      marginBottom: scales(30),
      backgroundColor: color.Color_Gray5,
    },
    input: {
      paddingHorizontal: scales(15),
      marginVertical: scales(15),
    },
  });
};
