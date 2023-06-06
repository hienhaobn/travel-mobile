import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import Header from 'components/Header';
import SvgIcons from 'assets/svgs';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button/Button';
import { useTheme } from '../../hooks/useTheme';
import { Fonts, Sizes } from '../../themes';
import { getThemeColor } from '../../utils/getThemeColor';
import { scales } from '../../utils/scales';
import { goToEditProfile } from '../editProfile/src/utils';
import { ETourTypesValue } from 'constants/tours';
import { formatCurrency } from 'utils/number';
import { getTourListByTourguide } from './api';
import { navigate } from 'navigation/utils';

function TourGuideInforScreen(props) {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const tourguide = props.route.params;
  const [tours, setTours] = useState([]);
  const getData = async () => {
    const response = await getTourListByTourguide(+tourguide.tourGuideId);
    setTours(response.data);
  }
  useEffect(() => {
    getData();
  }, []);
  const renderHeader = () => (
    <Header title='Thông tin tài khoản' />
  );

  const renderNameAndAvatar = () => (
    <View style={styles.nameAndAvatarContianer}>
      <Avatar containerStyle={styles.avatarContainer} imageUrl={tourguide.tourGuideAvatar} />
      <View style={styles.rightContainer}>
        <Text style={styles.name}>{tourguide.tourGuideName}</Text>
        <View style={styles.row}>
          <SvgIcons.IcEmail width={scales(12)} height={scales(12)} />
          <Text style={[styles.rightText, { marginLeft: scales(8) }]}>{tourguide.tourGuideEmail}</Text>
        </View>
        <Text style={styles.rightText}>Đã tham gia vào 2023</Text>
        <Text style={styles.rightText}>1 đóng góp</Text>
      </View>
    </View>
  );

  const renderDescriptionAndLocation = () => (
    <View>
      <View style={styles.row}>
        <Text style={[styles.subTitle, { marginRight: scales(8) }]}>Tỉnh thành hoạt động:</Text>
        <SvgIcons.IcLocation color={getThemeColor().Color_Primary} />
        <Text style={styles.locationText}>{tourguide.provinceName}</Text>
      </View>
      <Text style={styles.desTxt}>{tourguide.tourGuideBio}</Text>
    </View>
  );

  const renderItem = useCallback((tour) => {
    console.log("1111", { tour });

    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.itemContainer} onPress={() => navigate('TourDetail', tour)} >
        <View style={styles.itemContentContainer}>
          <View>
            <Image source={{ uri: tour.images[Math.floor(Math.random() * tour.images.length)].url }} style={styles.itemImages} />
            <View style={styles.rateContainer}>
              <SvgIcons.IcStarActive width={scales(12)} height={scales(12)} />
              <Text style={styles.rate}>4.8</Text>
              <View style={styles.typeContainer}>
                <Text style={styles.desc}>{ETourTypesValue[tour?.type]}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.heart}>
              <SvgIcons.IcHeartOutline
                color={getThemeColor().white}
                width={scales(17)}
                height={scales(17)}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.timeStartContainer}>Chuyến đi {tour.tourSchedule.length - 1 == 0 ? 'trong ngày' : tour.tourSchedule.length + ' ngày'}</Text>
          </View>
          <View style={styles.itemHeaderContainer}>
            <Text style={styles.tourGuideName} numberOfLines={3}>
              {tour.name}
            </Text>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.textLocation}>Hướng dẫn viên: </Text>
            <Text style={styles.startLocation}>{tour.tourGuide.name}</Text>
          </View>
          <Text style={styles.textPrice}>Giá cơ bản: {formatCurrency(tour.basePrice)} VNĐ</Text>
        </View>
      </TouchableOpacity >
    );
  }, []);

  const renderSection = useCallback(() => {
    return (<>

      <View style={{ marginTop: scales(10) }}>
        <Text style={styles.textTourGuide}>Tour của hướng dẫn viên</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tours.length > 0 ? tours.map((tour, index) => (
          renderItem(tour)
        )) : null}
      </ScrollView>
    </>
    );
  }, [tours.length]);
  // const renderRateContent = () => (
  //   <View style={styles.rateContentContainer}>
  //     <View style={{
  //       flexDirection: 'row',
  //     }}>
  //       <Avatar imageStyle={{
  //         width: scales(50),
  //         height: scales(50),
  //       }} />
  //       <View style={[{ justifyContent: 'space-between', flexDirection: 'row', flex: 1, marginLeft: scales(15) }]}>
  //         <View>
  //           <Text style={styles.nameRate}>Duy Duy</Text>
  //           <View style={styles.rateContainer}>
  //             <SvgIcons.IcStarActive width={scales(12)} height={scales(12)} />
  //             <SvgIcons.IcStarActive width={scales(12)} height={scales(12)} />
  //             <SvgIcons.IcStarActive width={scales(12)} height={scales(12)} />
  //             <SvgIcons.IcStarActive width={scales(12)} height={scales(12)} />
  //           </View>
  //         </View>
  //         <View>
  //           <Text>1 tháng trước</Text>
  //         </View>
  //       </View>
  //     </View>
  //     <View>
  //       <Text style={styles.desTxt}>
  //         My wife and I had a dream of downsizing from our house in Cape Elizabeth into a small condo closer to where we work and play in Portland. David and his skilled team helped make that dream a reality. The sale went smoothly, and we just closed on an ideal new place we're excited to
  //         call home... <Text style={styles.subTitle}>Xem thêm</Text>
  //       </Text>
  //     </View>
  //   </View>
  // );

  const renderSchedule = () => (
    <View>
      <Text style={styles.title}>Kế hoạch đã lập (0)</Text>
      <Text style={[styles.desTxt, { alignSelf: 'center' }]}>Bạn chưa có kế hoạch nào</Text>
      <Button title='Lập kế hoạch' customStyles={{
        marginTop: scales(10)
      }} />
    </View>
  )

  const renderContent = () => (
    <View style={styles.content}>
      {renderNameAndAvatar()}
      {renderDescriptionAndLocation()}
      {renderSection()}
      {/* {renderSchedule()} */}
    </View>
  );


  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView
        style={styles.wrapperContent}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    </View>
  );
}

