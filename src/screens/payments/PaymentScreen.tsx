/* eslint-disable complexity */
import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { goToDeposit } from 'screens/deposit/src/utils';
import { goToWithdraw } from 'screens/withdraw/src/utils';
import { useSelectProfile } from 'states/user/hooks';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { formatCurrency } from 'utils/number';
import { scales } from 'utils/scales';
import { getTransaction } from './src/api';

interface IPaymentScreenProps {

}
function getStatus(status: number) {
  if (status === 1) {
    return 'Thành công';
  } else if (status === 0) {
    return 'Thất bại';
  } else if (status === 2) {
    return 'Đang chờ thanh toán';
  } else {
    return 'Chờ quản trị viên duyệt';
  }
}

function getType(type: string) {
  switch (type) {
    case 'DEPOSIT':
      return 'Nạp tiền';
      break;
    case 'WITHDRAW':
      return 'Rút tiền';
      break;

    case 'PAY_ORDER':
      return 'Thanh toán chuyến đi';
      break;

    case 'USER_PREPAID_ORDER':
      return 'Đặt cọc chuyến đi';
      break;

    case 'TOURGUIDE_APPROVE_ORDER':
      return 'Đặt cọc chuyến đi'
      break;

    case 'TOURGUIDE_RECEIVE_ORDER':
      return 'Thu phí chuyến đi'
      break;

    case 'CANCEL_ORDER':
      return 'Hủy chuyến'
      break;

    case 'BACK_PREPAID':
      return 'Hoàn tiền cọc'
      break;
    case 'BACK_ORDER':
      return 'Hoàn tiền chuyến đi'
      break;
    case 'PROFIT_SYSTEM':
      return 'Doanh thu hệ thống'
      break;

    default:
      break;
  }
}
function PaymentScreen(props: IPaymentScreenProps) {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { } = props;
  const profile = useSelectProfile();
  const [transactions, setTransactions] = React.useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const { returnValue } = await getTransaction();
        setTransactions(returnValue.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);
  const renderPaymentHistoryItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.price_t}>{getType(item.item.type)}</Text>
          <View style={[styles.row, styles.positionBetween]}>
            <Text style={styles.price}>{formatCurrency(item.item.amount)} VNĐ</Text>
            <Text style={styles.statusTxt}>{getStatus(+item.item.status)}</Text>
          </View>
          <Text style={styles.date}>{item.item.updatedAt.split('T')[0].split('-').reverse().join('-')}</Text>
        </View>
      </View>
    );
  }

  const renderContent = () => (
    <View style={styles.content}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.depositContainer} onPress={goToDeposit}>
          <Text style={styles.titlePayment}>Nạp tiền</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.withdrawContainer} onPress={goToWithdraw}>
          <Text style={styles.titlePayment}>Rút tiền</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    transactions ?
      <View style={styles.container}>
        <Header title='Phương thức thanh toán' />
        {renderContent()}
        <Text style={styles.titleHistory}>Lịch sử thanh toán</Text>
        <FlatList
          data={transactions}
          style={styles.wrapperContent}
          renderItem={(item) => renderPaymentHistoryItem(item)}
          contentContainerStyle={styles.historyContainer}
          showsVerticalScrollIndicator={false}
        />
      </View> : null
  );
}

export default PaymentScreen;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.Color_Bg,
    },
    content: {
      marginHorizontal: scales(15),
      marginTop: scales(10),
    },
    wrapperContent: {
      flexGrow: 1,
      marginHorizontal: scales(15),
    },
    historyContainer: {
      paddingBottom: scales(30),
      marginTop: scales(10),
    },
    depositContainer: {
      paddingVertical: scales(18),
      paddingHorizontal: scales(35),
      backgroundColor: getThemeColor().Color_Primary,
      elevation: 10,
      shadowOffset: {
        width: 1,
        height: 0.5,
      },
      shadowOpacity: 0.1,
      borderRadius: scales(5),
    },
    withdrawContainer: {
      paddingVertical: scales(18),
      paddingHorizontal: scales(35),
      elevation: 10,
      shadowOffset: {
        width: 1,
        height: 0.5,
      },
      shadowOpacity: 0.1,
      backgroundColor: getThemeColor().Color_Bg,
      marginLeft: scales(15),
      borderRadius: scales(5),
    },
    titlePayment: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: color.Text_Dark_1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: scales(5)
    },
    statusTxt: {
      ...Fonts.inter600,
      fontSize: scales(12),
      color: color.primary1,
    },
    positionBetween: {
      justifyContent: 'space-between',
    },
    titleHistory: {
      ...Fonts.inter600,
      fontSize: scales(16),
      color: color.Text_Dark_1,
      marginTop: scales(20),
      marginHorizontal: scales(15),
    },
    price: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: color.Text_Dark_1,
      lineHeight: scales(19),
    },
    price_t: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: color.Color_Red,
      lineHeight: scales(19),
    },
    date: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Color_Gray,
      lineHeight: scales(19),
    },
    itemContainer: {
      marginTop: scales(10),
    },
  });
};
