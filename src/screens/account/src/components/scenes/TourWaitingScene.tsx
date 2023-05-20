import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Subscription } from 'rxjs';

import { userFetchOrderByStatus } from '../../api';

import { hideLoading, showLoading } from 'components/Loading';
import { useTheme } from 'hooks/useTheme';

import ListTourStatus from 'screens/account/src/components/ListTourStatus';
import { TourStatusScreenRouteProps } from 'screens/account/TourStatusScreen';

import { getThemeColor } from 'utils/getThemeColor';
import EventBus, { BaseEvent, EventBusName } from 'services/event-bus';


interface TourWaitingSceneProps {
  route: TourStatusScreenRouteProps;
}

const TourWaitingScene = (props: TourWaitingSceneProps) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { route } = props;
  const [orders, setOrders] = useState<order.OrderDetail[]>([]);
  const subScription = new Subscription();

  const getWaitingOrders = async () => {
    showLoading();
    const response = await userFetchOrderByStatus('waiting_purchase', route.role);
    hideLoading();
    setOrders(response);
  }

  const onSignUpEventBus = () => {
    subScription.add(
      EventBus.getInstance().events.subscribe((res: BaseEvent<string>) => {
        if (res?.type === EventBusName.ACTION_ORDER) {
          getWaitingOrders();
        }
      })
    )
  }

  // useEffect(() => {
  //   onSignUpEventBus();
  //   return () => {
  //     subScription?.unsubscribe?.();
  //   }
  // }, []);

  useEffect(() => {
    getWaitingOrders();
  }, []);

  return <View style={styles.container}><ListTourStatus route={route} data={orders} /></View>;
};

export default TourWaitingScene;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.Color_Bg,
    },
  });
};
