import { useFocusEffect } from '@react-navigation/native';
import Avatar from 'components/Avatar';
import { ESender } from 'constants/chat';
import { EVENTS_SOCKET } from 'constants/socket';
import { SocketContext } from 'contexts/SocketContext';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import SvgIcons from 'assets/svgs';

import Input from 'components/Input';
import TouchableOpacity from 'components/TouchableOpacity';

import { useTheme } from 'hooks/useTheme';

import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { goToConversation } from '../conversation/src/utils';

const MessengerScreen = () => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const socket = useContext(SocketContext);
  const [conversations, setConversations] = useState<chat.Message[]>([]);

  useFocusEffect(useCallback(() => {
    socket.emit(EVENTS_SOCKET.GET_USERS);
    return () => {
      socket.off(EVENTS_SOCKET.GET_USERS);
    };
  }, []));

  useEffect(() => {
    socket.on(EVENTS_SOCKET.RECEIVE_USERS, (conversations) => {
      setConversations(conversations);
    });
    return () => {
      socket.off(EVENTS_SOCKET.RECEIVE_USERS);
    };
  }, []);

  const renderConversation = (item) => {
    const name = item.sender === ESender.USER ? item?.user?.username : item?.tourGuide?.username;
    const lastMessage = item?.message;
    const imageUrl = item.sender === ESender.USER ? item?.user?.avatar : item?.tourGuide?.avatar;
    const chatId = item.sender === ESender.USER ? item?.tourGuideId : item?.userId;
    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.conventionContainer} onPress={() => goToConversation(`${chatId}`)}>
        <View style={styles.leftContainer}>
          <Avatar imageStyle={styles.avatar} imageUrl={imageUrl} />
          <View style={styles.messageContainer}>
            <Text style={styles.account}>{name}</Text>
            <Text style={styles.message} numberOfLines={1}>{lastMessage}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.time}>15:23</Text>
          <View style={styles.unreadContainer}>
            <Text style={styles.unread}>2</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = useCallback(
    () => (
      <View style={styles.searchContainer}>
        <Input
          placeholder='Tìm địa điểm'
          leftIcon={
            <SvgIcons.IcSearch color={getThemeColor().Text_Dark_1} width={scales(24)} height={scales(24)} />
          }
          leftIconStyle={{
            paddingLeft: scales(10),
          }}
          containerStyle={styles.inputContainer}
        />
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={conversations}
        renderItem={({ item }) => renderConversation(item)}
        keyExtractor={(item) => item.toString()}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MessengerScreen;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Sizes.statusBarHeight,
      backgroundColor: color.Color_Bg,
    },
    searchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: scales(15),
      marginTop: scales(12),
      marginBottom: scales(10),
    },
    inputContainer: {
      flex: 1,
      shadowColor: color.Text_Dark_1,
      shadowOffset: { width: -1, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      borderRadius: 50,
    },
    conventionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: scales(15),
      marginTop: scales(15),
    },
    leftContainer: {
      flexDirection: 'row',
    },
    messageContainer: {
      marginLeft: scales(10),
      maxWidth: Sizes.scrWidth - scales(120),
    },
    account: {
      ...Fonts.inter700,
      fontSize: scales(14),
      color: color.Text_Dark_1,
    },
    message: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_1,
      marginTop: scales(5),
    },
    time: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_3,
    },
    unread: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.white,
    },
    unreadContainer: {
      backgroundColor: color.Color_Primary,
      borderRadius: scales(100),
      width: scales(15),
      height: scales(15),
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
    },
    avatar: {
      width: scales(50),
      height: scales(50),
    }
  });
};
