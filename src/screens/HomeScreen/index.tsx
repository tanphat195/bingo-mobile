import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
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
  header: null,
});

export default HomeScreen;
