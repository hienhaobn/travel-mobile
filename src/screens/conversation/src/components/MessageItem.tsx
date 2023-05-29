import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { Fonts, Sizes } from 'themes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import Avatar from '../../../../components/Avatar';

interface IMessageItemProps {
    isSender: boolean;
}

function MessageItem(props: IMessageItemProps) {
    const { theme } = useTheme();
    const styles = myStyle(theme);

    const { isSender } = props;

    const renderAvatar = () => (
        <View style={styles.infoUser}>
            <Avatar imageStyle={styles.avatar}/>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={[styles.messageContainer, isSender ? { alignSelf: 'flex-end' } : {}]}>
                {
                    !isSender ? renderAvatar() : null
                }
                <View style={[styles.content, !isSender ? { backgroundColor: getThemeColor().Color_Gray2 } : {  }]}>
                    <Text style={styles.messageTxt}>MessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessage MessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessage</Text>
                </View>
                {
                    isSender ? renderAvatar() : null
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
            width: Sizes.scrWidth - scales(90),
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
