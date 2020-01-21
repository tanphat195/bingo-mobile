import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import CreateRoomScreen from '../screens/CreateRoomScreen';
import ScanQRCodeScreen from '../screens/ScanQRCodeScreen';
import BingoCardScreen from '../screens/BingoCardScreen';
import RoomMasterScreen from '../screens/RoomMasterScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  CreateRoom: {
    screen: CreateRoomScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ScanQRCode: {
    screen: ScanQRCodeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  RoomMaster: {
    screen: RoomMasterScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  BingoCard: {
    screen: BingoCardScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default AppStack;
