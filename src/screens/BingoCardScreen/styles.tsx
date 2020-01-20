import { StyleSheet } from 'react-native';
import { PRIMARY } from '../../constant';

export default StyleSheet.create({
  main: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  matrix: {},
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    height: 40,
    margin: 2,
    backgroundColor: 'rgba(230, 230, 230, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    fontSize: 10,
  },
  cellText: {
    fontSize: 18,
  },
  announced: {
    backgroundColor: PRIMARY,
  },
  announcedText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
