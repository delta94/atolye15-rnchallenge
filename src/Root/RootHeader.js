import * as React from 'react';

import {LabelComponent, CenterComponent} from '../assets/components';

function RootHeader(props) {
  const {value, color} = props;

  const location = value?.location || '-';
  const weather = value?.weather || '-';
  const temp = Math.floor(value?.temp / 10) * 1 || '-';

  return (
    <CenterComponent flex={1}>
      <LabelComponent fontSize={28} fontWeight="500" mt={44} color={color}>
        {location}
      </LabelComponent>

      <LabelComponent fontSize={17} fontWeight="400" color={color}>
        {weather}
      </LabelComponent>

      <LabelComponent
        fontSize={76}
        fontWeight="300"
        mt={10}
        mb={20}
        color={color}>
        {`${temp}°`}
      </LabelComponent>
    </CenterComponent>
  );
}

export default RootHeader;
