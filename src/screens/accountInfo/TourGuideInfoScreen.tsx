import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

import SvgIcons from 'assets/svgs';
import Avatar from 'components/Avatar';
import Header from 'components/Header';
import { useTheme } from 'hooks/useTheme';
import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import Images from '../../assets/images';
import TouchableOpacity from '../../components/TouchableOpacity';
import TourGuideInfoScene from './src/components/TourGuideInfoScene';
import TourGuideRateScene from './src/components/TourGuideRateScene';
import TourOfTouGuideScene from './src/components/TourOfTourGuideScene';


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
]

function TourGuideInfoScreen(props) {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const [currentTab, setCurrentTab] = useState<string>(TourGuideInfoTab.info);

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
                                ]}>
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
            return <TourGuideInfoScene />
        } else if (currentTab === TourGuideInfoTab.tour) {
            return <TourOfTouGuideScene />
        } else {
            return <TourGuideRateScene />
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
                    <Avatar containerStyle={styles.avatarContainer} />
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.subTitle}>Địa điểm</Text>
                    <View style={styles.row}>
                        <SvgIcons.IcLocation width={scales(12)} height={scales(12)} color={getThemeColor().Color_Primary}/>
                        <Text style={[styles.rightText, { marginLeft: scales(5), marginRight: scales(8) }]}>Hà Nam</Text>
                        <SvgIcons.IcLocation width={scales(12)} height={scales(12)} color={getThemeColor().Color_Primary}/>
                        <Text style={[styles.rightText, { marginLeft: scales(5) }]}>Nam Định</Text>
                    </View>
                    <View style={styles.row}>
                        <SvgIcons.IcLocation width={scales(12)} height={scales(12)} color={getThemeColor().Color_Primary}/>
                        <Text style={[styles.rightText, { marginLeft: scales(5) }]}>Ninh Bình</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.nameAndAvatarContianer, { justifyContent: 'space-between', alignItems: 'center', marginVertical: 0 }]}>
                <Text style={styles.name}>Duy Khánh Vy</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.sendMessageContainer}>
                        <Text style={styles.sendMessage}>Nhắn tin</Text>
                    </TouchableOpacity>
                    <View style={styles.heartContainer}>
                        <SvgIcons.IcHeartOutline width={scales(12)} height={scales(12)} color={getThemeColor().Color_Primary}/>
                    </View>
                </View>
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
                        <Text style={styles.countRate}>4<Text style={{ marginLeft: scales(5) }}>(3.2k)</Text></Text>
                    </View>
                </View>
            </View>
            <View style={styles.infoRateContainer}>
                <View style={styles.row}>
                    <Image source={Images.FightTourGuide} style={styles.imageRate} />
                    <View style={styles.rateInfoContainer}>
                        <Text style={styles.titleRate}>Chuyến đi</Text>
                        <Text style={styles.countRate}>234</Text>
                    </View>
                </View>
            </View>
            <View style={styles.infoRateContainer}>
                <View style={styles.row}>
                    <Image source={Images.TimeTourGuide} style={styles.imageRate} />
                    <View style={styles.rateInfoContainer}>
                        <Text style={styles.titleRate}>Tham gia</Text>
                        <Text style={styles.countRate}>5 năm</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderInfo = () => (
        <View style={styles.infoContainer}>

        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            <ScrollView
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {renderContentHeader()}
                {renderRateFight()}
                {renderInfo()}
                {renderListFooter()}
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
            backgroundColor: color.Color_Gray5,
            padding: scales(5),
            borderRadius: 100,
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
