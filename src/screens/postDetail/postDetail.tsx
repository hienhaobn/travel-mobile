
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import RenderHtml from 'react-native-render-html';

import ConfirmPopup, { IConfirmPopupRef } from './ConfirmPopup';
import { checkIsLiked, createComment, deleteComments, dislikePost, getPostComments, likePost, putComments, reportPost } from './src/api';

import Images from 'assets/images';
import SvgIcons from 'assets/svgs';

import Header from 'components/Header';
import { hideLoading, showLoading } from 'components/Loading';
import { useTheme } from 'hooks/useTheme';
import { useSelectProfile } from 'states/user/hooks';
import Sizes from 'themes/sizes';
import { getThemeColor } from 'utils/getThemeColor';
import { scales } from 'utils/scales';
import { showCustomToast } from 'utils/toast';
import Button from 'components/Button/Button';



const PostDetail = (props) => {
  // const { id } = route.params;
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const post = props.route.params;
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const onHandleLike = async () => {

    await likePost(post.id);
    // hideLoading();
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    getIsLiked();
  };
  const getIsLiked = async () => {
    const responseIsLiked = await
      checkIsLiked(post.id);
    setIsLiked(responseIsLiked);
  }
  useEffect(() => {
    getIsLiked();
  }, []);

  const [openReport, setOpenReport] = React.useState(false);
  const profile = useSelectProfile();
  const onPressBookmark = () => { };
  const onPressEllipsis = () => {
    setShow(!show);
  };

  return (
    <View style={styles.container}>
      <Header title='Bài viết' />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.heading}>{post.title}</Text>
          <View style={styles.userContainer}>
            <View style={styles.userContainerLeft}>
              <TouchableOpacity onPress={() => { }}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={{ uri: post.user ? post.user.avatar : post.tourGuide.avatar }}
                    style={styles.avatarImage}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.infoContainer}>
                <TouchableOpacity onPress={() => { }}>
                  <Text style={styles.nameText}>
                    {post.user ? post.user.username : post.tourGuide.name}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.timeText}>
                  {post.createdAt.split('T')[0].split('-').reverse().join('-')}
                </Text>
              </View>
            </View>

            <View style={styles.actionsContainer}>
              <Text style={styles.numberLike}>
                {like}
              </Text>
              <TouchableOpacity style={{ marginHorizontal: scales(10) }} onPress={onPressBookmark}>
                {isLiked ? <SvgIcons.IcHeartRed
                  color={getThemeColor().grey}
                  width={scales(22)}
                  height={scales(22)}
                  onPress={() => onHandleLike()}
                /> : <SvgIcons.IcHeartOutline
                  color={getThemeColor().grey}
                  width={scales(22)}
                  height={scales(22)}
                  onPress={() => onHandleLike()}
                />}

              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOpenReport(true)}>
                <SvgIcons.IcWarning
                  color={getThemeColor().grey}
                  width={scales(22)}
                  height={scales(22)}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.main}>

            <View style={styles.mainImgDetail}>
              <Image
                source={{ uri: post.image }}
                style={styles.mainImgDetail_img}
              />
            </View>
            {post.currentContent && (
              <RenderHtml
                contentWidth={Sizes.scrWidth}
                source={{ html: post.currentContent }}
              />
            )}
          </View>

          <View style={styles.reaction_wrapper}>
            <ModalScreen id={post?.id} user={profile} />
            <ModalReport
              // user={user}
              id={post?.id}
              close={() => setOpenReport(false)}
              show={openReport}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const ModalScreen = ({ id, user }: any) => {
  const [showModal, setShowModal] = useState(false);
  const { theme } = useTheme();
  const styles = myStyles(theme);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formatterDate = new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  // const service = new UserService();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [commentEdit, setCommentEdit] = useState('');
  const [deleteCommentId, setDeleteCommentId] = useState();

  const [show, setShow] = useState(false);
  const [showIndex, setShowIndex] = useState(0);
  const refConfirmOrderPopup = useRef<IConfirmPopupRef>(null);
  const actionButton = {
    title: 'Xóa bình luận',
    onConfirm: () => { handleDelete(deleteCommentId) },
    onReject: () => { setDeleteCommentId(null) },
    text: `Bạn có muốn xóa bình luận này ?`,
  };
  // action
  const getComments = async () => {
    const responseComment = await
      getPostComments(id);
    setComments(responseComment.data);
  }
  useEffect(() => {
    getComments();
  }, []);

  const postComment = async () => {
    try {
      if (comment) {
        showLoading();
        const res = await createComment(comment, null, id);
        if (res?.statusCode === 200) {
          setComment('');
          getComments();
        }
        hideLoading();
      } else {
        showCustomToast('Vui lòng nhập comment');
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleEdit = key => {
    let newData = comments?.map((item, index) => {
      if (index === key) {
        return {
          ...item,
          update: true,
        };
      }
      return {
        ...item,
        update: false,
      };
    });
    setComments(newData);
  };

  const postUpdate = async (value) => {

    try {
      if (commentEdit) {
        showLoading();
        let params = {
          content: commentEdit,
          id: value?.id,
        };
        const res = await putComments(value.id, commentEdit);

        if (res?.statusCode === 200) {
          getComments();
        }
        hideLoading();
      } else {
        showCustomToast('Vui lòng nhập comment');
      }
    } catch (error) { }
  };

  const onPressEllipsis = key => {
    setShowIndex(key);
    setShow(!show);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleDelete = async (id: number) => {
    try {
      if (id) {
        showLoading();
        const res = await deleteComments(id);
        console.log(res);
        if (res?.statusCode === 200) {
          getComments();
        }
        hideLoading();
      }
    } catch (error) { }
  };

  const openModalDelete = (data) => {
    setDeleteCommentId(data.id);
    refConfirmOrderPopup?.current.showModal();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.containerModal}>
        <Modal animationType={'slide'} transparent={true} visible={showModal}>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => {
                  setShowModal(!showModal);
                }}
              >
                <SvgIcons.IcBack
                  color={getThemeColor().grey}
                  width={scales(20)}
                  height={scales(20)}
                />
              </TouchableOpacity>
              {/* <Text style={styles.modal_endow_header}>
                100 bình luận
              </Text> */}
              <View style={styles.modal_endow}>

                <View style={styles.modal_endow_comment}>
                  <View style={styles.modal_endow_item}>
                    <View style={styles.modal_endow_images}>
                      {/* <Image source={Images.LOGO} style={styles.img} /> */}
                      <Image
                        source={
                          { uri: user.avatar }
                        }
                        style={styles.img}
                      />
                    </View>

                    <View style={styles.modal_endow_value}>
                      <TextInput
                        placeholder="Viết bình luận"
                        style={styles.inputModal}
                        onChangeText={setComment}
                        value={comment}
                      />
                      <TouchableOpacity
                        onPress={() => postComment()}
                        style={styles.reaction_item}
                      >
                        <SvgIcons.IcSend
                          color={getThemeColor().grey}
                          width={scales(24)}
                          height={scales(24)}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <ScrollView
                  style={styles.list_cmt}
                  horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                >
                  {comments?.map((c: any, key: number) => (
                    <View key={key} style={styles.cmt_item}>
                      <View style={styles.modal_endow_images}>
                        <Image
                          source={
                            user?.avatar ? { uri: user?.avatar } : Images.IcTourGuide
                          }
                          style={styles.img}
                        />
                      </View>
                      <View
                        style={{
                          borderBottomColor: 'rgba(128, 128, 128, 0.2)',
                          borderBottomWidth: 1,
                          paddingBottom: 5,
                          width: 250,
                        }}
                      >
                        <View style={styles.userContainer}>
                          <Text>
                            <Text>{c?.user?.username}</Text>
                            <Text style={styles.cmt_value_date}>
                              {` ${formatterDate.format(
                                Date.parse(c?.createdAt),
                              )}`}
                            </Text>
                          </Text>
                          {user?.id === c?.user?.id && (
                            <TouchableOpacity
                              onPress={() => onPressEllipsis(key)}
                            >
                              <SvgIcons.IcForward
                                name={'ellipsis-vertical'}
                                size={scales(24)}
                                style={styles.actionsIcon}
                              />
                            </TouchableOpacity>
                          )}
                          {show && key === showIndex && (
                            <TouchableOpacity style={styles.commentAction}>
                              <Text
                                style={styles.commentIcon}
                                onPress={() => {
                                  handleEdit(key);
                                  setShow(false);
                                }}
                              >
                                Sửa
                              </Text>
                              <Text
                                onPress={() => {
                                  openModalDelete(c);
                                  setShow(false);
                                }}
                                style={styles.commentIcon}
                              >
                                Xoá
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                        <View>
                          {c?.update ? (
                            <View style={styles.modal_endow_value_edit}>
                              <TextInput
                                placeholder="Sửa bình luận"
                                style={styles.inputModalEdit}
                                onChangeText={setCommentEdit}
                                defaultValue={c?.content}
                              />
                              <TouchableOpacity
                                onPress={() => postUpdate(c)}
                                style={styles.reaction_item_edit}
                              >
                                <Text>Sửa</Text>
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <View>
                              <Text
                                style={
                                  styles.cmt_value
                                }
                              >{`${c?.content}`}</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
          {/* {loading && (
            <Spinner
              mode={'overlay'}
              size={'large'}
              color={Color.YELLOW_HOLDER}
            />
          )} */}
        </Modal>

        <ConfirmPopup
          ref={refConfirmOrderPopup}
          onConfirm={actionButton.onConfirm}
          title={actionButton.title}
          onReject={actionButton.onReject}
          text={actionButton.text}
        />


      </View>
      <Button
        title="Bình luận"
        onPress={() => {
          setShowModal(!showModal);
        }}
        customStyles={{ marginTop: scales(10), marginBottom: scales(20), marginHorizontal: scales(10), width: Sizes.scrWidth - scales(50) }}
      />
    </SafeAreaView>
  );
};

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
export default PostDetail;


const myStyles = (theme: string) => {

  const color = getThemeColor();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.Color_Bg,
    },
    content: {
      paddingHorizontal: scales(15),
      marginTop: scales(20),
      marginBottom: scales(0),
      // height: Dimens.DEVICE_HEIGHT * 0.2,
      flex: 1,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#f5422a',
      color: '#fff',
      paddingHorizontal: scales(10),
      paddingVertical: scales(20),
      paddingTop: scales(40),
    },
    icon: {
      color: '#fff',
    },
    headerName: {
      color: '#fff',
      fontWeight: '600',
      fontSize: scales(18),
      lineHeight: scales(24),
    },
    main: {
      marginBottom: scales(20),
      // height: Dimens.DEVICE_HEIGHT,
      flex: 1,
    },
    mainTopic: {
      marginBottom: scales(20),
    },
    mainSubTitle: {
      color: '#757575',
      fontSize: scales(14),
      fontWeight: '500',
      lineHeight: scales(18),
      textTransform: 'uppercase',
      marginTop: scales(10),
    },
    mainTitle: { color: '#242424', fontSize: scales(28), fontWeight: '900', marginTop: scales(10) },
    mainList: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      fontSize: scales(14),
      paddingLeft: scales(0),
    },
    mainItemText: {
      backgroundColor: '#f2f2f2',
      borderRadius: scales(20),
      color: '#333',
      fontWeight: '500',
      lineHeight: scales(18),
      marginHorizontal: scales(3),
      marginVertical: scales(2),
      paddingHorizontal: scales(14),
      paddingVertical: scales(13),
    },
    blogList: {
      marginTop: scales(0),
    },
    blogItem: {
      borderWidth: scales(2),
      borderColor: '#e8e8e8',
      borderRadius: scales(16),
      padding: scales(20),
      marginTop: scales(10),
    },
    blogHeader: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    blogAuthor: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    blogAvt: {
      borderRadius: scales(9999),
      height: scales(28),
      resizeMode: 'cover',
      width: scales(28),
      overflow: 'hidden',
    },
    imgAvt: {
      width: '100%',
      height: '100%',
    },
    blogName: {
      marginLeft: scales(8),
      color: '#292929',
      fontSize: scales(12),
      fontWeight: '600',
    },
    blogTime: {
      fontSize: scales(13),
      color: '#242424',
    },
    blogMain: {
      width: '100%',
      height: scales(120),
      marginTop: scales(10),
      borderRadius: scales(10),
      overflow: 'hidden',
    },
    img: {
      width: '100%',
      height: '100%',
    },
    blogContent: {
      marginTop: scales(10),
    },
    blogTitle: {
      color: '#292929',
      fontSize: scales(14),
      fontWeight: '700',
      lineHeight: scales(16),
      marginBottom: scales(0),
    },
    blogDes: {},
    headerContainer: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: scales(28),
    },
    userContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: scales(20),
    },
    avatarContainer: {
      width: scales(50),
      height: scales(50),
      borderRadius: scales(999),
      overflow: 'hidden',
      marginRight: scales(10),
    },
    avatarImage: {
      width: '100%',
      height: '100%',
    },

    infoContainer: {},
    nameText: { color: '#292929', fontSize: scales(16), fontWeight: '600', margin: scales(0) },
    timeText: { color: '#757575', margin: scales(0) },
    numberLike: { fontSize: scales(16), color: getThemeColor().Text_Dark_1, margin: scales(0) },

    actionsContainer: {
      flexDirection: 'row',
    },
    userContainerLeft: {
      flexDirection: 'row',
    },
    heading: {
      fontSize: scales(24),
      fontWeight: 'bold',
    },
    actionsIcon: {
      color: '#757575',
      position: 'relative',
    },
    mainText: {},
    reaction_wrapper: { flexDirection: 'row' },
    reaction_item: {
      flexDirection: 'row',
      marginRight: scales(10),
      padding: scales(5),
    },
    reaction_item_edit: { flexDirection: 'row', marginRight: scales(10), padding: scales(0) },
    reaction_item_report: {
      flexDirection: 'row',
      marginRight: scales(10),
      marginTop: scales(10),
      padding: scales(5),
    },
    reaction_icon: {
      color: '#757575',
      fontSize: scales(16),
    },
    reaction_icon_report: {
      color: '#fff',
      fontSize: scales(16),
      marginLeft: scales(5),
    },
    reaction_text: {},
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
    tippy_module: {
      position: 'absolute',
      top: scales(20),
      right: scales(0),
      backgroundColor: '#F4F4F4',
      zIndex: 10,
      width: scales(190),
      paddingBottom: scales(10),
      padding: scales(7),
      borderRadius: scales(10),
    },
    tippy_module_coment: {
      position: 'absolute',
      top: scales(30),
      right: scales(60),
      backgroundColor: '#F4F4F4',
      zIndex: 10,
      width: scales(190),
      paddingBottom: scales(10),
      padding: scales(7),
      borderRadius: scales(10),
    },
    tippy_item: {
      paddingHorizontal: scales(10),
      paddingVertical: scales(5),
      flexDirection: 'row',
      borderBottomColor: '#E0E0E0',
      borderBottomWidth: scales(1),
    },
    tippy_icon: {},
    tippy_text: {
      color: '#444',
      fontSize: scales(15),
      marginLeft: scales(5),
    },
    list_cmt: {
      marginTop: scales(10),
      height: Sizes.scrHeight * 0.45,
      flexDirection: 'column',
      display: 'flex',
    },
    cmt_item: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: scales(10),
    },
    cmt_value: {
      color: '#444',
      fontSize: scales(13),
      marginLeft: scales(2),
    },
    cmt_value_date: {
      color: '#444',
      fontSize: scales(11),
      marginLeft: scales(2),
    },
    cmt_value_group: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    },
    // save
    headingTabs_tabs: {
      marginTop: scales(30),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      width: '100%',
    },
    headingTabs_item: {
      textAlign: 'center',
      margin: 'auto',
      borderBottomColor: '#0000008a',
      borderBottomWidth: scales(1),
      width: '50%',
    },
    headingTabs_item_active: {
      borderBottomColor: '#f05123',
      textAlign: 'center',
      margin: 'auto',
      borderBottomWidth: scales(1),
      width: '50%',
    },
    headingTabs_tabs_text: {
      textAlign: 'center',
      fontSize: scales(16),
      fontWeight: '700',
      color: '#0000008a',
      paddingBottom: scales(5),
    },
    headingTabs_tabs_text_active: {
      textAlign: 'center',
      fontSize: scales(16),
      fontWeight: '700',
      color: '#f05123',
      paddingBottom: scales(5),
    },
    blogcontent: {
      marginTop: scales(20),
    },
    blogcontentList: {},
    blogcontentItem: {
      marginTop: scales(10),
      borderWidth: scales(2),
      borderColor: '#e8e8e8',
      borderRadius: scales(16),
      paddingHorizontal: scales(20),
      paddingVertical: scales(15),
    },
    blogcontentItem_title: {
      color: '#333',
      fontSize: scales(19),
      lineHeight: scales(25),
      fontWeight: '600',
    },
    blogcontentItem_author: {},
    blogcontentItem_time: {
      fontSize: scales(14),
      color: '#029e74',
    },
    blogcontentItem_name: { fontSize: scales(14), marginVertical: scales(5) },
    blogcontentItem_strong: { fontWeight: '600', marginLeft: scales(5) },
    hidden: {
      display: 'none',
    },
    blogcontentItem_group: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    commentAction: {
      position: 'absolute',
      right: scales(20),
      top: scales(0),
      width: scales(40),
      backgroundColor: 'grey',
      borderBottomEndRadius: scales(10),
    },
    commentIcon: {
      margin: scales(5),
      color: 'white',
    },
    nodataMain: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    nodata: {
      width: scales(200),
      height: scales(200),
    },
    imgNodata: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    textNodata: {
      fontSize: scales(19),
      lineHeight: scales(25),
      fontWeight: '600',
    },
    modal_title: {
      color: '#333',
      fontSize: scales(23),
      lineHeight: scales(25),
      fontWeight: '700',
      textAlign: 'center',
      marginTop: scales(20),
    },
    mainImgDetail: {
      marginTop: scales(30),
      width: '100%',
      height: scales(200),
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      paddingHorizontal: scales(20),
    },
    mainImgDetail_img: {
      width: '100%',
      height: '100%',
      borderRadius: scales(50),
    },
  });

};
