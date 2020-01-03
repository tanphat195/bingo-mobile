import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import { primary } from '../../../../src/styles/color';

interface Props {
  navigation: NavigationStackProp;
}

const HeaderRightCartNotification: React.FC<Props> = ({ navigation }) => {
  const navNotifition = () => {
    navigation.navigate('Notification');
  };

  const navShoppingCart = () => {
    navigation.navigate('ShoppingCart');
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.button} onPress={navNotifition}>
        <FontAwesome5 color={primary} size={24} name="bell" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navShoppingCart}>
        <Feather color={primary} size={24} name="shopping-cart" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRightCartNotification;
