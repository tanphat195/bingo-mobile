import { StyleSheet } from 'react-native';
import { SECONDARY } from '../../constant';

export default StyleSheet.create({
  main: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: SECONDARY,
  },
  content: {},
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: SECONDARY,
  },
});
