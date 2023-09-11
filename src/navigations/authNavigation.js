import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login';
import SignUp from '../screens/signUp';
import OTPValidation from '../screens/otp';
import BottomTabNavigation from './bottomTabNavigation';
// import CancelScreen from '../screens/order/CancelScreen';
// import Search from '../screens/Search';


const Stack = createStackNavigator();

function AuthNavigation() {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OTP" component={OTPValidation} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
      </Stack.Navigator>
  );
}

export default AuthNavigation;
