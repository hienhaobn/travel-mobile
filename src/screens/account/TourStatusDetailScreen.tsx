import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { color, log, or } from 'react-native-reanimated';

import { apiCancelOrder } from './src/api';
import CancelOrderPopup, { IConfirmPopupRef } from './src/components/CancelOrderPopup';

import ReportTourPopup, { IReportTourPopupRef } from './src/components/ReportTourPopup';

import SvgIcons from 'assets/svgs';
import Button from 'components/Button/Button';

import Header from 'components/Header';

import { EOrderStatus } from 'constants/order';
import { ETourTypesValue } from 'constants/tours';

import { useTheme } from 'hooks/useTheme';

import { RootNavigatorParamList } from 'navigation/types';

import { reportPost } from 'screens/postDetail/src/api';
import TourDetailImages from 'screens/tourDetail/src/components/TourDetailImages';

import { fetchTourById } from 'states/tours/fetchTours';

import { useSelectProfile } from 'states/user/hooks';
import { Fonts, Sizes } from 'themes';

import { getThemeColor } from 'utils/getThemeColor';
import { formatCurrency } from 'utils/number';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';
import { apiReportTourGuide } from 'states/orders/fetchReport';


interface ITourStatusDetailScreenProps {
  route: RouteProp<RootNavigatorParamList, 'TourStatusDetail'>;
}

const TourStatusDetailScreen = (props: ITourStatusDetailScreenProps) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { route } = props;
  const { order } = route.params;
  const { tour } = order;
  const [tourDetail, setTourDetail] = useState<tour.Tour>(null);
  const [openReport, setOpenReport] = React.useState(false);
  const refCancelOrderPopup = useRef<IConfirmPopupRef>(null);
  const refReportPopup = useRef<IReportTourPopupRef>(null);
  const profile = useSelectProfile();
  console.log('order', order)
  const actionButton = {
    title: 'Bạn có muốn hủy chuyến đi này ?',
    onConfirm: () => apiCancelOrder(order.id, profile.role),
    text: `Việc hủy chuyến đi đã thanh toán cọc, có thể khiến bạn bị mất tiền cọc`,
  };
  const getTourById = async () => {
    const response = await fetchTourById(tour.id);
    setTourDetail(response);

  };

  useEffect(() => {
    getTourById();
  }, []);

  const onReport = () => {
    refReportPopup?.current?.showModal();
  };

  const renderContent = () => (
    <ScrollView>
      <View style={styles.content}>
        <Text style={styles.tourName}>{tour?.name}</Text>
        <View>
          <View style={styles.rateContainer}>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <View>
                <View style={styles.voteContainer}>
                  <Text style={styles.textBold}>9</Text>
                </View>
                <View style={styles.voteBka} />
              </View>
              <View
                style={{
                  marginLeft: scales(8),
                }}
              >
                <Text style={styles.rate}>{tour.rates ? tour.rates.length : 0} lượt đánh giá</Text>
                <Text style={styles.care}>{tour.rates ? tour.rates.length : 0} quan tâm</Text>
              </View>
            </View>
            <View style={styles.typeContainer}>
              <Text style={styles.desc}>{ETourTypesValue[tourDetail?.type]}</Text>
            </View>
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.desc}>
              Số người tối đa: <Text style={styles.textBold}>{tourDetail?.maxMember}</Text>
            </Text>
            <View>
              <Text style={styles.desc}>
                Phí phụ thu: <Text style={styles.textBold}>{tourDetail?.numOfFreeMember}/người</Text>
              </Text>
              <Text style={styles.desc}>(Khi vượt quá tối đa người)</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceTitle}>Giá: </Text>
            <Text style={styles.priceTxt}>{formatCurrency(tourDetail?.basePrice)}đ</Text>
          </View>
        </View>
        {/* <TourDetailImages /> */}
        {/* Mo ta tour */}
        <View>
          <Text style={styles.desc}>{tourDetail?.description?.trim()}</Text>
        </View>
        <View style={styles.overviewContainer}>
          <Text style={styles.textBold}>ĐIỂM NỔI BẬT NHẤT</Text>
          <Text style={styles.desc}>{tourDetail?.overview?.trim()}</Text>
        </View>
        {/* Lich trinh */}
        <View style={styles.scheduleContainer}>
          <Text style={styles.textBold}>LỊCH TRÌNH</Text>
          {tourDetail?.tourSchedule?.map((element, index) => (
            <View key={element.id}>
              <Text style={styles.textBold}>
                Ngày {index + 1}: {element.title}
              </Text>
              <Text style={styles.desc}>{element.content}</Text>
            </View>
          ))}
        </View>
      </View>
      {
        [EOrderStatus.DONE, EOrderStatus.PROCESSING, EOrderStatus.REJECTED, EOrderStatus.WAITING_TOUR_GUIDE].includes(order?.status) ? (
          order.status === EOrderStatus.PROCESSING ? (
            <Button
              title="Báo cáo chuyến đi"
              onPress={onReport}
              customStyles={{ marginTop: scales(10), marginBottom: scales(20), marginHorizontal: scales(10) }}
            />
          ) : null
        ) : (
          <Button
            title="Hủy chuyến đi"
            onPress={refCancelOrderPopup?.current?.showModal}
            customStyles={{ marginTop: scales(10), marginBottom: scales(20), marginHorizontal: scales(10) }}
          />
        )
      }

    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <Header title="Chi tiết chuyến đi" />
      {renderContent()}
      <ModalReport
        // user={user}
        id={1}
        close={() => setOpenReport(false)}
        show={openReport}
      />
      <CancelOrderPopup
        ref={refCancelOrderPopup}
        onConfirm={actionButton.onConfirm}
        title={actionButton.title}
        onReject={actionButton.onReject}
      />
      <ReportTourPopup
        ref={refReportPopup}
        orderId={order?.id}
      />
    </View>
  );
};

