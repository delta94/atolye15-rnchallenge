import * as React from 'react';
import {StatusBar, View, Platform} from 'react-native';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import styled from 'styled-components';
import {space, layout, color} from 'styled-system';

import Colors from './RootModel';
import RootHeader from './RootHeader';
import RootDescription from './RootDescription';

import {MainComponent, ButtonNavigationComponent} from '../assets/components';
import {ServiceManager} from '../services';

const Content = styled(View)(
  {
    flex: 1,
    width: '100%',
  },
  space,
  layout,
  color,
);

function RootScreen({route, navigation}) {
  const {CancelToken} = axios;
  const source = CancelToken.source();

  // MARK: -

  const [loading, setLoading] = React.useState(true);
  const [permissionStatus, setPermissionStatus] = React.useState(null);

  const [detailData, setDetailData] = React.useState(null);

  const [theme, setTheme] = React.useState(Colors['0']);

  // MARK: - Navigation Props

  navigation.setOptions({
    headerRight: () => (
      <ButtonNavigationComponent
        mr={14}
        name="alert-circle"
        onPress={() => {
          navigation.navigate('SupportScreen', {
            title: 'Hakkımızda',
            uri: 'https://www.atolye15.com/contact',
          });
        }}
      />
    ),
  });

  // MARK: - Screen Focus Hooks

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StatusBar.setBarStyle('dark-content', false);

      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(theme.background, true);
      }

      // MARK: -

      getLocationPermissionStatus();
    });

    return unsubscribe;
  }, [navigation, getLocationPermissionStatus, theme]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setLoading(false);

      // Mark: -

      source.cancel('Operation canceled by the user.');
    });

    return unsubscribe;
  }, [navigation, source]);

  // MARK: - Location Permission Props

  const getLocationPermissionStatus = React.useCallback(() => {
    check(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then((result) => {
        console.log(result);

        setPermissionStatus(result);

        // MARK: -

        if (result !== permissionStatus && result !== RESULTS.GRANTED) {
          navigation.navigate('PermissionContainer', {
            screen: 'PermissionScreen',
            params: {status: result},
          });
        } else if (result !== permissionStatus && result !== RESULTS.DENIED) {
          getLocation();
        }
      })
      .catch((error) => {
        console.log('error : ', error);
      });
  }, [navigation, permissionStatus, getLocation]);

  // MARK: - Location

  const getLocation = React.useCallback(() => {
    Geolocation.getCurrentPosition((info) => {
      console.log(info?.coords);

      getData(info?.coords);
    });
  }, [getData]);

  // MARK: - Connection

  const getData = React.useCallback(
    (coords) => {
      const lat = coords?.latitude;
      const long = coords?.longitude;
      const apiKey = '2abc28f52e78544ba88110b0922b7251';

      ServiceManager()
        .get(`weather?lat=${lat}&lon=${long}&appid=${apiKey}`, {
          cancelToken: source.token,
        })
        .then((response) => response.data)
        .then((data) => {
          setDetailData(data);

          setTheme(Colors[`${data.cod.toString().charAt(0)}00`]);

          // MARK: -

          if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(theme.background, true);
          }
        })
        .catch((thrown) => {
          if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
          } else {
            // handle error
          }
        });
    },
    [source, theme],
  );

  // MARK: - View Lifecycle

  return (
    <Content backgroundColor={theme.background}>
      <MainComponent>
        <RootHeader
          value={{
            weather: detailData?.weather[0].main,
            location: detailData?.name,
            temp: detailData?.main.temp,
          }}
          color={theme.text}
        />
        <RootDescription
          value={{
            weather: detailData?.weather[0].description,
            temp_min: detailData?.main.temp_min,
            temp_max: detailData?.main.temp_max,
          }}
          color={theme.text}
        />
      </MainComponent>
    </Content>
  );
}

export default RootScreen;
