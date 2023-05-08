import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import HomeBanner from './src/components/HomeBanner';
import HomeOptions from './src/components/HomeOptions';
import HomePostSection from './src/components/HomePostSection';
import HomeTourGuideSection from './src/components/HomeTourGuideSection';
import HomeTourSection from './src/components/HomeTourSection';

import SvgIcons from 'assets/svgs';

import Input from 'components/Input';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

import { Fonts, Sizes } from 'themes';

const HomeScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = myStyles(theme);

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        {/* left */}
        <View style={styles.headerLeftContainer}>
          <SvgIcons.IcLocation width={scales(17)} height={scales(17)} />
          <TouchableOpacity style={styles.headerLeftContainer}>
            <Text style={styles.headerLeftText}>Hà Đông, Hà Nội</Text>
            <SvgIcons.IcForward
              color={getThemeColor().Text_Dark_1}
              width={scales(17)}
              height={scales(17)}
            />
          </TouchableOpacity>
        </View>
        {/* right */}
        <View style={styles.headerRightContainer}>
          <TouchableOpacity style={styles.icNotification}>
            <SvgIcons.IcNotification
              color={getThemeColor().Text_Dark_1}
              width={scales(20)}
              height={scales(20)}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <SvgIcons.IcMenu color={getThemeColor().Text_Dark_1} width={scales(20)} height={scales(20)} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  const renderSearchComponent = useCallback(() => {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.icScan}>
          <SvgIcons.IcScan color={getThemeColor().Text_Dark_1} width={scales(17)} height={scales(17)} />
        </View>
        <Input
          placeholder="Tìm kiếm"
          leftIcon={
            <SvgIcons.IcSearch color={getThemeColor().Text_Dark_1} width={scales(24)} height={scales(24)} />
          }
          leftIconStyle={{
            paddingLeft: scales(10),
          }}
          icon={
            <SvgIcons.IcScan color={getThemeColor().Text_Dark_1} width={scales(17)} height={scales(17)} />
          }
          containerStyle={styles.inputContainer}
        />
      </View>
    );
  }, []);

  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        <View style={{ marginHorizontal: scales(15) }}>
          {/* Search */}
          {renderSearchComponent()}
          <HomeOptions />
          <HomeBanner />
          <HomeTourGuideSection />
          <HomeTourSection />
          <HomePostSection />
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={{
        backgroundColor: getThemeColor().Color_Secondary_Green,
      }}>
      {renderHeader()}
      {renderContent()}
    </ScrollView>
  );
};

export default HomeScreen;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    contentContainer: {
      backgroundColor: color.Color_Bg,
      borderTopRightRadius: scales(16),
      borderTopLeftRadius: scales(16),
    },
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingTop: Sizes.statusBarHeight + scales(20),
      paddingBottom: scales(40),
      marginHorizontal: scales(15),
    },
    headerLeftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerLeftText: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_1,
      marginHorizontal: scales(5),
    },
    headerRightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icNotification: {
      marginRight: scales(15),
    },
    searchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: -scales(23),
    },
    icScan: {
      backgroundColor: color.Color_Bg,
      height: scales(46),
      justifyContent: 'center',
      paddingHorizontal: scales(20),
      borderRadius: scales(6),

      shadowColor: color.Text_Dark_1,
      shadowOffset: { width: -1, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    inputContainer: {
      flex: 1,
      marginLeft: scales(15),
      shadowColor: color.Text_Dark_1,
      shadowOffset: { width: -1, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  });
};
