import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import ListTourStatus from 'screens/account/src/components/ListTourStatus';
import { TourStatusScreenRouteProps } from 'screens/account/TourStatusScreen';
import { getThemeColor } from 'utils/getThemeColor';
import { userFetchOrderByStatus } from '../../api';
import { Subscription } from 'rxjs';
import EventBus, { BaseEvent, EventBusName } from 'services/event-bus';

interface TourFinishSceneProps {
  route: TourStatusScreenRouteProps
}

const TourFinishScene = (props: TourFinishSceneProps) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { route } = props;

  const [orders, setOrders] = useState<order.OrderDetail[]>([]);
  const subScription = new Subscription();

  const getFinishOrders = async () => {
    const response = await userFetchOrderByStatus('end', route.role);
    setOrders(response);
  }

  const onSignUpEventBus = () => {
    subScription.add(
      EventBus.getInstance().events.subscribe((res: BaseEvent<string>) => {
        if (res?.type === EventBusName.ACTION_ORDER) {
          getFinishOrders();
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
    getFinishOrders();
  }, []);

  return (
    <View style={styles.container}>
      <ListTourStatus route={route} data={orders} />
    </View>
  );
};

export default TourFinishScene;

const myStyles = (theme: string) => {
  const color = getThemeColor();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.Color_Bg,
    },
  });
};
