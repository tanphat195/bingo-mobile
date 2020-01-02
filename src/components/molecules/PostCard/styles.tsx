import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flexDirection: 'row',
  },
  left: {
    flexDirection: 'column',
    width: '55%',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.8)',
  },
  created_at: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
    marginTop: 8,
  },
  right: {
    width: '45%',
    paddingLeft: 15,
  },
  photo: {
    width: '100%',
    height: 90,
    borderRadius: 4,
    resizeMode: 'cover',
  }
});