import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
  createStackNavigator,
} from 'react-navigation-stack';
import styles from './styles';
import QRCodeScanner from 'react-native-qrcode-scanner';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const ScanQRCodeScreen: NavigationStackScreenComponent<Props> = props => {
  return (
    <View style={styles.main}>
      <Text>This is ScanQRCodeScreen</Text>
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={QRCodeScanner.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer
            and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

ScanQRCodeScreen.navigationOptions = () => ({
  headerShown: true,
  headerStyle: {
    borderBottomWidth: 0,
  },
});

export default createStackNavigator({
  QRScreen: ScanQRCodeScreen,
});
