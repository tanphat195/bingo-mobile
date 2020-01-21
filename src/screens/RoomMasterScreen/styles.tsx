import { StyleSheet } from 'react-native';
import { PRIMARY } from '../../constant';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#dedede',
  },

  header: {
    position: 'relative',
    height: 150,
    backgroundColor: 'tomato',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 6,
  },
  qrcodeWrapper: {
    position: 'absolute',
    top: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2,
    // borderColor: PRIMARY,
  },
});
