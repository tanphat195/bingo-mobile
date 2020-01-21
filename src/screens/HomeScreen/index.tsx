import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
  createStackNavigator,
} from 'react-navigation-stack';
import styles from './styles';
import Button from '../../components/atoms/Button';
import { connect } from 'react-redux';

interface IProps extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const HomeScreen: NavigationStackScreenComponent<IProps> = props => {
  const onGotoCreateRoom = () => {
    props.navigation.navigate('CreateRoom');
  };

  const onGoToJoinRoom = () => {
    props.navigation.navigate('ScanQRCode');
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.name}>Hello: {props.user.name}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>LÔ TÔ 2020</Text>
        <Button onPress={onGotoCreateRoom} style={{ marginVertical: 12 }}>
          Người kêu số
        </Button>
        <Button onPress={onGoToJoinRoom}>Người chơi</Button>
      </View>
    </View>
  );
};

// HomeScreen.navigationOptions = () => ({
//   headerShown: true,
//   headerStyle: {
//     borderBottomWidth: 0,
//   },
// });

const mapState = state => ({
  user: state.user,
});

export default connect(mapState)(HomeScreen);
