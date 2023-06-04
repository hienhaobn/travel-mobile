import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';

import Avatar from 'components/Avatar';
import { useTheme } from 'hooks/useTheme';
import { Fonts } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface ITouGuideRateSceneProps {
    profile: tourGuide.TourGuideProfile;
}

function TouGuideRateScene(props: ITouGuideRateSceneProps) {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { profile } = props;

    const getRates = (): tour.Rate[] => {
        let rates = [];

        profile?.tours?.map(tour => {
            tour?.rates?.map(rate => rates.push(rate))
        });
        return rates;
    };

    const rates = getRates();

    const renderItem = (item: tour.Rate) => (
        <View style={styles.itemContainer}>
            <View style={styles.row}>
                <Avatar imageStyle={styles.avatar} />
                <View style={[styles.row, { justifyContent: 'space-between', flex: 1, marginLeft: scales(8) }]}>
                    <View>
                        <Text style={styles.name}>{profile?.name}</Text>
                        <View style={styles.rateContainer}>
                            <Rating
                                type='star'
                                startingValue={item.star}
                                minValue={0}
                                imageSize={scales(12)}
                            />
                        </View>
                    </View>
                    <Text>1 tháng trước</Text>
                </View>
            </View>
            <Text style={styles.commentTxt}>{item?.content}</Text>
        </View>
    );

    const renderContent = () => {
        return (
            <View>
                {
                    rates?.map(rate => <View key={rate.id.toString()}>{renderItem(rate)}</View>)
                }
            </View>
        )
    };

    return (
        <View style={styles.container}>
            <Text style={styles.commentTitle}>Bình luận ({rates?.length})</Text>
            {renderContent()}
        </View>
    );
}

export default TouGuideRateScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
          marginVertical: scales(10),
        },
        itemContainer: {
            marginVertical: scales(20),
        },
        wrapperContent: {
            flexGrow: 1,
        },
        contentContainer: {
            paddingBottom: scales(30),
        },
        avatar: {
            width: scales(50),
            height: scales(50),
        },
        name: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        rateContainer: {
            alignSelf: 'flex-start',
        },
        headerContainer: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
        },
        row: {
            flexDirection: 'row',
        },
        commentTitle: {
            ...Fonts.inter700,
            fontSize: scales(16),
            color: color.Text_Dark_1,
        },
        commentTxt: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            marginTop: scales(10),
        }
    });
};
