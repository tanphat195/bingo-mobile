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
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Button from '../../components/atoms/Button';

interface IProps extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const screenWidth = Math.round(Dimensions.get('window').width);

const BingoCardScreen: NavigationStackScreenComponent<IProps> = props => {
  const [isRefreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    props.getTickets();
  }, []);

  const gotoCardDetail = item => {
    console.log(item);
    props.navigation.navigate('', item);
  };

  const onRefresh = () => {
    setRefreshing(true);
    props.getTickets(() => {
      setRefreshing(false);
    });
  };

  const onUpdate = () => {
    props.getTickets();
  };

  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <ScrollableTabView
          prerenderingSiblingsNumber={5}
          renderTabBar={tab => (
            <View>
              <Text style={styles.title}>{tab.tabs[tab.activeTab]}</Text>
            </View>
          )}
        >
          {props.ticket.list.map(item => (
            <Card key={item.current_code} {...item.card} title={item.title} tabLabel={item.title} />
          ))}
        </ScrollableTabView>
        <Button width={150} onPress={onUpdate}>
          Refresh
        </Button>
      </View>
    </View>
  );
};

interface ICard {
  matrix: [];
  num_of_column: number;
  title: string;
}

const Card: React.FC<ICard> = ({ matrix, num_of_column, title }) => {
  const [cellWidth, setCellWidth] = useState(0);
  useEffect(() => {
    setCellWidth(screenWidth / num_of_column);
  });

  return (
    <View style={styles.matrix}>
      {matrix.map((row: [], index) => (
        <View key={index} style={styles.row}>
          {row.map(cell => (
            <View key={cell.value} style={{ width: cellWidth }}>
              {cell.status === 'available' && (
                <TouchableOpacity style={styles.cell}>
                  <Text style={styles.cellText}>{cell.value}</Text>
                </TouchableOpacity>
              )}
              {cell.status === 'announced' && (
                <TouchableOpacity style={[styles.cell, styles.announced]}>
                  <Text style={[styles.cellText, styles.announcedText]}>{cell.value}</Text>
                </TouchableOpacity>
              )}
              {cell.status === 'hidden' && (
                <TouchableOpacity style={styles.cell}>
                  {/* <Text style={{ color: 'rgba(0,0,0,0.2)', fontSize: 12 }}>{cell.value}</Text> */}
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

// const renderSeparator = () => {
//   return (
//     <View
//       style={{
//         height: 1,
//         width: '100%',
//         backgroundColor: 'rgba(0,0,0,0.05)',
//       }}
//     />
//   );
// };

BingoCardScreen.navigationOptions = () => ({
  headerShown: true,
  title: '',
  headerStyle: {
    height: 20,
  },
});

const mapState = state => ({
  access_token: state.access_token,
  ticket: state.ticket,
});

const mapDispatch = dispatch => ({
  getTickets: callback =>
    dispatch({
      type: 'WATCH_GET_TICKETS',
      callback,
    }),
});

export default createStackNavigator({
  BingoCardScreen: connect(mapState, mapDispatch)(BingoCardScreen),
});
