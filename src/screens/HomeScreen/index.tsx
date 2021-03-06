import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
  createStackNavigator,
} from 'react-navigation-stack';
import styles from './styles';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const HomeScreen: NavigationStackScreenComponent<Props> = props => {
  return (
    <View style={styles.main}>
      <Text>This is HomeScreen</Text>
    </View>
  );
};

HomeScreen.navigationOptions = () => ({
  headerShown: true,
  headerStyle: {
    borderBottomWidth: 0,
  },
});

export default createStackNavigator({
  HomeScreen: HomeScreen,
});
