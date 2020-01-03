import { createStackNavigator } from 'react-navigation-stack';
// import SignInScreen from '../../src/screens/SignInScreen';
// import SignUpScreen from '../../src/screens/SignUpScreen';

const AuthStack = createStackNavigator(
  {
    // SignIn: SignInScreen,
    // SignUp: SignUpScreen,
  },
  {
    initialRouteName: 'SignIn',
  },
);

export default AuthStack;
