import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  flip: {
    padding: 6,
  },
  photoContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  actionGroup: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  action: {
    padding: 6,
  },
  text: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
});