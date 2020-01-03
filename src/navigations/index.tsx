import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import CreateBingo from '../screens/CreateBingo';
import ScanQRCodeScreen from '../screens/ScanQRCodeScreen';
import BingoCardScreen from '../screens/BingoCardScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomStack = createMaterialBottomTabNavigator(
  {
    Create: {
      screen: CreateBingo,
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
    BingoCard: {
      screen: BingoCardScreen,
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
});

export default createAppContainer(RootStack);
