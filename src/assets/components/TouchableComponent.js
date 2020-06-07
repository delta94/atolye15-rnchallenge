import {TouchableOpacity, Platform} from 'react-native';
import {TouchableOpacity as GHTouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {flexbox, space, layout, size} from 'styled-system';

const Touchable = Platform.OS === 'ios' ? GHTouchableOpacity : TouchableOpacity;
const TouchableContent = styled(Touchable)(space, layout, size, flexbox);

export default TouchableContent;
