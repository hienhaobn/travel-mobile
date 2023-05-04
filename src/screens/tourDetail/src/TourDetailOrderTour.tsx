import BigNumber from 'bignumber.js';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

import { apiPostOrder } from '../../locationDetail/src/api';

import SvgIcons from 'assets/svgs';

import Button from 'components/Button/Button';
import DialogUtil from 'components/Dialog';
import { DropdownProps } from 'components/Dialog/DropdownItem';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { formatCurrency } from 'utils/number';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';
import { goBack } from 'navigation/utils';

interface TourDetailOrderTourProps {
    tour: tour.Tour;
    vouchers: user.Voucher[];
    dismissBottomSheet: () => void;
}

const TourDetailOrderTour = (props: TourDetailOrderTourProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { tour, dismissBottomSheet, vouchers } = props;
    const [voucher, setVoucher] = useState<string>('');
    const [selectDateVisible, setSelectDateVisible] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<Date>(moment().subtract(7, 'days').toDate());
    const [countAdult, setCountAdult] = useState<number>(0);
    const [isVisibleDropDownType, setIsVisibleDropDownType] = useState<boolean>(false);

    const dropdownVoucher = useRef<View>(null);

    const renderHeader = () => (
        <View style={styles.headerView}>
            <Text style={styles.headerText}>{tour?.name}</Text>
        </View>
    );

    const getVoucherByDiscountName = (): user.Voucher => {
        if (voucher) {
            return vouchers?.find(element => element?.name === voucher);
        }
    };

    const onShowSelectDate = () => {
        setSelectDateVisible(true);
    };

    const renderSelectTime = () => (
        <View style={styles.selectTimeContainer}>
            <Text style={styles.titleContentSheet}>Ngày</Text>
            <View style={styles.selectDateContainer}>
                <TouchableOpacity style={styles.dateContainer} onPress={onShowSelectDate}>
                    <Text style={styles.dateText}>{moment(startTime).format('YYYY-MM-DD')}</Text>
                </TouchableOpacity>
                <Text style={styles.textTo}>đến</Text>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                        {moment(startTime)
                            .subtract(tour?.tourSchedule?.length + 1, 'days')
                            .format('YYYY-MM-DD')}
                    </Text>
                </View>
            </View>
        </View>
    );

    const onShowDropdown = () => {
        dropdownVoucher.current.measure((x, y, width, height, px, py) => {
            const dropdownConfig: DropdownProps = {
                width,
                height,
                px,
                py: py + scales(5),
                selected: voucher,
                data: vouchers?.map((element) => element.name),
                onSelect: setVoucher,
                theme,
                dismissCallback: () => setIsVisibleDropDownType(false),
            };
            DialogUtil.showDropdown(dropdownConfig).catch();
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const onChangeCountAdult = (type: 'increase' | 'decrease') => {
        if (type === 'increase' && countAdult < parseInt(tour?.maxMember)) {
            setCountAdult(countAdult + 1);
        }
        if (type === 'decrease' && countAdult > 0) {
            setCountAdult(countAdult - 1);
        }
    };

    const onConfirm = async () => {
        try {
            dismissBottomSheet();
            if (countAdult === 0) {
                showCustomToast('Vui lòng chọn số người');
                return;
            }
            const response = await apiPostOrder({
                tourId: tour?.id,
                numberOfMember: new BigNumber(countAdult).toNumber(),
                startDate: moment(startTime).format('YYYY-MM-DD'),
            });
            if (response?.statusCode === 201 || response?.statusCode === 200) {
                // TODO: call api fetch data tour
                showCustomToast('Đặt tour thành công');
                goBack();
            } else {
                showCustomToast('Đặt tour thất bại');
            }
        } catch (error) {
            dismissBottomSheet();
            showCustomToast('Đặt tour thất bại');
            console.log('error tour order', error.message);
        }
    };

    const onReset = () => {
        setStartTime(new Date());
        setEndTime(moment().subtract(tour?.tourSchedule?.length, 'days').toDate());
    };

    const renderButtons = () => (
        <View style={styles.groupButtonContainer}>
            <Button
                title={'Cài lại'}
                customStyles={styles.buttonCancel}
                disableGradient
                onPress={onReset}
                customTextStyles={styles.textReset}
            />
            <Button title={'Xác nhận'} customStyles={styles.buttonConfirm} onPress={onConfirm} />
        </View>
    );

    const onConfirmDate = (value: Date) => {
        setStartTime(value);
        setEndTime(moment(value).subtract(tour?.tourSchedule?.length, 'days').toDate());
        setSelectDateVisible(false);
    };

    const onCancel = () => setSelectDateVisible(false);

    const renderDatePicker = () => (
        <DatePicker
            modal
            mode="date"
            open={selectDateVisible}
            theme={'light'}
            date={startTime}
            onConfirm={onConfirmDate}
            onCancel={onCancel}
            title={null}
            confirmText={'Xác nhận'}
            cancelText={'Huỷ'}
        />
    );

    const renderCountPerson = () => (
        <View>
            <View style={styles.row}>
                <Text style={styles.titleCount}>Số lượng người</Text>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.decreaseContainer} onPress={() => onChangeCountAdult('decrease')}>
                        <Text style={styles.decreaseTxt}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.count}>{countAdult}</Text>
                    <TouchableOpacity style={styles.increaseContainer} onPress={() => onChangeCountAdult('increase')}>
                        <Text style={styles.increaseTxt}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderPrice = () => {
        const discount = getVoucherByDiscountName();
        const result = BigNumber(tour?.basePrice).minus(discount?.value || 0).toNumber();
        return (
            <View style={styles.priceContainer}>
                <View style={styles.itemPriceContainer}>
                    <Text style={styles.titlePrice}>Tiền chuyến đi</Text>
                    <Text style={styles.valuePrice}>{formatCurrency(tour?.basePrice)}đ</Text>
                </View>
                {discount ? (
                    <View style={styles.itemPriceContainer}>
                        <Text style={styles.titlePrice}>Giảm</Text>
                        <Text style={styles.valuePrice}>{formatCurrency(discount?.value)}đ</Text>
                    </View>
                ) : null}

                <View style={styles.itemPriceContainer}>
                    <Text style={styles.titlePrice}>Thành tiền</Text>
                    <Text style={styles.valuePrice}>{formatCurrency(result)}đ</Text>
                </View>
            </View>
        );
    };

    const renderVoucher = () => (
        <View style={styles.dropdownContainer}>
            <Text style={styles.titlePrice}>Voucher</Text>
            <View ref={dropdownVoucher} style={styles.dropdownSelectedContainer} collapsable={false}>
                <TouchableOpacity style={styles.dropdownButton} onPress={onShowDropdown}>
                    <Text style={styles.dropdownText}>{voucher ? voucher : 'Voucher'}</Text>
                    <View style={isVisibleDropDownType ? { transform: [{ rotate: '180deg' }] } : {}}>
                        <SvgIcons.IcDownReward
                            color={getThemeColor().Text_Dark_2}
                            width={scales(12)}
                            height={scales(10)}
                            scaleX={-1}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderSelectTime()}
            {renderCountPerson()}
            {renderVoucher()}
            {renderPrice()}
            {renderButtons()}
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
            {renderDatePicker()}
        </View>
    );
};

export default TourDetailOrderTour;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            backgroundColor: color.white,
            borderTopLeftRadius: scales(15),
            borderTopRightRadius: scales(15),
        },
        content: {
            marginHorizontal: scales(15),
            paddingBottom: Sizes.bottomSpace + scales(20),
        },
        headerView: {
            height: scales(50),
            justifyContent: 'center',
            paddingHorizontal: scales(15),
            borderBottomWidth: scales(1),
            borderBottomColor: color.Text_Color_Opacity_5,
        },
        headerText: {
            ...Fonts.inter600,
            fontSize: scales(18),
            color: color.Text_Dark_1,
            lineHeight: 21,
        },
        selectTimeContainer: {
            paddingBottom: scales(15),
            borderBottomWidth: scales(1),
            borderBottomColor: color.Text_Color_Opacity_5,
        },
        selectDateContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        dateContainer: {
            flex: 1,
            padding: scales(12),
            backgroundColor: color.Color_Gray2,
            borderRadius: scales(6),
        },
        dateText: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        textTo: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginHorizontal: scales(10),
        },
        groupButtonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: scales(15),
        },
        buttonCancel: {
            flex: 1,
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: color.Text_Dark_5,
        },
        buttonConfirm: {
            flex: 1,
            marginLeft: scales(15),
        },
        textReset: {
            color: color.Text_Dark_1,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        count: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            paddingHorizontal: scales(20),
        },
        decreaseContainer: {
            backgroundColor: color.Color_Primary,
            width: scales(25),
            height: scales(25),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scales(100),
        },
        decreaseTxt: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        increaseContainer: {
            backgroundColor: color.Color_Primary,
            width: scales(25),
            height: scales(25),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scales(100),
        },
        increaseTxt: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        titleContentSheet: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
            marginBottom: scales(15),
        },
        titleCount: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        priceContainer: {
            marginTop: scales(15),
        },
        itemPriceContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: scales(8),
        },
        titlePrice: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        valuePrice: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        dropdownContainer: {
            paddingTop: scales(20),
        },
        dropdownSelectedContainer: {
            marginTop: scales(8),
        },
        dropdownButton: {
            flexDirection: 'row',
            height: scales(45),
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: scales(15),
            borderColor: color.Text_Dark_4,
            borderWidth: scales(1),
            borderRadius: scales(5),
        },
        dropdownText: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
    });
};
