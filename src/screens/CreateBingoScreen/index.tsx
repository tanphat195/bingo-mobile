import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
  createStackNavigator,
} from 'react-navigation-stack';
import styles from './styles';
import Form from '../../components/molecules/Form';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import SocketService from '../../services/SocketService';
import Commands from '../../services/Commands';
import { connect } from 'react-redux';

interface IProps extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
  requestAccessToken: () => void;
}

const CreateBingoScreen: NavigationStackScreenComponent<IProps> = props => {
  const formRef = useRef(null);

  useEffect(() => {
    props.requestAccessToken((err, token) => {
      if (!err) {
        SocketService.init('/bingo', () => {
          props.getCurrentRoom();
          SocketService.register(Commands.createRoom, params => {
            if (!params.error) {
              props.getCurrentRoom();
              props.navigation.navigate('RoomMasterScreen', { id: params.room._id });
            }
          });
        });
      }
    });
  }, []);

  const onCreate = () => {
    formRef.current.submit((err, values) => {
      if (!err) {
        const sendData = SocketService.makeSendData(Commands.createRoom);
        sendData.addParam('token', props.access_token.token);
        sendData.addParam('title', values.title);
        SocketService.send(sendData);
      }
    });
  };

  const gotoRoom = (id: string) => {
    props.navigation.navigate('RoomMasterScreen', { id });
  };

  return (
    <View style={styles.main}>
      <View style={styles.form}>
        <Form
          ref={formRef}
          initialForm={{
            title: { value: '', validate: [{ isRequired: true, message: 'Title is required' }] },
          }}
        >
          {(form, setFormKeys) => (
            <>
              <Input
                label="Title"
                value={form['title'].value}
                error={form['title'].error}
                onChangeText={setFormKeys['title']}
                style={{ backgroundColor: '#fff' }}
              />
              <Button type="primary" onPress={onCreate}>
                Create
              </Button>
            </>
          )}
        </Form>
      </View>
      <FlatList
        data={props.room.current}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              gotoRoom(item._id);
            }}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.05)',
      }}
    />
  );
};

CreateBingoScreen.navigationOptions = () => ({
  headerShown: true,
  headerStyle: {
    borderBottomWidth: 0,
  },
});

const mapState = state => ({
  access_token: state.access_token,
  room: state.room,
});

const mapDispatch = dispatch => ({
  requestAccessToken: callback =>
    dispatch({
      type: 'WATCH_ACCESS_TOKEN',
      callback,
    }),
  getCurrentRoom: () =>
    dispatch({
      type: 'WATCH_GET_CURRENT_ROOM',
    }),
});

export default createStackNavigator({
  CreateBingoScreen: connect(mapState, mapDispatch)(CreateBingoScreen),
});
