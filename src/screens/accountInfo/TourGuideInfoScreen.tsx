import { RouteProp } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import TourGuideInfoScene from './src/components/TourGuideInfoScene';
import TourGuideRateScene from './src/components/TourGuideRateScene';
import TourOfTouGuideScene from './src/components/TourOfTourGuideScene';
import Images from '../../assets/images';

import TouchableOpacity from '../../components/TouchableOpacity';

import { RootNavigatorParamList } from '../../navigation/types';

import { goToConversation } from '../conversation/src/utils';

import SvgIcons from 'assets/svgs';

import Avatar from 'components/Avatar';
import Header from 'components/Header';
import { Role } from 'constants/user';
import { useTheme } from 'hooks/useTheme';
import { checkIsLikedTourGuide, fetchTourGuideById, likeTourGuide } from 'states/tourGuide/fetchProfileTourGuide';
import { useSelectProfile } from 'states/user/hooks';
import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { formatCurrency } from 'utils/number';
import { scales } from 'utils/scales';


enum TourGuideInfoTab {
  info = 'info',
  tour = 'dish',
  rate = 'rate',
}

const TABS = [
  {
    key: TourGuideInfoTab.info,
    title: 'Giới thiệu',
  },
  {
    key: TourGuideInfoTab.tour,
    title: 'Tour',
  },
  {
    key: TourGuideInfoTab.rate,
    title: 'Đánh giá',
  },
];

interface ITourGuideInfoScreenProps {
  route: RouteProp<RootNavigatorParamList, 'TourGuideInfo'>
}

