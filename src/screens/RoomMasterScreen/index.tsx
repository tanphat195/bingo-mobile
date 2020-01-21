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
import Button from '../../components/atoms/Button';

interface IProps extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

interface IRoom {
  title: string;
}

interface IGame {
  room_id: string;
}

let arr: any[] = [];

const RoomMasterScreen: NavigationStackScreenComponent<IProps> = props => {
  const [room, setRoom] = useState<IRoom>({ title: '' });
  const [code, setCode] = useState('');
  const [members, setMembers] = useState<any>([]);
  const [game, setGame] = useState<IGame>();

  useEffect(() => {
    // REST.get(`room/${props.navigation.state.params.id}`).then(res => {
    //   setRoom(res.data);
    // });
    REST.get(`room/${props.navigation.state.params.id}/current_code`)
      .then(res => {
        setCode(res.data);
      })
      .catch(err => {});

    const sendData = SocketService.makeSendData(Commands.joinRoom);
    sendData.addParam('room_id', props.navigation.state.params.id);
    SocketService.send(sendData);

    SocketService.register(Commands.joinRoom, params => {
      if (!params.error) {
        setRoom(params.room);
      }
    });

    SocketService.register(Commands.scanQRCode, (params: any) => {
      if (!params.error) {
        setCode(params.new_code);
        arr = [...arr, { ...params.user, index: params.new_code }];
        setMembers(arr);
      }
    });

    SocketService.register(Commands.createGame, (params: any) => {
      if (!params.error) {
        setGame(params.game);
      }
    });
  }, []);

  const onStartGame = () => {
    const sendData = SocketService.makeSendData(Commands.createGame);
    sendData.addParam('room_id', props.navigation.state.params.id);
    SocketService.send(sendData);
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.qrcodeWrapper}>
          <Text style={styles.title}>{room.title}</Text>
          {code ? (
            <QRCode
              value={
                'http://zaloapp.com/qr/l?tk=zaloqr:DLWuGZKkCJKtEJOmC3KmDp4pE2vbOp4pOsCuD6GqOJ5cOsCpEJOtCZSrCM8nCpSmDMHcDm'
              }
              size={180}
              // logo={{ uri: base64Logo }}
              logoSize={30}
              logoBackgroundColor="transparent"
            />
          ) : null}
          <View style={{ marginTop: 12, width: 180 }}>
            <Button onPress={onStartGame}>Start</Button>
          </View>
        </View>
      </View>
    </View>
  );
};

RoomMasterScreen.navigationOptions = ({ navigation }) => ({
  headerShown: true,
  headerLeft: () => <GoBackArrow onPress={() => navigation.goBack()} />,
});

export default RoomMasterScreen;
