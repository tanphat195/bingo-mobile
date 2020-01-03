import { StyleSheet } from 'react-native';
import { primary, secondary } from '../../../../src/styles/color';

export default StyleSheet.create({
  main: {
    borderRadius: 24,
    width: 100,
    height: 36,
    padding: 2,
    position: 'relative',
    borderWidth: 2,
  },
  checked: {
    backgroundColor: primary,
    borderColor: primary,
  },
  unchecked: {
    backgroundColor: '#FFF',
    borderColor: primary,
  },
  pointer: {
    width: 28,
    height: 28,
    borderRadius: 20,
    position: 'absolute',
    top: 2,
  },
  text: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  checkedText: {
    color: '#FFF',
    fontWeight: '600',
  },
  uncheckedText: {
    color: primary,
    fontWeight: '600',
  },
  labelText: {
    marginLeft: 3,
    marginBottom: 3,
    color: 'rgba(0,0,0,0.6)',
  },
});