export default TourGuideInforScreen;

const myStyles = (themeCurrent: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.Color_Bg,
    },
    content: {
      marginHorizontal: scales(15),
    },
    wrapperContent: {
      flexGrow: 1,
    },
    contentContainer: {
      paddingBottom: scales(30),
    },
    nameAndAvatarContianer: {
      flexDirection: 'row',
      marginVertical: scales(15),
    },
    name: {
      ...Fonts.inter600,
      fontSize: scales(18),
      color: color.Text_Dark_1,
    },
    rightText: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_1,
    },
    rightContainer: {},
    avatarContainer: {
      marginRight: scales(15),
    },
    desTxt: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_1,
      lineHeight: scales(18),
      marginTop: scales(15),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationText: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Color_Gray3,
      lineHeight: scales(18),
      marginLeft: scales(4),
    },
    subTitle: {
      ...Fonts.inter600,
      fontSize: scales(12),
      color: color.Text_Dark_1,
    },
    title: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: color.Text_Dark_1,
      marginTop: scales(10),
    },
    rateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: scales(5),
    },
    rate: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.white,
      marginRight: scales(5),
    },
    nameRate: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: color.Text_Dark_1,
    },
    rateContentContainer: {
      marginTop: scales(15),
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    showAllContainer: {
      flexDirection: 'row',
    },
    textTourGuide: {
      ...Fonts.inter700,
      fontSize: scales(16),
      color: color.Text_Dark_1,
    },
    textShowAll: {
      ...Fonts.inter600,
      fontSize: scales(12),
      color: color.Color_Primary,
    },
    itemContainer: {
      marginTop: scales(5),
      marginHorizontal: scales(10),
      width: Sizes.scrWidth - scales(40),
      borderRadius: scales(8),
    },
    itemContentContainer: {
    },
    itemImages: {
      width: Sizes.scrWidth - scales(40),
      height: Sizes.scrWidth / 3,
      borderRadius: scales(8),
    },
    itemHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: scales(10),
    },
    tourGuideName: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: color.Text_Dark_1,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: scales(10),
    },
    textLocation: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_3,
    },
    startLocation: {
      ...Fonts.inter600,
      fontSize: scales(12),
      color: color.Text_Dark_1,
    },
    heart: {
      position: 'absolute',
      top: scales(10),
      left: scales(10),
      backgroundColor: getThemeColor().Text_Color_Opacity_30,
      padding: scales(2),
      borderRadius: scales(3),
    },
    timeStartContainer: {
      marginTop: scales(10),
    },
    timeStartText: {
      ...Fonts.inter400,
      fontSize: scales(11),
      color: color.Text_Dark_5,
    },
    textPrice: {
      ...Fonts.inter600,
      fontSize: scales(13),
      color: color.Color_Red,
    },
    shopContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: getThemeColor().Color_Red,
      paddingVertical: scales(5),
      paddingHorizontal: scales(10),
      borderRadius: scales(4),
    },
    sellNow: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: getThemeColor().white,
      paddingLeft: scales(3),
    },
    showInfoContainer: {
      paddingVertical: scales(5),
      paddingHorizontal: scales(10),
      borderRadius: scales(4),
      borderWidth: 1,
      borderColor: getThemeColor().Color_Primary,
    },
    textShowInfo: {
      ...Fonts.inter400,
      fontSize: scales(11),
      color: getThemeColor().Color_Primary,
    },
    typeContainer: {
      backgroundColor: color.Color_Gray2,
      paddingHorizontal: scales(10),
      paddingVertical: scales(2),
      borderRadius: scales(8),
    },
    desc: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: getThemeColor().Text_Dark_1,
      lineHeight: scales(19),
    },
  });
};
