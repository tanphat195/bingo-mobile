import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
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
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.content}>
          {card.map(row => (
            <View style={styles.row}>
              {row.map(cell => (
                <View key={cell.value} style={styles.cell}>
                  <Text>{cell.status === 'available' ? cell.value : ''}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

BingoCardScreen.navigationOptions = () => ({
  headerShown: true,
});

export default createStackNavigator({
  BingoCardScreen: BingoCardScreen,
});
