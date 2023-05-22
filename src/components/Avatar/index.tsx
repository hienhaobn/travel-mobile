import React, { memo } from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle, ImageStyle } from 'react-native';
import Images from '../../assets/images';
import { useTheme } from '../../hooks/useTheme';
import { getThemeColor } from '../../utils/getThemeColor';
import { scales } from '../../utils/scales';
import TouchableOpacity from '../TouchableOpacity';
import SvgIcons from 'assets/svgs';

interface IAvatarProps {
    imageUrl?: string;
    isEditAvatar?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>
}

function Avatar(props: IAvatarProps) {
    const { theme } = useTheme();
    const styles = myStyles(theme);

    const { imageUrl, isEditAvatar, containerStyle, imageStyle } = props;

    return (
        <View style={[styles.container, containerStyle]}>
            <Image source={imageUrl ? { uri: imageUrl } : Images.TourGuidePerson} style={[styles.image, imageStyle]} />

            {
                isEditAvatar ? (
                    <TouchableOpacity style={{
                        zIndex: 999,
                        position: 'absolute',
                        bottom: 0,
                        left: scales(50),
                        backgroundColor: getThemeColor().Color_Bg,
                        padding: scales(5),
                        borderRadius: 100,
                    }}
                                      activeOpacity={0.9}
                    >
                        <SvgIcons.IcPencil width={scales(13)} height={scales(13)} color={getThemeColor().Color_Primary} />
                    </TouchableOpacity>
                ) : null
            }

        </View>
    );
}

export default memo(Avatar);

const myStyles = (themeCurrent: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {},
        image: {
            width: scales(70),
            height: scales(70),
            borderRadius: scales(100),

        },
    });
};
