import * as React from 'react';
import {View, TouchableOpacity, Platform} from 'react-native';
import {TouchableOpacity as GHTouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import styled from 'styled-components';
import {variant, space, layout, border, flexbox} from 'styled-system';

const Touch = Platform.OS === 'ios' ? GHTouchableOpacity : TouchableOpacity;
const TouchContent = styled(Touch)(
  {
    height: 44,
    minWidth: 44,
    padding: 6,
  },
  space,
  border,
);

const ViewContent = styled(View)(
  {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minWidth: 34,
    maxWidth: 90,
    height: '100%',
    borderRadius: 6,
    paddingTop: 2,
  },
  variant({
    prop: 'type',
    variants: {
      clear: {
        backgroundColor: 'transparent',
      },
      dark: {
        backgroundColor: '#FFFFFF80',
      },
    },
  }),
  space,
  layout,
  border,
  flexbox,
);

const IconContent = styled(Icon)(
  variant({
    prop: 'type',
    variants: {
      light: {
        color: '#FFFFFF',
      },
      dark: {
        color: '#212121',
      },
    },
  }),
);

const ButtonNavigationComponent = (props) => {
  return (
    <TouchContent
      {...props}
      activeOpacity={0.75}
      onPress={() => {
        if (props?.onPress) {
          props?.onPress();
        }
      }}>
      <ViewContent type={props?.type || 'clear'}>
        {props?.name ? (
          <IconContent
            name={props?.name || ''}
            size={props?.size || 22}
            type={props?.tintType || 'dark'}
          />
        ) : (
          props?.children
        )}
      </ViewContent>
    </TouchContent>
  );
};

export default ButtonNavigationComponent;
