import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import ListTourStatus from 'screens/account/src/components/ListTourStatus';
import { TourStatusScreenRouteProps } from 'screens/account/TourStatusScreen';
import { useFetchOrderFinished, useSelectOrderFinished } from 'states/orders/hooks';
import { getThemeColor } from 'utils/getThemeColor';

interface TourFinishSceneProps {
  route: TourStatusScreenRouteProps
}

const TourFinishScene = (props: TourFinishSceneProps) => {
  const { theme } = useTheme();
  const styles = myStyles(theme);
  const { route } = props;
  useFetchOrderFinished();
  const { data, isLoading } = useSelectOrderFinished();

  return (
    <View style={styles.container}>
      <ListTourStatus route={route} data={data} isLoading={isLoading} />
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
