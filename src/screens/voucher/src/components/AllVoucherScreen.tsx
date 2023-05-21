import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import ListVouchers from './ListVoucherScreen';

import { useTheme } from 'hooks/useTheme';

import { getThemeColor } from 'utils/getThemeColor';
import { VoucherScreenRouteProps } from 'screens/voucher/VoucherScreen';
import { hideLoading, showLoading } from 'components/Loading';
import { fetchVouchers } from '../api';
import EventBus, { BaseEvent, EventBusName } from 'services/event-bus';
import { Subscription } from 'rxjs';

interface VoucherSceneProps {
  route: VoucherScreenRouteProps;
}

const AllVoucherScreen = (props: VoucherSceneProps) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { route } = props;
  const [vouchers, setVouchers] = useState<voucher.Voucher[]>([]);
  const subScription = new Subscription();

  const getVouchers = async () => {
    // showLoading();
    const response = await fetchVouchers();
    // hideLoading();
    setVouchers(response.data);

  }
  const onSignUpEventBus = () => {
    subScription.add(
      EventBus.getInstance().events.subscribe((res: BaseEvent<string>) => {
        if (res?.type === EventBusName.CLAIM_SUCCESS) {
          getVouchers();
        }
      })
    )
  }

  useEffect(() => {
    onSignUpEventBus();
    return () => {
      subScription?.unsubscribe?.();
    }
  }, []);

  useEffect(() => {
    getVouchers();
  }, []);


  return <ListVouchers route={route} data={vouchers} />;
};

export default AllVoucherScreen;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.Color_Bg,
    },
  });
};
