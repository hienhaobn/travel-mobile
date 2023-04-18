export type RootNavigatorParamList = {
  Home: undefined,
  Location: undefined,
  Messenger: undefined,
  Favorite: undefined,
  Account: undefined,
  Splash: undefined,
  Main: { screen?: string },
  LocationDetail: { provinceId: string },
  TourDetail: { tour: tour.Tour },
  Register: undefined,
  Login: undefined,
};
