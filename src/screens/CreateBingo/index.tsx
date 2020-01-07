import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text } from 'react-native';
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
import REST from '../../utils/api';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const CreateBingo: NavigationStackScreenComponent<Props> = props => {
  const formRef = useRef(null);

  useEffect(() => {
    REST.post('access_tokens')
      .then(res => {})
      .catch(err => {});

    SocketService.init('/bingo', () => {
      SocketService.register(Commands.createRoom, params => {
        console.log(params);
      });
    });
  }, []);

  const onCreate = () => {
    formRef.current.submit((err, values) => {
      if (!err) {
        const sendData = SocketService.makeSendData(Commands.createRoom);
        sendData.addParam('user_name', values.user_name);
        SocketService.send(sendData);
      }
    });
  };

  return (
    <View style={styles.main}>
      <Form
        ref={formRef}
        initialForm={{
          user_name: { value: '', validate: [{ isRequired: true, message: 'Name is required' }] },
        }}
      >
        {(form, setFormKeys) => (
          <>
            <Input
              value={form['user_name'].value}
              error={form['user_name'].error}
              onChangeText={setFormKeys['user_name']}
              style={{ backgroundColor: '#fff' }}
            />
            <Button type="primary" onPress={onCreate}>
              Create
            </Button>
          </>
        )}
      </Form>
    </View>
  );
};

CreateBingo.navigationOptions = () => ({
  headerShown: true,
  headerStyle: {
    borderBottomWidth: 0,
  },
});

export default createStackNavigator({
  CreateBingo: CreateBingo,
});
