import {createStackNavigator} from '@react-navigation/stack';
// import Login from '../screens/login';
// import SignUp from '../screens/signUp';
// import OTPValidation from '../screens/otp';
import BottomTabNavigation from './bottomTabNavigation';
import CancelScreen from '../screens/order/CancelScreen';
import Search from '../screens/Search';
import GroupDetails from '../screens/watchlist/GroupDetails';
import BuySellScreen from '../screens/buy&sell';
import placeOrderScreen from '../screens/buy&sell/placeOrderScreen';
import Login from '../screens/login';
import Profile from '../screens/profile';
import DrawerNavigation from './DrawerNavigation';
import Portfolio from '../screens/portfolio';


const Stack = createStackNavigator();

function StackNavigation() {
  return (
      <Stack.Navigator
      initialRouteName='Drawer'
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
        <Stack.Screen name="CancelScreen" component={CancelScreen} />
        <Stack.Screen name='Search' component={Search} />
        <Stack.Screen name='GroupDetail' component={GroupDetails} />
        <Stack.Screen name='BuySell' component={BuySellScreen} />
        <Stack.Screen name='PlaceOrder' component={placeOrderScreen} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Drawer' component={DrawerNavigation} />
        <Stack.Screen name='Portfolio' component={Portfolio} />
        {/* <Stack.Screen name='Stack' component={StackNavigation} /> */}
      </Stack.Navigator>
  );
}

export default StackNavigation;
