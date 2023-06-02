import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useTheme } from 'hooks/useTheme';
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

    return (
        <View></View>
    );
}

export default TourOfTouGuideScene;

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
    });
};