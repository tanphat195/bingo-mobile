import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'relative',
    height: 46,
  },
  main: {
    height: 42,
    borderRadius: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1FC2FF',
  },
  border: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  press: {
    zIndex: -1,
    position: 'absolute',
    top: 4,
    backgroundColor: '#1AA8EB',
    width: '100%',
    height: 42,
    borderRadius: 12,
  },
  pressIn: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: 4,
  },
});
