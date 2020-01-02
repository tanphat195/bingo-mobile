import React from 'react';
import { StatusBar, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/stores';
import AppContainer from 'src/navigations';

export default () => {
  const onNavigationStateChange = (prev, next, action) => {
    if (['Profile'].includes(action.routeName)) {
      StatusBar.setBarStyle('light-content');
    } else {
      StatusBar.setBarStyle('default');
    }
  };

  return (
    <Provider store={store}>
      <AppContainer onNavigationStateChange={onNavigationStateChange} />
    </Provider>
  );
};
