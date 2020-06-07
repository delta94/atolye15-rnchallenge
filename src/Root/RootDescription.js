import * as React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {space} from 'styled-system';

import {LabelComponent} from '../assets/components';

const Content = styled(View)(
  {
    paddingVertical: 20,
    paddingHorizontal: 35,
  },
  space,
);

function RootHeader(props) {
  const {value, color} = props;

  const weather = value?.weather;
  const minTemp = Math.floor(value?.temp_min / 10) * 1;
  const maxTemp = Math.floor(value?.temp_max / 10) * 1;

  return (
    <Content>
      <LabelComponent textAlign="center" color={color}>
        {`Today: ${weather} currently. It's ${minTemp}; the high today was forecast as ${maxTemp}.`}
      </LabelComponent>
    </Content>
  );
}

export default RootHeader;
