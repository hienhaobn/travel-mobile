import SvgIcons from 'assets/svgs';
import BigNumber from 'bignumber.js';
import Button from 'components/Button/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import { useTheme } from 'hooks/useTheme';
import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchDeposit } from 'states/user/fetchDeposit';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

function DepositScreen() {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [amount, setAmount] = useState<string>('');

    const renderHeader = () => (
        <Header
            showLineBottom
            title='Nạp tiền'
            iconRight={<SvgIcons.IcNote color={getThemeColor().Color_Gray} />}
        />
    );

    const renderBalance = () => {
        return (
            <View style={styles.balanceContainer}>
                <View style={styles.balanceContent}>
                    <Text style={styles.balanceTitle}>Tổng tiền</Text>
                    <Text style={styles.balanceValue}>2.000.000đ</Text>
                </View>
                <View style={styles.balanceContent}>
                    <Text style={styles.balanceTitle}>Đang sử dụng</Text>
                    <Text style={styles.balanceValue}>2.000.000đ</Text>
                </View>
                <View style={styles.balanceContent}>
                    <Text style={styles.balanceTitle}>Còn lại</Text>
                    <Text style={styles.balanceValue}>0</Text>
                </View>
            </View>
        )
    };

    const renderNote = () => (
        <View style={styles.noteContainer}>
            <Text style={styles.noteTitle}>Xin lưu ý</Text>
            <View style={styles.noteContent}>
                <View style={styles.dot}/>
                <Text style={styles.noteText}>Vui lòng gửi số tiền giống với khoản tiền gửi. Nếu gửi số tiền khác với khoản tiền gửi thực tế, giao dịch này sẽ không được xử lý.</Text>
            </View>
            <View style={styles.noteContent}>
                <View style={styles.dot}/>
                <Text style={styles.noteText}>
                    Xin lưu ý đừng quên nhập 'Mã gửi tiền'. Khi gửi tiền, hãy nhập mã gửi tiền làm nội dung chuyển khoản. Vui lòng đảm bảo rằng bạn chỉ sử dụng mã gửi tiền làm nộidung chuyển khoản mà không sử dụng thêm gì khác. Quá trình gửi tiền có thể bị trì hoãn khi bạn không nhập mã tiền gửi.
                </Text>
            </View>
            <View style={styles.noteContent}>
                <View style={styles.dot}/>
                <Text style={styles.noteText}>"Các khoản tiền gửi sẽ được xử lý trong vòng tối đa 10 phút. Trong điều kiện bình thường, thời gian trung bình mất khoảng 3 đến 5 phút để xử lý khoản tiền gửi. Chúng tôi sẽ thông báo cho bạn sau khi khoản tiền gửi đã được xử lý.</Text>
            </View>
            <View style={styles.noteContent}>
                <View style={styles.dot}/>
                <Text style={styles.noteText}>Vui lòng liên hệ với bộ phận hỗ trợ khách hàng của chúng tôi trong trường hợp thanh toán chậm trễ. Nếu số tiền gửi được yêu cầu và số tiền được chuyển khác nhau hoặc bạn quên nhập mã gửi tiền, vui lòng gửi yêu cầu đến trung tâm hỗ trợ của chúng tôi.</Text>
            </View>
            <View style={styles.noteContent}>
                <View style={[styles.dot, { backgroundColor: getThemeColor().red }]}/>
                <Text style={[styles.noteText, { color: getThemeColor().red }]}>Việc rút tiền sẽ bị hạn chế trong thời gian check-in của hệ thống ngân hàng.</Text>
            </View>
        </View>
    );

    const renderInput = () => (
        <Input
            placeholder='Vui lòng nhập số tiền'
            value={amount}
            onChangeText={setAmount}
            containerStyle={styles.input}
        />
    );

    const renderButton = () => (
        <Button
            customStyles={styles.buttonContainer}
            title='Xác nhận'
            onPress={onSubmit}
            disabled={!amount || new BigNumber(amount).isZero()}
        />
    );

    const onSubmit = async () => {
        const response = await fetchDeposit(parseFloat(amount));
        if (response?.statusCode === 200) {
            if(response?.returnValue) {
                console.log('open')
                await Linking.openURL(response?.returnValue);
            }
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

export default DepositScreen;

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
        }
    });
};
