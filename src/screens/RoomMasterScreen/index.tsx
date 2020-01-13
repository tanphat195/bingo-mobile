import React, { useState, useEffect } from 'react';
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
import SocketService from '../../services/SocketService';
import Commands from '../../services/Commands';

interface IProps extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

interface IRoom {
  title: string;
}

const RoomMasterScreen: NavigationStackScreenComponent<IProps> = props => {
  const [room, setRoom] = useState<IRoom>({ title: '' });
  const [code, setCode] = useState('');

  useEffect(() => {
    REST.get(`room/${props.navigation.state.params.id}`).then(res => {
      setRoom(res.data);
    });
    REST.get(`room/${props.navigation.state.params.id}/current_code`)
      .then(res => {
        setCode(res.data);
      })
      .catch(err => {});

    SocketService.register(Commands.joinRoom, params => {
      if (!params.error) {
        props.navigation.navigate('BingoCardScreen');
      }
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
