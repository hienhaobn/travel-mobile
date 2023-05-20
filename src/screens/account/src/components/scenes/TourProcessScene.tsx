import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { userFetchOrderByStatus } from '../../api';

import { useTheme } from 'hooks/useTheme';
import ListTourStatus from 'screens/account/src/components/ListTourStatus';
import { TourStatusScreenRouteProps } from 'screens/account/TourStatusScreen';
import { useFetchOrderProcessing, useSelectOrderProcessing } from 'states/orders/hooks';
import { getThemeColor } from 'utils/getThemeColor';
import { Subscription } from 'rxjs';
import EventBus, { BaseEvent, EventBusName } from 'services/event-bus';

interface TourProcessSceneProps {
  route: TourStatusScreenRouteProps
}

const TourProcessScene = (props: TourProcessSceneProps) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { route } = props;
  const [orders, setOrders] = useState<order.OrderDetail[]>([]);
  const subScription = new Subscription();

  const getProcessingOrders = async () => {
    const response = await userFetchOrderByStatus('processing', route.role);
    setOrders(response);
  }

  const onSignUpEventBus = () => {
    subScription.add(
      EventBus.getInstance().events.subscribe((res: BaseEvent<string>) => {
        if (res?.type === EventBusName.ACTION_ORDER) {
          getProcessingOrders();
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
    getProcessingOrders();
  }, []);

  return (
    <View style={styles.container}>
      <ListTourStatus route={route} data={orders} />
    </View>
  );
};

export default TourProcessScene;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.Color_Bg,
    },
  });
};
