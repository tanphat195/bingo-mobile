import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  header: {
    height: 60,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
  },
  form: {
    margin: 20,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 12,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 12,
  },
  relative: {
    position: 'relative',
  },
  title: {
    fontSize: 20,
  },
  input: {
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: '#FFF',
    height: 48,
    paddingHorizontal: 12,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowColor: 'rgba(0,0,0,0.3)',
    color: 'rgba(0,0,0,0.5)',
    letterSpacing: 1,
  },
  clear: {
    position: 'absolute',
    right: 8,
    top: 12,
    padding: 4,
  },
  status: {
    fontSize: 12,
  },
  fieldRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  textError: {
    color: 'red',
    marginTop: 3,
    marginLeft: 3,
  },
});
