import * as React from 'react';
import {YellowBox} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowSafeAreaInsets,
} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

import {RootContainer} from './src';

function App() {
  console.disableYellowBox = true;

  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);

  // MARK: -

  return (
    <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
      <NavigationContainer>
        <RootContainer />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
