import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
  NavigationStackScreenComponent,
  createStackNavigator,
} from 'react-navigation-stack';
import styles from './styles';
import REST from '../../utils/api';
import { connect } from 'react-redux';

interface Props extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const screenWidth = Math.round(Dimensions.get('window').width);

const BingoCardScreen: NavigationStackScreenComponent<Props> = props => {
  useEffect(() => {
    props.getCards();
  }, []);

  const gotoCardDetail = item => {
    console.log(item);
    props.navigation.navigate('', item);
  };

  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <FlatList
          data={props.card.cards}
          renderItem={({ item }) => <Card {...item.card} title={item.title} />}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </View>
  );
};

interface ICard {
  card: [];
  num_of_column: number;
  title: string;
}

const Card: React.FC<ICard> = ({ card, num_of_column, title }) => {
  const [cellWidth, setCellWidth] = useState(0);
  useEffect(() => {
    setCellWidth(screenWidth / num_of_column);
  });

  return (
    <View>
      <View>
        <Text>{title}</Text>
      </View>
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

BingoCardScreen.navigationOptions = () => ({
  headerShown: true,
  title: '',
});

const mapState = state => ({
  access_token: state.access_token,
  card: state.card,
});

const mapDispatch = dispatch => ({
  getCards: () =>
    dispatch({
      type: 'WATCH_GET_CARDS',
    }),
});

export default createStackNavigator({
  BingoCardScreen: connect(mapState, mapDispatch)(BingoCardScreen),
});
