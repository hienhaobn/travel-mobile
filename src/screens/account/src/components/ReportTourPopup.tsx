import React, { forwardRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import RNModal from 'react-native-modal';

import Button from 'components/Button/Button';

import Input from 'components/Input';
import { useTheme } from 'hooks/useTheme';

import { Fonts } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { apiReportTourGuide } from 'states/orders/fetchReport';
import { showCustomToast } from 'utils/toast';

interface IReportTourPopupProps {
  onConfirm?: () => void;
  orderId: number;
}

export interface IReportTourPopupRef {
  showModal?: () => void;
  hideModal?: () => void;
}

const ReportTourPopup = (props: IReportTourPopupProps, ref: React.Ref<IReportTourPopupRef>) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { onConfirm, orderId } = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const[report, setReport] = useState<string>('');

  React.useImperativeHandle(ref, () => ({
    showModal,
    hideModal,
  }));

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  const handleConfirm = async () => {
    hideModal();
    if (onConfirm) {
      onConfirm();
    };

    const response = await apiReportTourGuide({ content: report, orderId });
    if (response) {
      showCustomToast('Báo cáo thành công!');
      setReport('');
    }
  };

  return (
    <RNModal
      isVisible={isVisible}
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      backdropTransitionInTiming={0}
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriverForBackdrop
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Gửi báo cáo</Text>
        <TextInput
          placeholder='Viết báo cáo'
          multiline
          value={report}
          onChangeText={setReport}
          style={{
            marginTop: scales(25),
            borderRadius: scales(8),
            borderWidth: 1,
            borderColor: getThemeColor().Light_2,
            padding: scales(10),
            height: scales(70),
          }}
        />
        <View style={styles.groupButton}>
          <Button title="Đóng" customStyles={styles.buttonCancel} disableGradient customTextStyles={styles.buttonCancelText} onPress={hideModal} />
          <Button title="Xác nhận" customStyles={styles.buttonConfirm} disableGradient onPress={handleConfirm} />
        </View>
      </View>
    </RNModal>
  );
};

export default forwardRef(ReportTourPopup);

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    modal: {
      marginHorizontal: scales(15),
    },
    container: {
      paddingHorizontal: scales(15),
      paddingVertical: scales(30),
      backgroundColor: color.white,
      borderRadius: scales(8),
    },
    groupButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: scales(25),
    },
    title: {
      ...Fonts.inter600,
      fontSize: scales(16),
      color: color.Text_Dark_1,
      textAlign: 'center',
    },
    text: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_1,
      marginTop: scales(12),
    },
    buttonCancel: {
      flex: 1,
      backgroundColor: color.Color_Gray2,
    },
    buttonCancelText: {
      color: color.Text_Dark_1,
    },
    buttonConfirm: {
      flex: 1,
      marginLeft: scales(20),
      backgroundColor: color.Color_Primary,
    },
    buttonReject: {
      flex: 1,
      marginLeft: scales(20),
      backgroundColor: color.Color_Red,
    },
  });
};
