import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import RootScreen from './Root/RootScreen';
import SupportScreen from './Support/SupportScreen';
import PermissionScreen from './Permission/PermissionScreen';

import {NavigationOptions} from './utilities';

const Stack = createStackNavigator();

export const isMountedRef = React.createRef();
export const navigationRef = React.createRef();

function PermissionContainer(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PermissionScreen"
        component={PermissionScreen}
        options={() => ({
          headerTitle: '',
          headerTransparent: true,
        })}
      />
    </Stack.Navigator>
  );
}

function PushContainer(props) {
  return (
    <Stack.Navigator mode="screen">
      <Stack.Screen
        name="RootScreen"
        component={RootScreen}
        options={() => ({
          headerTitle: '',
          headerTransparent: true,
          ...NavigationOptions({barStyle: 'clear'}),
        })}
      />

      <Stack.Screen
        name="SupportScreen"
        component={SupportScreen}
        options={() => ({
          ...NavigationOptions(),
        })}
      />
    </Stack.Navigator>
  );
}

function Container() {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen
        name="PushContainer"
        component={PushContainer}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="PermissionContainer"
        component={PermissionContainer}
        options={() => ({
          headerShown: false,
          gestureEnabled: false,
        })}
      />
    </Stack.Navigator>
  );
}

export default Container;
