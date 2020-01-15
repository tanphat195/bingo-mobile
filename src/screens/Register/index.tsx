import React, { useRef } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import styles from './styles';
import Form from '../../components/molecules/Form';
import Button from '../../components/atoms/Button';
import SocketService from '../../services/SocketService';

interface IProps extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const Register: NavigationStackScreenComponent<IProps> = props => {
  const formRef = useRef(null);

  const onRegister = () => {
    formRef.current.submit((err, values) => {
      if (!err) {
        props.register(values.name, (err, user) => {
          if (!err && user.token) {
            SocketService.init('/bingo', () => {
              props.navigation.navigate('App');
            });
          }
        });
      }
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.main}>
        <Form
          ref={formRef}
          initialForm={{
            name: { value: '', validate: [{ isRequired: true, message: 'Name is required' }] },
          }}
        >
          {(form, setFormKey) => (
            <View style={styles.formDiv}>
              <Text style={styles.label}>nick name</Text>
              <TextInput
                style={styles.input}
                value={form['name'].value}
                onChangeText={setFormKey['name']}
              />
              <Button onPress={onRegister}>Register</Button>
            </View>
          )}
        </Form>
      </View>
    </KeyboardAvoidingView>
  );
};

Register.navigationOptions = () => ({
  headerShown: true,
});

const mapDispatch = dispatch => ({
  register: (name, callback) =>
    dispatch({
      type: 'WATCH_REGISTER',
      payload: name,
      callback,
    }),
});

export default connect(null, mapDispatch)(Register);
