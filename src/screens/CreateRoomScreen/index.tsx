import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';
import styles from './styles';
import Form from '../../components/molecules/Form';
import Button from '../../components/atoms/Button';
import GoBackArrow from '../../components/atoms/GoBackArrow';
import SocketService from '../../services/SocketService';
import Commands from '../../services/Commands';
import { connect } from 'react-redux';
import InputSpinner from 'react-native-input-spinner';
import { PRIMARY } from '../../constant';

interface IProps extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const CreateRoomScreen: NavigationStackScreenComponent<IProps> = props => {
  const formRef = useRef(null);

  useEffect(() => {
    props.getCurrentRoom();
    // SocketService.register(Commands.createRoom, params => {
    //   if (!params.error) {
    //     formRef.current.clearField('title');
    //     props.getCurrentRoom();
    //     props.navigation.navigate('RoomMaster', { id: params.room._id });
    //   }
    // });
  }, []);

  const onCreate = () => {
    formRef.current.submit((err: any, values: any) => {
      if (!err) {
        props.addCurrentRoom(values, (err, room) => {
          if (!err) {
            formRef.current.clearField('title');
            Keyboard.dismiss();
            props.getCurrentRoom();
          }
        });
      }
    });
  };

  const onGoBack = () => {
    props.navigation.goBack();
  };

  const gotoRoom = (id: string) => {
    props.navigation.navigate('RoomMaster', { id });
  };

  const onClearTitle = () => {
    formRef.current.clearField('title');
  };

  return (
    <View style={styles.main}>
      <View style={styles.form}>
        <Form
          ref={formRef}
          initialForm={{
            title: { value: '', validate: [{ isRequired: true, message: 'Title is required' }] },
            num_of_column: {
              value: '6',
              validate: [{ isRequired: true, message: 'Column is required' }],
            },
            num_of_row: {
              value: '6',
              validate: [{ isRequired: true, message: 'Row is required' }],
            },
            num_of_win: {
              value: '4',
              validate: [{ isRequired: true, message: 'Win is required' }],
            },
          }}
        >
          {(form, setFormKeys) => (
            <>
              <View style={styles.relative}>
                <TextInput
                  placeholder={'Input Title'}
                  value={form['title'].value}
                  onChangeText={setFormKeys['title']}
                  style={styles.input}
                />
                <TouchableOpacity style={styles.clear} onPress={onClearTitle}>
                  <Text>x</Text>
                </TouchableOpacity>
              </View>
              {form['title'].error && <Text style={styles.textError}>{form['title'].error}</Text>}
              <View style={styles.fieldRow}>
                <Text>Number of column</Text>
                <InputSpinner
                  max={9}
                  min={4}
                  step={1}
                  color={PRIMARY}
                  value={form['num_of_column'].value}
                  onChange={setFormKeys['num_of_column']}
                />
              </View>
              <View style={styles.fieldRow}>
                <Text>Number of row</Text>
                <InputSpinner
                  max={9}
                  min={4}
                  step={1}
                  color={PRIMARY}
                  value={form['num_of_row'].value}
                  onChange={setFormKeys['num_of_row']}
                />
              </View>
              <View style={styles.fieldRow}>
                <Text>Number of win</Text>
                <InputSpinner
                  max={5}
                  min={3}
                  step={1}
                  color={PRIMARY}
                  value={form['num_of_win'].value}
                  onChange={setFormKeys['num_of_win']}
                />
              </View>
              <View style={styles.fieldRow}>
                <Button type="primary" onPress={onCreate}>
                  Create
                </Button>
                <Button type="secondary" onPress={onGoBack}>
                  Back
                </Button>
              </View>
            </>
          )}
        </Form>
      </View>
      <FlatList
        style={{ paddingHorizontal: 20 }}
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

CreateRoomScreen.navigationOptions = () => ({
  headerShown: true,
  headerStyle: {
    borderBottomWidth: 0,
  },
});

const mapState = state => ({
  user: state.user,
  room: state.room,
});

const mapDispatch = dispatch => ({
  getCurrentRoom: () =>
    dispatch({
      type: 'WATCH_GET_CURRENT_ROOM',
    }),
  addCurrentRoom: (values: any, callback: Function) =>
    dispatch({
      type: 'WATCH_ADD_CURRENT_ROOM',
      payload: values,
      callback,
    }),
});

export default connect(mapState, mapDispatch)(CreateRoomScreen);
