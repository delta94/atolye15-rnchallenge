import * as React from 'react';
import {StatusBar, Platform, Dimensions} from 'react-native';
import {
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import {
  MainComponent,
  CenterComponent,
  LabelComponent,
  ButtonComponent,
} from '../assets/components';

import {PermissionLocation} from '../assets/icons';

function PermissionScreen({route, navigation}) {
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState(route?.params?.status);

  // MARK: - Screen Focus Hooks

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StatusBar.setBarStyle('dark-content', false);

      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('white', true);
      }
    });

    return unsubscribe;
  }, [navigation]);

  // MARK: - Button Props

  const handleButton = () => {
    if (status === RESULTS.DENIED || status === RESULTS.UNAVAILABLE) {
      setLoading(true);

      request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        }),
      ).then((result) => {
        setStatus(result);

        // MARK: -

        if (result === RESULTS.GRANTED) {
          navigation.goBack();
        }
      });
    } else {
      openSettings().catch(() => console.warn('cannot open settings'));
    }
  };

  // MARK: - View Lifecycle

  const getButtonTitle = () => {
    if (status === RESULTS.DENIED || status === RESULTS.UNAVAILABLE) {
      return 'Allow';
    }
    return 'Go to Settings';
  };

  return (
    <MainComponent>
      <CenterComponent flex={1}>
        <PermissionLocation size={Dimensions.get('window').width - 100} />

        <LabelComponent fontSize={17} fontWeight="700" mt={30} color="#212121">
          Location Permission Required
        </LabelComponent>

        <LabelComponent
          mt={10}
          ml={35}
          mr={35}
          fontSize={15}
          textAlign="center"
          color="#585858">
          We need your current location to give you excellent weather forecast
          information!
        </LabelComponent>
      </CenterComponent>

      <CenterComponent>
        <ButtonComponent
          type="info"
          mb={35}
          onPress={handleButton}
          loading={loading}>
          {getButtonTitle()}
        </ButtonComponent>
      </CenterComponent>
    </MainComponent>
  );
}

export default PermissionScreen;
