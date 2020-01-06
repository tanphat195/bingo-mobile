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

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const CreateBingo: NavigationStackScreenComponent<Props> = props => {
  const formRef = useRef(null);

  useEffect(() => {
    SocketService.init('/bingo', () => {
      SocketService.register(Commands.createGame, params => {
        console.log(params);
      });
    });
  }, []);

  const onCreate = () => {
    formRef.current.submit((err, values) => {
      if (!err) {
        const sendData = SocketService.makeSendData(Commands.createGame);
        sendData.addParam('name', values.name);
        SocketService.send(sendData);
      }
    });
  };

  return (
    <View style={styles.main}>
      <Form
        ref={formRef}
        initialForm={{
          name: { value: '', validate: [{ isRequired: true, message: 'Name is required' }] },
        }}
      >
        {(form, setFormKeys) => (
          <>
            <Input
              value={form['name'].value}
              error={form['name'].error}
              onChangeText={setFormKeys['name']}
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
