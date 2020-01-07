import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
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

const screenWidth = Math.round(Dimensions.get('window').width);

const BingoCardScreen: NavigationStackScreenComponent<Props> = props => {
  const [card, setCard] = useState([]);
  const [cellWidth, setCellWidth] = useState(0);
  useEffect(() => {
    REST.get('/card').then(res => {
      setCard(res.data.card);
      setCellWidth(screenWidth / res.data.num_of_column);
    });
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.content}>
        {card.map((row, index) => (
          <View key={index} style={styles.row}>
            {row.map(cell => (
              <View key={cell.value} style={{ width: cellWidth }}>
                <TouchableOpacity style={styles.cell}>
                  <Text>{cell.status === 'available' ? cell.value : ''}</Text>
                </TouchableOpacity>
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
