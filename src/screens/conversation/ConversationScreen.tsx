import { RouteProp } from '@react-navigation/native';
import { EVENTS_SOCKET } from 'constants/socket';
import { Role } from 'constants/user';
import { SocketContext } from 'contexts/SocketContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from 'hooks/useTheme';
import { RootNavigatorParamList } from 'navigation/types';
import { goBack } from 'navigation/utils';
import { useSelectProfile } from 'states/user/hooks';
import { getThemeColor } from 'utils/getThemeColor';
import SvgIcons from 'assets/svgs';

import TouchableOpacity from 'components/TouchableOpacity';
import { scales } from 'utils/scales';
import Avatar from 'components/Avatar';
import Input from 'components/Input';
import { Fonts, Sizes } from 'themes';
import MessageItem from './src/components/MessageItem';

interface IConversationScreenProps {
    route: RouteProp<RootNavigatorParamList, 'Conversation'>
}

function ConversationScreen(props: IConversationScreenProps) {
    const { theme } = useTheme();
    const styles = myStyle(theme);
    const { chatId, user, tourGuide } = props.route.params;
    const [contentMessage, setContentMessage] = useState<string>('');
    const [messages, setMessages] = useState<chat.Message[]>([]);
    const [messageSocket, setMessageSocket] = useState<chat.Message[]>([]);

    const recipient = useRef<boolean>(true);
    const profileSelector = useSelectProfile();

    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.emit(EVENTS_SOCKET.GET_MESSAGES, { chatId });
        socket.emit(EVENTS_SOCKET.JOIN_ROOM, { chatId });
    }, []);

    useEffect(() => {
        socket.on(EVENTS_SOCKET.RECEIVE_MESSAGE, (res) => {
            if (!recipient.current) {
                recipient.current = true;
                setMessageSocket(res);
            } else {
                setMessages(res);
            }
        });
        return () => {
            socket.off(EVENTS_SOCKET.RECEIVE_MESSAGE);
            socket.off(EVENTS_SOCKET.JOIN_ROOM);
            socket.off(EVENTS_SOCKET.GET_MESSAGES);
            socket.off(EVENTS_SOCKET.SEND_MESSAGE);
        }
    }, []);

    useEffect(() => {
        if (recipient.current) {
            recipient.current = false;
            setMessages([...messages, ...messageSocket]);
        }
    }, [messageSocket]);

    const onSendMessage = () => {
        socket.emit(EVENTS_SOCKET.SEND_MESSAGE, { chatId, content: contentMessage })
        // socket.emit(EVENTS_SOCKET.GET_MESSAGES, { chatId });
        const messageTmp = [{
            id: Date.now(),
            created_at: Date.now(),
            message: contentMessage,
            sender: profileSelector?.role,
        }];
        // @ts-ignore
        setMessages([...messages, ...messageTmp]);
        setContentMessage('');
    };

    const renderHeader = () => (
        <View style={styles.wrapHeader}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeftContainer}>
                    <TouchableOpacity style={styles.iconBack} onPress={goBack}>
                        <SvgIcons.IcBack width={scales(17)} height={scales(17)} color={getThemeColor().Text_Dark_1} />
                    </TouchableOpacity>
                    <View style={styles.headerLeftContainer}>
                        <Avatar imageStyle={styles.avatar} imageUrl={profileSelector?.role === Role.USER ? tourGuide?.avatar : user?.avatar}/>
                        <View style={styles.onlineContainer}>
                            <Text style={styles.name}>{profileSelector?.role === Role.USER ? tourGuide?.name : user?.username}</Text>
                            <Text style={styles.online}>Hoạt động 5 phút trước</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.9}>
                    <SvgIcons.IcMore width={scales(17)} height={scales(17)} color={getThemeColor().Text_Dark_1} />
                </TouchableOpacity>
            </View>
        </View>
    );


    const renderMessages = () => (
        <FlatList
            inverted
            data={messages}
            renderItem={(item) => <MessageItem message={item.item} tourGuide={tourGuide} user={user}/>}
            style={styles.wrapperContent}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => `${item?.id}`}
        />
    );

    const renderInput = () => (
        <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.iconPlus}>
                <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
            <Input
                placeholder='Nhắn tin'
                containerStyle={{ flex: 1, borderRadius: scales(20) }}
                leftIcon={<SvgIcons.IcMessageText width={scales(17)} height={scales(17)} color={getThemeColor().Text_Dark_1} />}
                leftIconStyle={styles.leftIcon}
                value={contentMessage}
                onChangeText={setContentMessage}
            />
            <TouchableOpacity style={styles.sendContainer} onPress={onSendMessage}>
                <SvgIcons.IcSend width={scales(22)} height={scales(22)} color={getThemeColor().Text_Dark_1} />
            </TouchableOpacity>
        </View>
    );

    return (

    <View style={styles.container}>
        {renderHeader()}
        {renderMessages()}
        {renderInput()}
    </View>
    );
}

export default ConversationScreen;

const myStyle = (theme: string) => {
    const color = getThemeColor();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.Color_Bg,
        },
        wrapHeader: {
            borderBottomWidth: 0.5,
            borderColor: color.Text_Dark_3,
        },
        headerContainer: {
            marginHorizontal: scales(15),
            marginTop: Sizes.statusBarHeight + scales(5),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: scales(10),
        },
        headerLeftContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        onlineContainer: {
            marginLeft: scales(10),
        },
        row: {
            flexDirection: 'row',
        },
        avatar: {
            width: scales(50),
            height: scales(50),
        },
        iconBack: {
            marginRight: scales(8),
        },
        name: {
            ...Fonts.inter600,
            fontSize: scales(16),
            color: color.Text_Dark_1,
        },
        online: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_3,
        },
        wrapperContent: {
            flexGrow: 1,
            marginHorizontal: scales(15),
        },
        contentContainer: {
            paddingBottom: scales(30),
            marginTop: scales(15),
            flexDirection: 'column-reverse',
        },
        iconPlus: {
            paddingHorizontal: scales(12),
            paddingVertical: scales(6),
            backgroundColor: color.Color_Gray2,
            borderRadius: 100,
            marginRight: scales(15),
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: scales(15),
            paddingVertical: scales(10),
        },
        sendContainer: {
            marginLeft: scales(15),
        },
        leftIcon: {
            marginLeft: scales(8),
        },
        plus: {
            ...Fonts.inter600,
            fontSize: scales(14),
            color: color.Text_Dark_1,
        }
    });
}
