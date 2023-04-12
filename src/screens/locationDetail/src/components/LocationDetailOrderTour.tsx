import BigNumber from 'bignumber.js';
import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

import { apiPostOrder } from '../api';

import Button from 'components/Button/Button';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';

interface LocationDetailOrderTourProps {
    tour: tour.Tour;
    dismissBottomSheet: () => void;
}

const LocationDetailOrderTour = (props: LocationDetailOrderTourProps) => {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { tour, dismissBottomSheet } = props;
    const fromDateDefault = moment().subtract(7, 'days').toDate();
    const toDateDefault = moment().toDate();
    const [selectDateVisible, setSelectDateVisible] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<Date>(moment().subtract(7, 'days').toDate());
    const [countAdult, setCountAdult] = useState<number>(0);
    const [countChildren, setCountChildren] = useState<number>(0);

    const renderHeader = () => (
        <View style={styles.headerView}>
            <Text style={styles.headerText}>{tour?.name}</Text>
        </View>
    );

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
                    <Text style={styles.dateText}>{moment(endTime).format('YYYY-MM-DD')}</Text>
                </View>
            </View>
        </View>
    );

    const onConfirm = async () => {
        try {
            const response = await apiPostOrder({
                tourId: tour?.id,
                numberOfMember: new BigNumber(countAdult).plus(countChildren).toNumber(),
                price: parseFloat(tour.basePrice),
                startDate: moment(startTime).format('YYYY-MM-DD'),
            });
            dismissBottomSheet();
            if (response?.status === 201) {
                showCustomToast('Đặt tour thành công');
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
        setStartTime(fromDateDefault);
        setEndTime(toDateDefault);
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
        setEndTime(moment(value).subtract(7, 'days').toDate());
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

    const onChangeCountAdult = (type: 'increase' | 'decrease') => {
        if (type === 'increase' && countAdult + countChildren < parseInt(tour?.maxMember)) {
            setCountAdult(countAdult + 1);
        }
        if (type === 'decrease' && countAdult > 0) {
            setCountAdult(countAdult - 1);
        }
    };

    const onChangeCountChildren = (type: 'increase' | 'decrease') => {
        if (type === 'increase' && countChildren + countAdult < parseInt(tour?.maxMember)) {
            setCountChildren(countChildren + 1);
        }
        if (type === 'decrease' && countChildren > 0) {
            setCountChildren(countChildren - 1);
        }
    };

    const renderCountPerson = () => (
        <View>
            <Text style={styles.titleContentSheet}>Số lượng người</Text>
            <View style={styles.row}>
                <Text style={styles.titleCount}>Người lớn</Text>
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
            <View style={[styles.row, styles.childrenContainer]}>
                <Text style={styles.titleCount}>Trẻ em</Text>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.decreaseContainer}
                        onPress={() => onChangeCountChildren('decrease')}>
                        <Text style={styles.decreaseTxt}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.count}>{countChildren}</Text>
                    <TouchableOpacity
                        style={styles.increaseContainer}
                        onPress={() => onChangeCountChildren('increase')}>
                        <Text style={styles.increaseTxt}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderPrice = () => (
        <View style={styles.priceContainer}>
            <View style={styles.itemPriceContainer}>
                <Text style={styles.titlePrice}>Tiền tour</Text>
                <Text style={styles.valuePrice}>2,300,000</Text>
            </View>
            <View style={styles.itemPriceContainer}>
                <Text style={styles.titlePrice}>Giảm</Text>
                <Text style={styles.valuePrice}>2,300,000</Text>
            </View>
            <View style={styles.itemPriceContainer}>
                <Text style={styles.titlePrice}>Thành tiền</Text>
                <Text style={styles.valuePrice}>2,300,000</Text>
            </View>
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            {renderSelectTime()}
            {renderCountPerson()}
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

export default LocationDetailOrderTour;

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
        childrenContainer: {
            marginTop: scales(15),
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
    });
};
