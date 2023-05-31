import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import Avatar from 'components/Avatar';
import { ESender } from 'constants/chat';
import { useSelectProfile } from 'states/user/hooks';

interface IMessageItemProps {
    message: chat.Message;
    tourGuide?: tourGuide.TourGuideProfile;
}

function MessageItem(props: IMessageItemProps) {
    const { theme } = useTheme();
    const styles = myStyle(theme);

    const { message, tourGuide } = props;

    const profileMe = useSelectProfile();

    const renderAvatar = useCallback(() => {
        let url = message?.sender === profileMe.role ? profileMe?.avatar : tourGuide?.avatar;
        return (
            <View style={styles.infoUser}>
                <Avatar imageStyle={styles.avatar} imageUrl={url}/>
            </View>
        )
    }, [tourGuide, profileMe]);

    return (
        <View style={styles.container}>
            <View style={[styles.messageContainer, message?.sender === profileMe.role ? { alignSelf: 'flex-end' } : {}]}>
                {
                    message?.sender === profileMe.role ? null : renderAvatar()
                }
                <View style={[styles.content, message?.sender === profileMe.role ? {} : { backgroundColor: getThemeColor().Color_Gray2 } ]}>
                    <Text style={styles.messageTxt}>{message?.message || ''}</Text>
                </View>
                {
                    message?.sender === profileMe.role ? renderAvatar() : null
                }
            </View>
        </View>
    );
}

export default MessageItem;

const myStyle = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            backgroundColor: color.Color_Bg,
        },
        content: {
            backgroundColor: color.Color_Secondary_Blue,
            paddingHorizontal: scales(15),
            paddingVertical: scales(10),
            marginHorizontal: scales(10),
            borderRadius: scales(20),
            maxWidth: Sizes.scrWidth - scales(90),
        },
        messageTxt: {
            ...Fonts.inter400,
            fontSize: scales(12),
            color: color.Text_Dark_1,
        },
        messageContainer: {
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: scales(15),
        },
        avatar: {
            width: scales(40),
            height: scales(40),
        },
        infoUser: {

        }
    });
}
