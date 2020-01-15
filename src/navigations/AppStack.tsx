import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import CreateBingoScreen from '../screens/CreateBingoScreen';
import ScanQRCodeScreen from '../screens/ScanQRCodeScreen';
import BingoCardScreen from '../screens/BingoCardScreen';
import RoomMasterScreen from '../screens/RoomMasterScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomStack = createMaterialBottomTabNavigator(
  {
    Create: {
      screen: CreateBingoScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Ionicons
              size={24}
              name="ios-home"
              color={focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.3)'}
            />
          );
        },
      },
    },
    Join: {
      screen: ScanQRCodeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Ionicons
              size={24}
              name="md-albums"
              color={focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.3)'}
            />
          );
        },
        tabBarColor: 'red',
      },
    },
    BingoCardScreen: {
      screen: BingoCardScreen,
      navigationOptions: {
        title: 'Card',
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Ionicons
              size={24}
              name="md-albums"
              color={focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.3)'}
            />
          );
        },
        tabBarColor: 'red',
      },
    },
  },
  {
    initialRouteName: 'Create',
    barStyle: {
      backgroundColor: '#fff',
    },
  },
);

const RootStack = createStackNavigator({
  RootStack: {
    screen: BottomStack,
    navigationOptions: {
      headerShown: false,
    },
  },
  RoomMasterScreen: {
    screen: RoomMasterScreen,
    navigationOptions: {
      // headerShown: false,
    },
  },
});

export default createAppContainer(RootStack);
