import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import ListVouchers from './ListVoucherScreen';

import { hideLoading, showLoading } from 'components/Loading';
import { useTheme } from 'hooks/useTheme';

import { TourStatusScreenRouteProps } from 'screens/account/TourStatusScreen';


import { getThemeColor } from 'utils/getThemeColor';

import { fetchMyVouchers } from '../api';
import { Subscription } from 'rxjs';
import EventBus, { BaseEvent, EventBusName } from 'services/event-bus';


interface TourWaitingSceneProps {
  route: TourStatusScreenRouteProps;
}

const MyListVoucherScreen = (props: TourWaitingSceneProps) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { route } = props;
  const [vouchers, setVouchers] = useState<voucher.Voucher[]>([]);

  const subScription = new Subscription();

  const getMyVouchers = async () => {
    // showLoading();
    const response = await fetchMyVouchers();
    // hideLoading(); 
    setVouchers(response);

  }

  const onSignUpEventBus = () => {
    subScription.add(
      EventBus.getInstance().events.subscribe((res: BaseEvent<string>) => {
        if (res?.type === EventBusName.CLAIM_SUCCESS) {
          getMyVouchers();
        }
      })
    )
  }

  useEffect(() => {
    onSignUpEventBus();
    return () => {
      subScription?.unsubscribe?.();
    }
  }, [])

  useEffect(() => {
    getMyVouchers();
  }, []);

  return <ListVouchers route={route} data={vouchers} />;
};

export default MyListVoucherScreen;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.Color_Bg,
    },
  });
};
