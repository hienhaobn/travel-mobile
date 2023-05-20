import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from 'components/Button/Button';

import Header from 'components/Header';

import { ETourTypesValue } from 'constants/tours';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';

import TourDetailImages from 'screens/tourDetail/src/components/TourDetailImages';

import { fetchTourById } from 'states/tours/fetchTours';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { formatCurrency } from 'utils/number';
import { scales } from 'utils/scales';
import { color } from 'react-native-reanimated';

interface ITourStatusDetailScreenProps {
  route: RouteProp<RootNavigatorParamList, 'TourStatusDetail'>;
}

const TourStatusDetailScreen = (props: ITourStatusDetailScreenProps) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { route } = props;
  const { order } = route.params;
  const { tour } = order;
  const [tourDetail, setTourDetail] = useState<tour.Tour>(null);
  const getTourById = async () => {
    const response = await fetchTourById(tour.id);
    setTourDetail(response);
  };

  useEffect(() => {
    getTourById();
  }, []);

  const renderContent = () => (
    <ScrollView>
      <View style={styles.content}>
        <Text style={styles.tourName}>{tour?.name}</Text>
        <View>
          <View style={styles.rateContainer}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View>
                <View style={styles.voteContainer}>
                  <Text style={styles.textBold}>9</Text>
                </View>
                <View style={styles.voteBka} />
              </View>
              <View
                style={{
                  marginLeft: scales(8),
                }}>
                <Text style={styles.rate}>{tour.rates ? tour.rates.length : 0} lượt đánh giá</Text>
                <Text style={styles.care}>{tour.rates ? tour.rates.length : 0} quan tâm</Text>
              </View>
            </View>
            <View style={styles.typeContainer}>
              <Text style={styles.desc}>{ETourTypesValue[tourDetail?.type]}</Text>
            </View>
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.desc}>
              Số người tối đa: <Text style={styles.textBold}>{tourDetail?.maxMember}</Text>
            </Text>
            <View>
              <Text style={styles.desc}>
                Phí phụ thu: <Text style={styles.textBold}>{tourDetail?.numOfFreeMember}/người</Text>
              </Text>
              <Text style={styles.desc}>(Khi vượt quá tối đa người)</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceTitle}>Giá: </Text>
            <Text style={styles.priceTxt}>{formatCurrency(tourDetail?.basePrice)}đ</Text>
          </View>
        </View>
        {/* <TourDetailImages /> */}
        {/* Mo ta tour */}
        <View>
          <Text style={styles.desc}>{tourDetail?.description?.trim()}</Text>
        </View>
        <View style={styles.overviewContainer}>
          <Text style={styles.textBold}>ĐIỂM NỔI BẬT NHẤT</Text>
          <Text style={styles.desc}>{tourDetail?.overview?.trim()}</Text>
        </View>
        {/* Lich trinh */}
        <View style={styles.scheduleContainer}>
          <Text style={styles.textBold}>LỊCH TRÌNH</Text>
          {tourDetail?.tourSchedule?.map((element, index) => (
            <View key={element.id}>
              <Text style={styles.textBold}>
                Ngày {index + 1}: {element.title}
              </Text>
              <Text style={styles.desc}>{element.content}</Text>
            </View>
          ))}
        </View>
      </View>
      <Button
        title="Hủy chuyến đi"
        // onPress={onLogin}
        customStyles={{ marginTop: scales(10), marginBottom: scales(20), marginHorizontal: scales(10) }}
      />
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <Header title="Chi tiết chuyến đi" />
      {renderContent()}
    </View>
  );
};

export default TourStatusDetailScreen;

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
    tourName: {
      ...Fonts.inter600,
      fontSize: scales(18),
      color: color.Text_Dark_1,
    },
    rateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    rate: {
      ...Fonts.inter400,
      fontSize: scales(14),
      color: color.Text_Dark_1,
    },
    care: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_1,
    },
    shopContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: getThemeColor().Color_Red,
      paddingVertical: scales(10),
      paddingHorizontal: scales(20),
      borderRadius: scales(4),
    },
    sellNow: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: getThemeColor().white,
      paddingLeft: scales(3),
    },
    showInfoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: scales(10),
      paddingHorizontal: scales(20),
      borderRadius: scales(4),
      borderWidth: 1,
      borderColor: getThemeColor().Color_Primary,
      marginLeft: scales(8),
    },
    textShowInfo: {
      ...Fonts.inter400,
      fontSize: scales(11),
      color: getThemeColor().Color_Primary,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: Sizes.bottomSpace + scales(5),
      marginHorizontal: scales(15),
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: scales(15),
      marginHorizontal: scales(15),
    },
    priceTxt: {
      ...Fonts.inter600,
      fontSize: scales(16),
      color: getThemeColor().Color_Red,
    },
    priceTitle: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: getThemeColor().Text_Dark_1,
    },
    image: {
      width: Sizes.scrWidth - scales(30),
      height: Sizes.scrHeight / 3,
      borderRadius: scales(10),
      marginRight: scales(12),
    },
    textBold: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: getThemeColor().Text_Dark_1,
      lineHeight: scales(25),
    },
    voteBka: {
      width: 0,
      height: 0,
      borderStyle: 'solid',
      overflow: 'hidden',
      borderTopWidth: 15,
      borderRightWidth: 10,
      borderBottomWidth: 0,
      borderLeftWidth: 16,
      borderTopColor: getThemeColor().Color_Secondary_Light_Yellow,
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
      transform: [{ rotate: '-10deg' }, { translateX: 2 }, { translateY: -3 }],
    },
    voteContainer: {
      backgroundColor: getThemeColor().Color_Secondary_Light_Yellow,
      width: scales(50),
      height: scales(40),
      borderRadius: scales(4),
      justifyContent: 'center',
      alignItems: 'center',
    },
    desc: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: getThemeColor().Text_Dark_1,
      lineHeight: scales(19),
    },
    scheduleContainer: {
      marginBottom: scales(15),
      marginTop: scales(20),
    },
    typeContainer: {
      backgroundColor: color.Color_Gray2,
      paddingHorizontal: scales(10),
      paddingVertical: scales(2),
      borderRadius: scales(8),
    },
    overviewContainer: {
      marginTop: scales(20),
    },
  });
};
