import React from 'react';
import { StatusBar, View, Text, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/stores';
import AppContainer from './src/navigations';

export default () => {
  YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
  ]);

  const onNavigationStateChange = (prev, next, action) => {
    if (['Profile'].includes(action.routeName)) {
      StatusBar.setBarStyle('light-content');
    } else {
      StatusBar.setBarStyle('default');
    }
    StatusBar.setHidden(true);
  };

  return (
    <Provider store={store}>
      <AppContainer onNavigationStateChange={onNavigationStateChange} />
    </Provider>
  );
};
