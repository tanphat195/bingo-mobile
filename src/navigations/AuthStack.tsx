import { createStackNavigator } from 'react-navigation-stack';
import SignInScreen from '../../../../mobile/very/src/screens/SignInScreen';
import SignUpScreen from '../../../../mobile/very/src/screens/SignUpScreen';

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  },
  {
    initialRouteName: 'SignIn',
  },
);

export default AuthStack;
