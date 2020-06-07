import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const NAVIGATION_TYPE_DEFAULT = undefined;
const NAVIGATION_TYPE_CLEAR = 'clear';

export const styles = StyleSheet.create({
  headerBackground: {
    height: '100%',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 15,
  },
  headerTitleStyle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1D1E1F',
  },
});

function NavigationOptions(props) {
  let backgroundColor = 'white';
  if (props?.barStyle === NAVIGATION_TYPE_CLEAR) {
    backgroundColor = 'transparent';
  }

  const objects = {
    headerBackground: () => (
      <View
        style={[
          styles.headerBackground,
          {
            backgroundColor,
            shadowOpacity:
              props?.barStyle === NAVIGATION_TYPE_DEFAULT ? 0.0 : 0.1,
            elevation: props?.barStyle === NAVIGATION_TYPE_DEFAULT ? 0 : 4,
          },
        ]}
      />
    ),
    headerTitleStyle: {
      ...styles.headerTitleStyle,
    },
    headerTintColor: '#1D1E1F',
    headerBackImage: (tintColor) => (
      <Icon
        name="arrow-left"
        size={24}
        color={tintColor}
        style={{marginLeft: 20}}
      />
    ),
    headerBackTitleVisible: false,
  };

  return objects;
}

export default NavigationOptions;
