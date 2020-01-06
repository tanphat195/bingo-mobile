import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {},
  content: {
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    height: 50,
    margin: 2,
    backgroundColor: 'rgba(230, 230, 230, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    fontSize: 10,
  },
});
