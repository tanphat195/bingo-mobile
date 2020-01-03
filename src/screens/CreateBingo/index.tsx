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

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const CreateBingo: NavigationStackScreenComponent<Props> = props => {
  return (
    <View style={styles.main}>
      <Button type="primary">Create</Button>
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
