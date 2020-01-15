import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator, Linking, Alert, NativeModules } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import styles from './styles';
import SocketService from '../../services/SocketService';

const AuthLoadingScreen: NavigationStackScreenComponent = props => {
  useEffect(() => {
    // checkInternet();

    props.accessToken((err, user) => {
      if (!err && user.token) {
        SocketService.init('/bingo', () => {
          props.navigation.navigate('App');
        });
      } else {
        props.navigation.navigate('Auth');
      }
    });
  }, []);

  const suggestOpenInternet = () => {
    Alert.alert('No internet connection', '', [
      { text: 'None', onPress: () => {} },
      {
        text: 'Go to Setting',
        onPress: () => {
          Linking.openURL('app-settings:');
        },
      },
    ]);
  };

  const checkInternet = () => {
    NetInfo.fetch()
      .then(res => {
        if (res.type === 'none') {
          suggestOpenInternet();
        }
      })
      .catch(err => {
        suggestOpenInternet();
      });
  };

  return (
    <View style={styles.main}>
      <ActivityIndicator size="large" />
    </View>
  );
};

AuthLoadingScreen.navigationOptions = () => ({
  header: null,
});

const mapState = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  accessToken: callback =>
    dispatch({
      type: 'WATCH_ACCESS_TOKEN',
      callback,
    }),
});

export default connect(mapState, mapDispatch)(AuthLoadingScreen);
