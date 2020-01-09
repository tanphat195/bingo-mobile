import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import GoBackArrow from '../../components/atoms/GoBackArrow';
import QRCode from 'react-native-qrcode-svg';
import styles from './styles';
import REST from '../../utils/api';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const RoomMasterScreen: NavigationStackScreenComponent<Props> = props => {
  const [room, setRoom] = useState({});
  const [code, setCode] = useState('');

  useEffect(() => {
    REST.get(`room/${props.navigation.state.params.id}`).then(res => {
      setRoom(res.data);
    });
    REST.get(`ticket/room/${props.navigation.state.params.id}`).then(res => {
      setCode(res.data);
    });
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.qrcodeWrapper}>
        {code ? (
          <QRCode
            value={code}
            size={200}
            // logo={{ uri: base64Logo }}
            logoSize={30}
            logoBackgroundColor="transparent"
          />
        ) : null}
      </View>
      <Text style={styles.title}>{room.title}</Text>
    </View>
  );
};

RoomMasterScreen.navigationOptions = ({ navigation }) => ({
  headerShown: true,
  headerLeft: () => <GoBackArrow onPress={() => navigation.goBack()} />,
});

export default RoomMasterScreen;
