import Header from 'components/Header';
import TouchableOpacity from 'components/TouchableOpacity';
import { useTheme } from 'hooks/useTheme';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { goToDeposit } from 'screens/deposit/src/utils';
import { goToWithdraw } from 'screens/withdraw/src/utils';
import { useSelectProfile } from 'states/user/hooks';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface IPaymentScreenProps {

}

function PaymentScreen(props: IPaymentScreenProps) {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const {} = props;
    const profile = useSelectProfile();

    const renderPaymentHistoryItem = () => (
        <View style={styles.itemContainer}>
            <View>
                <View style={[styles.row, styles.positionBetween]}>
                    <Text style={styles.price}>2.000.000đ</Text>
                    <Text style={styles.statusTxt}>Hoàn thành</Text>
                </View>
                <Text style={styles.date}>15/05/2023</Text>
            </View>
        </View>
    );

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
        <View style={styles.container}>
            <Header title='Phương thức thanh toán' />
            {renderContent()}
            <Text style={styles.titleHistory}>Lịch sử thanh toán</Text>
            <FlatList
                data={[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]}
                style={styles.wrapperContent}
                renderItem={renderPaymentHistoryItem}
                contentContainerStyle={styles.historyContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
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
