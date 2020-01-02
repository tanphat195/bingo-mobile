import React from 'react';
import { View } from 'react-native';
import styles from './styles';

interface Props {}

const Divider: React.FC<Props> = props => {
  return <View style={styles.main}></View>;
};

export default Divider;
