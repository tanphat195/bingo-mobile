import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, InteractionManager } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
  createStackNavigator,
} from 'react-navigation-stack';
import { withNavigationFocus } from 'react-navigation';
import styles from './styles';
import { connect } from 'react-redux';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SocketService from '../../services/SocketService';
import Commands from '../../services/Commands';

interface IProps extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

declare type BarCodeScanningResult = {
  type: string;
  data: string;
};

const ScanQRCodeScreen: NavigationStackScreenComponent<IProps> = props => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    SocketService.register(Commands.scanQRCode, params => {
      if (!params.error) {
        if (props.user.token === props.user.token) {
          props.navigation.navigate('BingoCardScreen');
        }
      }
    });
  }, []);

  const onBarCodeScanned = (scanningResult: BarCodeScanningResult) => {
    const sendData = SocketService.makeSendData(Commands.scanQRCode);
    sendData.addParam('current_code', scanningResult.data);
    sendData.addParam('user', props.user);
    SocketService.send(sendData);
  };

  return (
    <View style={styles.main}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        autoFocus={true}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={onBarCodeScanned}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

ScanQRCodeScreen.navigationOptions = ({ navigation }) => ({
  headerShown: true,
  headerStyle: {
    borderBottomWidth: 0,
  },
});

const mapState = state => ({
  user: state.user,
});

export default createStackNavigator({
  QRScreen: connect(mapState)(withNavigationFocus(ScanQRCodeScreen)),
});
