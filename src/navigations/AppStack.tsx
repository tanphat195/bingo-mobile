import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from '../../src/screens/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primary } from 'src/styles/color';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native';

const HomeDrawer = createDrawerNavigator({
  Home: HomeScreen,
});

const BottomStack = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeDrawer,
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
    // PostManage: {
    //   screen: PostManageScreen,
    //   navigationOptions: {
    //     tabBarLabel: 'Post Manage',
    //     tabBarIcon: ({ tintColor, focused }) => {
    //       return <Ionicons size={24} name="md-albums" color={focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.3)'} />;
    //     },
    //     tabBarColor: 'red',
    //   },
    // },
    // Profile: {
    //   screen: ProfileSceen,
    //   navigationOptions: {
    //     tabBarIcon: ({ tintColor, focused }) => {
    //       return <Ionicons size={24} name="md-person" color={focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.3)'} />;
    //     },
    //   },
    // },
  },
  {
    initialRouteName: 'Home',
    barStyle: {
      backgroundColor: '#fff',
    },
  },
);

export default createStackNavigator({
  BottomStack: {
    screen: BottomStack,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  // PostDetail: {
  //   screen: PostDetailScreen,
  // },
  // PostAdd: {
  //   screen: PostAddScreen,
  // },
  // Notification: NotificationScreen,
  // ShoppingCart: ShoppingCartScreen,
});
