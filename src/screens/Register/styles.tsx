import { StyleSheet } from 'react-native';
import { PRIMARY } from '../../constant';

export default StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  formDiv: {
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    textAlign: 'center',
    marginBottom: 6,
    fontSize: 24,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.5)',
  },
  input: {
    width: '100%',
    height: 60,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: PRIMARY,
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
});
