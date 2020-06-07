import * as React from 'react';
import {Dimensions, View, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {variant, space} from 'styled-system';

import {LabelComponent} from '.';

const ButtonContent = styled(View)(
  {
    height: 50,
    width: Dimensions.get('window').width - 100,
    overflow: 'hidden',
    borderRadius: 16,
  },
  space,
  variant({
    prop: 'type',
    variants: {
      success: {
        backgroundColor: '#212121',
      },
      info: {
        backgroundColor: '#673ab7',
      },
      error: {
        backgroundColor: '#52A75D',
      },
    },
  }),
);

const TouchContent = styled(TouchableOpacity)({
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
});

const ButtonComponent = ({...props}) => {
  return (
    <ButtonContent {...props}>
      <TouchContent
        activeOpacity={0.75}
        {...props}
        onPress={() => (props?.loading === true ? null : props?.onPress())}>
        {props?.loading === true ? (
          <ActivityIndicator color="white" />
        ) : (
          <LabelComponent size="button" color="white">
            {props?.children}
          </LabelComponent>
        )}
      </TouchContent>
    </ButtonContent>
  );
};

export default ButtonComponent;
