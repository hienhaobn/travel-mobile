import moment from 'moment';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { Fonts } from '../../../../themes';

interface ITourGuideInfoSceneProps {
    profile: tourGuide.TourGuideProfile;
}

function TourGuideInfoScene(props: ITourGuideInfoSceneProps) {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { profile } = props;

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Tên: </Text>
                <Text style={styles.value}>{profile?.name}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Tuổi: </Text>
                <Text style={styles.value}>{moment(profile?.dob).format('DD/MM/YYYY')}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Địa điểm: </Text>
                <Text style={styles.value}>Hà Nam; Nam Định; Ninh Bình</Text>
            </View>
            <View>
                <Text style={styles.title}>Về bản thân:</Text>
                <Text style={styles.value}>{profile?.bio}</Text>
            </View>
        </View>
    );
}

export default TourGuideInfoScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        wrapperContent: {
            flexGrow: 1,
        },
        contentContainer: {
            paddingBottom: scales(30),
        },
        infoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: scales(8),
        },
        title: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        },
        value: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
            lineHeight: scales(19),
        },
    });
};