export default TourStatusDetailScreen;

const ModalReport = ({ id, show, close, user }: any) => {
  const { theme } = useTheme();

  const styles = myStyles(theme);

  const [report, setReport] = React.useState('');

  const handleReport = async () => {
    try {
      if (report) {
        const params = {
          postId: id,
          reason: report,
        };
        const res = await reportPost(params.postId, params.reason);
        if (res?.statusCode === 200) {
          showCustomToast('Gửi báo cáo thành công !');
          close();
        } else {
          showCustomToast(res?.message ?? '');
        }
      }
    } catch (error) {
      showCustomToast(error?.message ?? '');
      close();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.containerModal}>
        <Modal animationType={'slide'} transparent={true} visible={show}>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => {
                  close();
                }}
              >
                <SvgIcons.IcBack color={getThemeColor().Color_Gray} width={scales(14)} height={scales(14)} />
              </TouchableOpacity>
              <View style={styles.modal_endow}>
                <Text style={styles.modal_title}>Báo cáo bài viết</Text>
                <View style={styles.modal_endow_comment}>
                  <View style={styles.modal_endow_item_report}>
                    <View style={styles.modal_endow_value_report}>
                      <TextInput
                        multiline={true}
                        textContentType="givenName"
                        placeholder="Viết báo cáo"
                        style={styles.inputModalReport}
                        onChangeText={setReport}
                        value={report}
                        numberOfLines={4}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        handleReport();
                      }}
                      style={styles.modal_bottom_btn_primary}
                    >
                      <Text style={styles.modal_button_btn_text_primary}>
                        Gửi báo cáo
                      </Text>
                      {/* <SvgIcons.IcHeartRed width={scales(12)} height={scales(12)} /> */}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.Color_Bg,
    },
    content: {
      marginHorizontal: scales(15),
    },
    tourName: {
      ...Fonts.inter600,
      fontSize: scales(18),
      color: color.Text_Dark_1,
    },
    rateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    rate: {
      ...Fonts.inter400,
      fontSize: scales(14),
      color: color.Text_Dark_1,
    },
    care: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: color.Text_Dark_1,
    },
    shopContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: getThemeColor().Color_Red,
      paddingVertical: scales(10),
      paddingHorizontal: scales(20),
      borderRadius: scales(4),
    },
    sellNow: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: getThemeColor().white,
      paddingLeft: scales(3),
    },
    showInfoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: scales(10),
      paddingHorizontal: scales(20),
      borderRadius: scales(4),
      borderWidth: 1,
      borderColor: getThemeColor().Color_Primary,
      marginLeft: scales(8),
    },
    textShowInfo: {
      ...Fonts.inter400,
      fontSize: scales(11),
      color: getThemeColor().Color_Primary,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: Sizes.bottomSpace + scales(5),
      marginHorizontal: scales(15),
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: scales(15),
      marginHorizontal: scales(15),
    },
    priceTxt: {
      ...Fonts.inter600,
      fontSize: scales(16),
      color: getThemeColor().Color_Red,
    },
    priceTitle: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: getThemeColor().Text_Dark_1,
    },
    image: {
      width: Sizes.scrWidth - scales(30),
      height: Sizes.scrHeight / 3,
      borderRadius: scales(10),
      marginRight: scales(12),
    },
    textBold: {
      ...Fonts.inter600,
      fontSize: scales(14),
      color: getThemeColor().Text_Dark_1,
      lineHeight: scales(25),
    },
    voteBka: {
      width: 0,
      height: 0,
      borderStyle: 'solid',
      overflow: 'hidden',
      borderTopWidth: 15,
      borderRightWidth: 10,
      borderBottomWidth: 0,
      borderLeftWidth: 16,
      borderTopColor: getThemeColor().Color_Secondary_Light_Yellow,
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
      transform: [{ rotate: '-10deg' }, { translateX: 2 }, { translateY: -3 }],
    },
    voteContainer: {
      backgroundColor: getThemeColor().Color_Secondary_Light_Yellow,
      width: scales(50),
      height: scales(40),
      borderRadius: scales(4),
      justifyContent: 'center',
      alignItems: 'center',
    },
    desc: {
      ...Fonts.inter400,
      fontSize: scales(12),
      color: getThemeColor().Text_Dark_1,
      lineHeight: scales(19),
    },
    scheduleContainer: {
      marginBottom: scales(15),
      marginTop: scales(20),
    },
    typeContainer: {
      backgroundColor: color.Color_Gray2,
      paddingHorizontal: scales(10),
      paddingVertical: scales(2),
      borderRadius: scales(8),
    },
    overviewContainer: {
      marginTop: scales(20),
    },
    modalContent: {
      backgroundColor: 'white',
      padding: scales(20),
      borderRadius: scales(14),
      width: '100%',
    },
    containerModal: {
      flex: 1,
      borderRadius: scales(15),
      marginVertical: scales(2),
    },
    modal: {
      flex: 1,
      backgroundColor: '#0000004a',
      padding: scales(20),
      paddingTop: scales(100),
      borderRadius: scales(15),
    },
    modal_endow: {
      // textAlign: 'center',
      marginTop: scales(10),
    },
    modalClose: {},
    modalCloseIcon: {
      textAlign: 'right',
    },
    modal_endow_comment: {},
    modal_endow_item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal_endow_item_report: {
      flexDirection: 'column',
    },
    modal_endow_images: {
      width: scales(30),
      height: scales(30),
      borderRadius: scales(999),
      overflow: 'hidden',
      marginRight: scales(10),
    },
    modal_endow_value: {
      flexDirection: 'row',
      alignItems: 'center',
      width: Sizes.scrWidth * 0.5,
      justifyContent: 'space-between',
      flex: 1,
    },
    modal_endow_value_edit: {
      flexDirection: 'row',
      alignItems: 'center',
      width: Sizes.scrWidth * 0.65,
      justifyContent: 'space-between',
      flex: 1,
    },
    modal_endow_value_report: {
      flexDirection: 'column',
      alignItems: 'center',
      width: Sizes.scrWidth * 0.8,
      justifyContent: 'center',
    },
    inputModal: {
      borderBottomWidth: scales(1),
      borderBottomColor: '#ccc',
      outline: 'none',
      flex: 1,
      width: Sizes.scrWidth * 0.6,
    },
    inputModalReport: {
      borderWidth: scales(1),
      borderColor: '#ccc',
      outline: 'none',
      // flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      width: Sizes.scrWidth * 0.8,
      justifyContent: 'center',
      marginTop: scales(20),
      textAlignVertical: 'top',
      padding: scales(10),
      borderRadius: scales(10),
    },
    modal_bottom_btn_primary: {
      padding: scales(10),
      backgroundColor: '#f05123',
      borderRadius: scales(10),
      borderWidth: 1,
      borderColor: '#ccc',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: scales(15),
    },
    modal_button_btn_text_primary: {
      color: '#fff',
    },
    modal_endow_header: {
      fontSize: scales(20),
      fontWeight: 'bold',
    },
    modal_title: {
      color: '#333',
      fontSize: scales(23),
      lineHeight: scales(25),
      fontWeight: '700',
      textAlign: 'center',
      marginTop: scales(20),
    },
  });
};
