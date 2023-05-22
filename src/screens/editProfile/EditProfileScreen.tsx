import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import SvgIcons from '../../assets/svgs';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { useTheme } from '../../hooks/useTheme';
import { Fonts, Sizes } from '../../themes';
import { getThemeColor } from '../../utils/getThemeColor';
import { scales } from '../../utils/scales';
import { goToEditProfile } from './src/utils';

function EditProfileScreen(props) {
    const { theme } = useTheme();
    const styles = myStyles(theme);


    const renderHeader = () => (
        <Header title='Sửa hồ sơ' />
    );

    const renderInputName = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Tên</Text>
            <Input
                placeholder="Vui lòng nhập tên"
            />
        </View>
    );

    const renderInputLocation = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Vị trí của bạn</Text>
            <Input
                placeholder="Vui lòng nhập vị trí của bạn"
            />
        </View>
    );

    const renderInputEmail = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Email</Text>
            <Input
                placeholder="Vui lòng nhập email"
            />
        </View>
    );

    const renderInputDes = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Giới thiệu</Text>
            <Input
                placeholder="Vui lòng nhập email"
                multiline
                containerStyle={{
                    height: scales(120),
                    width: '100%'
                }}
            />
        </View>
    );

    const renderContent = () => (
        <View style={styles.content}>
            <Avatar isEditAvatar containerStyle={{ alignSelf: 'center' }} />
            {renderInputEmail()}
            {renderInputName()}
            {renderInputLocation()}
            {renderInputDes()}
        </View>
    );


    const renderButton = () => (
        <Button title='Lưu' customStyles={styles.button}/>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView
                style={styles.wrapperContent}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
            >
                {renderContent()}
            </ScrollView>
            {renderButton()}
        </View>
    );
}

export default EditProfileScreen;


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
        title: {
            ...Fonts.inter400,
            fontSize: scales(14),
            color: color.Text_Dark_1,
            marginBottom: scales(8),
        },
        inputContainer: {
            marginTop: scales(10),
        },
        button: {
            marginBottom: Sizes.bottomSpace + scales(15),
            marginHorizontal: scales(15),
        }
    });
}
