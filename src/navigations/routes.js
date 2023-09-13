import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AuthNavigation from './authNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {connectToSocket} from '../redux/store/socketConnectionSlice';
import StackNavigation from './StackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './DrawerNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigation from './bottomTabNavigation';
import CancelScreen from '../screens/order/CancelScreen';
import GroupDetails from '../screens/watchlist/GroupDetails';
import Search from '../screens/Search';
import PlaceOrderScreen from '../screens/buy&sell/placeOrderScreen';
import Profile from '../screens/profile';
import Login from '../screens/login';
import OTPValidation from '../screens/otp';
import SignUp from '../screens/signUp';
import BuySellScreen from '../screens/buy&sell';

const Stack = createStackNavigator();

export const Routes = () => {
  const [accessToken, setAccessToken] = useState('');
  const dispatch = useDispatch();
  //const {validateOTPData} = useSelector((state) => state.validateOTP);
  useEffect(() => {
    async function getAccessToken() {
      const token = await AsyncStorage.getItem('TOKEN');
      setAccessToken(token);
      console.log('tok', token);
    }
    dispatch(connectToSocket());
    return getAccessToken();
  }, []);

  console.log('accessToken', accessToken);
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          {accessToken ? (
            <>
            <Stack.Screen name="Drawer" component={DrawerNavigation} />
            <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
            <Stack.Screen name="CancelScreen" component={CancelScreen} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="GroupDetail" component={GroupDetails} />
            <Stack.Screen name="BuySell" component={BuySellScreen} />
            <Stack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
          ) : (
            <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="OTP" component={OTPValidation} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