function TourGuideInfoScreen(props: ITourGuideInfoScreenProps) {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { route } = props;
  const { tourGuideId } = route.params;
  const [isLiked, setIsLiked] = useState(false);

  const [currentTab, setCurrentTab] = useState<string>(TourGuideInfoTab.info);
  const [profileTourGuide, setProfileTourGuide] = useState<tourGuide.TourGuideProfile>(null);
  const profileMe = useSelectProfile();

  const onHandleLike = async () => {

    await likeTourGuide(+tourGuideId);
    // hideLoading();
    setIsLiked(!isLiked);
    getIsLiked();
  };

  const getProfileTourGuide = async () => {
    const profile = await fetchTourGuideById(parseInt(tourGuideId));
    setProfileTourGuide(profile);
  };

  const getIsLiked = async () => {
    const responseIsLiked = await
      checkIsLikedTourGuide(+tourGuideId);
    setIsLiked(responseIsLiked);
  }
  useEffect(() => {
    getIsLiked();
  }, []);

  useEffect(() => {
    getProfileTourGuide();
  }, []);

  const renderHeader = () => (
    <Header title='Thông tin hướng dẫn viên' />
  );

  const renderTabSelect = () => (
    <View style={{ flexDirection: 'row' }}>
      {
        TABS.map((tab, index) => {
          const isFocus = tab.key === currentTab;
          return (
            <TouchableOpacity
              style={{
                marginRight: scales(20),
                paddingVertical: scales(16),
              }}
              onPress={() => {
                setCurrentTab(tab.key)
              }}
              key={index.toString()}
            >
              <Text
                style={[
                  styles.labelTabText,
                  isFocus ? { color: getThemeColor().Color_Primary } : { color: getThemeColor().Text_Dark_1 },
                ]}
              >
                {tab.title}
              </Text>
            </TouchableOpacity>
          )
        })
      }
    </View>
  );

  const renderContentTab = () => {
    if (currentTab === TourGuideInfoTab.info) {
      return <TourGuideInfoScene profile={profileTourGuide} />
    } else if (currentTab === TourGuideInfoTab.tour) {
      return <TourOfTouGuideScene profile={profileTourGuide} />
    } else {
      return <TourGuideRateScene profile={profileTourGuide} />
    }
  }

  const renderListFooter = () => (
    <>
      {renderTabSelect()}
      {renderContentTab()}
    </>
  );


  const renderContentHeader = () => (
    <View>
      <View style={styles.nameAndAvatarContianer}>
        <View>
          <Avatar containerStyle={styles.avatarContainer} imageUrl={profileTourGuide?.avatar} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.subTitle}>Địa điểm</Text>
          <View style={styles.row}>
            <SvgIcons.IcLocation width={scales(12)} height={scales(12)} color={getThemeColor().Color_Primary} />
            <Text style={[styles.rightText, { marginLeft: scales(5), marginRight: scales(8) }]}>{profileTourGuide?.provinces[0]?.name.trim()}</Text>
            {profileTourGuide.provinces[1] ?
              <>
                <SvgIcons.IcLocation width={scales(12)} height={scales(12)} color={getThemeColor().Color_Primary} />
                <Text style={[styles.rightText, { marginLeft: scales(5) }]}>{profileTourGuide.provinces[1].name}</Text>
              </>
              : null
            }

          </View>
          <View style={styles.row}>
            {profileTourGuide.provinces[2] ?
              <>
                <SvgIcons.IcLocation width={scales(12)} height={scales(12)} color={getThemeColor().Color_Primary} />
                <Text style={[styles.rightText, { marginLeft: scales(5) }]}>{profileTourGuide.provinces[2].name}</Text>
              </>
              : null
            }
          </View>
        </View>
      </View>
      <View style={[styles.nameAndAvatarContianer, { justifyContent: 'space-between', alignItems: 'center', marginVertical: 0 }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.name}>{profileTourGuide?.name}</Text>
          <View style={styles.heartContainer}>
            <TouchableOpacity style={{ marginHorizontal: scales(10) }} onPress={() => onHandleLike()}>
              {isLiked ? <SvgIcons.IcHeartRed
                color={getThemeColor().grey}
                width={scales(20)}
                height={scales(20)}
                         /> : <SvgIcons.IcHeartOutline
                color={getThemeColor().grey}
                width={scales(20)}
                height={scales(20)}
                              />}
            </TouchableOpacity>
          </View>
        </View>

        {
          profileMe?.role === Role.TOURGUIDE ? null : (
            <TouchableOpacity style={styles.sendMessageContainer} onPress={() => goToConversation(tourGuideId, profileMe, profileTourGuide)}>
              <Text style={styles.sendMessage}>Nhắn tin</Text>
            </TouchableOpacity>
          )
        }

      </View>
    </View>
  );

  const renderRateFight = () => (
    <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center', marginTop: scales(12) }]}>
      <View style={styles.infoRateContainer}>
        <View style={styles.row}>
          <Image source={Images.StarTourGuide} style={styles.imageRate} />
          <View style={styles.rateInfoContainer}>
            <Text style={styles.titleRate}>Đánh giá</Text>
            <Text style={styles.countRate}>{formatCurrency(profileTourGuide?.avgStar ? profileTourGuide.avgStar : 4, 2)}<Text style={{ marginLeft: scales(5) }}>(3.2k)</Text></Text>
          </View>
        </View>
      </View>
      <View style={styles.infoRateContainer}>
        <View style={styles.row}>
          <Image source={Images.FightTourGuide} style={styles.imageRate} />
          <View style={styles.rateInfoContainer}>
            <Text style={styles.titleRate}>Chuyến đi</Text>
            <Text style={styles.countRate}>{profileTourGuide.orders.length === 0 ? 3 : profileTourGuide.orders.length}</Text>
          </View>
        </View>
      </View>
      <View style={styles.infoRateContainer}>
        <View style={styles.row}>
          <Image source={Images.TimeTourGuide} style={styles.imageRate} />
          <View style={styles.rateInfoContainer}>
            <Text style={styles.titleRate}>Tham gia</Text>
            <Text style={styles.countRate}>{profileTourGuide.interviewDate?.split('-')[0] || '2023'}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderInfo = () => (
    <View style={styles.infoContainer} />
  );

  const renderContent = () => (
    <View style={styles.content}>
      <ScrollView
        style={styles.wrapperContent}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >{profileTourGuide ? <>

        {renderContentHeader()}
        {renderRateFight()}
        {renderInfo()}
        {renderListFooter()}
      </> : null}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderContent()}
    </View>
  );
}

export default TourGuideInfoScreen;

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
      marginTop: scales(10),
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
    sendMessage: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: color.white,
    },
    sendMessageContainer: {
      backgroundColor: color.Color_Primary,
      paddingHorizontal: scales(20),
      paddingVertical: scales(10),
      borderRadius: scales(20),
      marginRight: scales(10),
    },
    heartContainer: {
      backgroundColor: color.Color_Primary_Mint_10,
      padding: scales(5),
      borderRadius: 100,
      marginLeft: scales(8),

      shadowColor: color.Text_Dark_1,
      shadowOffset: { width: -1, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    imageRate: {
      width: scales(40),
      height: scales(40),
    },
    rateInfoContainer: {
      marginLeft: scales(5),
    },
    titleRate: {
      ...Fonts.inter600,
      fontSize: scales(12),
      color: color.Text_Dark_1,
    },
    countRate: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_3,
    },
    infoRateContainer: {

    },
    infoContainer: {
      marginTop: scales(20),
    },
    labelTabText: {
      ...Fonts.inter700,
      fontSize: scales(17),
      color: color.Text_Dark_1,
    },
  });
};
