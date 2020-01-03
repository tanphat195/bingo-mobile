import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
  createStackNavigator,
} from 'react-navigation-stack';
import styles from './styles';
import REST from '../../utils/api';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const BingoCardScreen: NavigationStackScreenComponent<Props> = props => {
  const [card, setCard] = useState([]);
  useEffect(() => {
    REST.get('/card').then(res => {
      setCard(res.data.card);
    });
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.content}>
        {card.map(row => (
          <View style={styles.row}>
            {row.map(cell => (
              <View style={styles.cell}>
                <Text>{cell}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

BingoCardScreen.navigationOptions = () => ({
  headerShown: true,
});

export default createStackNavigator({
  BingoCardScreen: BingoCardScreen,
});
