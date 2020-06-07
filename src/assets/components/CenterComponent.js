import {View} from 'react-native';
import styled from 'styled-components';
import {space, layout, flexbox} from 'styled-system';

const CenterContent = styled(View)(
  {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  space,
  layout,
  flexbox,
);

export default CenterContent;
