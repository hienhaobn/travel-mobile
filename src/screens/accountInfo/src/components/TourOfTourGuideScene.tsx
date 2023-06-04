import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import TourSectionItem from 'screens/home/src/components/TourSectionItem';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';

interface ITourOfTouGuideSceneProps {
    profile: tourGuide.TourGuideProfile;
}

function TourOfTouGuideScene(props: ITourOfTouGuideSceneProps) {
    const { theme } = useTheme();
    const styles = myStyles(theme);
    const { profile } = props;

    console.log('profile', profile);

    const renderContent = () => (
        <View style={styles.contentContainer}>
            {
                profile?.tours?.map((tour) => <TourSectionItem key={tour.id.toString()} tour={tour} />)
            }
        </View>
    );

    return (
        <View style={styles.container}>
            {renderContent()}
        </View>
    );
}

export default TourOfTouGuideScene;

const myStyles = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            backgroundColor: color.Color_Bg,
        },
        contentContainer: {
            marginBottom: scales(60),
        },
    });
};
