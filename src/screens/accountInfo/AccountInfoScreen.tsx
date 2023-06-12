import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Header from 'components/Header';
import SvgIcons from 'assets/svgs';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button/Button';
import { useTheme } from '../../hooks/useTheme';
import { Fonts } from '../../themes';
import { getThemeColor } from '../../utils/getThemeColor';
import { scales } from '../../utils/scales';
import { goToEditProfile } from '../editProfile/src/utils';
import { useSelectProfile } from 'states/user/hooks';

function AccountInfoScreen() {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const profile = useSelectProfile();
  console.log(profile);
  const renderHeader = () => (
    <Header title='Thông tin tài khoản' iconRight={<SvgIcons.IcPencil width={scales(17)} height={scales(17)} color={getThemeColor().Text_Dark_1} />} onPressRight={goToEditProfile} />
  );

  const renderNameAndAvatar = () => (
    <View style={styles.nameAndAvatarContianer}>
      <Avatar containerStyle={styles.avatarContainer} imageUrl={profile.avatar} />
      <View style={styles.rightContainer}>
        <Text style={styles.name}>{profile.role === 'USER' ? profile.username : profile.name}</Text>
        <View style={styles.row}>
          <SvgIcons.IcEmail width={scales(15)} height={scales(15)} />
          <Text style={[styles.rightText, { marginLeft: scales(8) }]}>{profile.email}</Text>
        </View>
        {profile.role === 'TOURGUIDE' ?
          <>
            <View style={styles.row}>
              <SvgIcons.IcGender width={scales(20)} height={scales(20)} />
              <Text style={[styles.rightText, { marginLeft: scales(8) }]}>{profile.gender === '0' ? 'Nữ' : 'Nam'}</Text>
            </View>
            <View style={styles.row}>
              <SvgIcons.IcBirthday width={scales(12)} height={scales(12)} />
              <Text style={[styles.rightText, { marginLeft: scales(8) }]}>{profile.dob.split('-').reverse().join('-')}</Text>
            </View>
          </>
          : null
        }
        <Text style={styles.rightText}>Đã tham gia vào {profile.createdAt.split('-')[0]}</Text>
      </View>
    </View>
  );

  const renderDescriptionAndLocation = () => (
    <View>
      <View style={styles.row}>
        <Text style={[styles.subTitle, { marginRight: scales(8) }]}>Vị trí của bạn:</Text>
        <SvgIcons.IcLocation color={getThemeColor().Color_Primary} />
        <Text style={styles.locationText}>{profile.provinces?.length > 0 ? profile.provinces.map(e => e.name.trim()).join(',') : 'Hà Nội'}</Text>
      </View>
      <Text style={styles.desTxt}>{profile.bio ? profile.bio : 'Đam mê bất tận với những tour du lịch về ẩm thực, thích đi đến nhiều quốc gia khác nhau trên thế giới.'}</Text>
    </View>
  );

  // const renderRate = () => (
  //   <View>
  //     <Text style={styles.title}>Đánh giá (1)</Text>
  //     <View>
  //       <Text>Đánh giá hướng dẫn viên: <Text>Duy Khánh Vy</Text></Text>
  //       {renderRateContent()}
  //     </View>
  //   </View>
  // );

  const renderRateContent = () => (
    <View style={styles.rateContentContainer}>
      <View style={{
        flexDirection: 'row',
      }}>
        <Avatar imageStyle={{
          width: scales(50),
          height: scales(50),
        }} />
        <View style={[{ justifyContent: 'space-between', flexDirection: 'row', flex: 1, marginLeft: scales(15) }]}>
          <View>
            <Text style={styles.nameRate}>Duy Duy</Text>
            <View style={styles.rateContainer}>
              <SvgIcons.IcStarActive width={scales(12)} height={scales(12)} />
              <SvgIcons.IcStarActive width={scales(12)} height={scales(12)} />
              <SvgIcons.IcStarActive width={scales(12)} height={scales(12)} />
              <SvgIcons.IcStarActive width={scales(12)} height={scales(12)} />
            </View>
          </View>
          <View>
            <Text>1 tháng trước</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.desTxt}>
          My wife and I had a dream of downsizing from our house in Cape Elizabeth into a small condo closer to where we work and play in Portland. David and his skilled team helped make that dream a reality. The sale went smoothly, and we just closed on an ideal new place we're excited to
          call home... <Text style={styles.subTitle}>Xem thêm</Text>
        </Text>
      </View>
    </View>
  );

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
      {/* {renderRate()} */}
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

export default AccountInfoScreen;

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
  });
};
