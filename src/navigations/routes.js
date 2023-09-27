import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
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
import {selectIsLoggedIn} from '../redux/store/validateOTPSlice';
import Portfolio from '../screens/portfolio';
import {Colors} from '../constants/color';
import ForgotPassword from '../screens/forgotPassword';
import Settings from '../screens/settings';
import {ActivityIndicator} from 'react-native-paper';
import ChangeProfileDetails from '../screens/profile/ChangeProfileDetails';
import OrderNotification from '../screens/settings/OrderNotification';
import UnblockUser from '../screens/unblockUser';
import GttOrder from '../screens/gttOrder';
import {constantStyles} from '../constants/styling';
import {connectToSocket} from '../redux/store/socketConnectionSlice';

const Stack = createStackNavigator();

export const Routes = () => {
  const [storageToken, setStorageToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  //const {validateOTPData} = useSelector((state) => state.validateOTP);
  useEffect(() => {
    getFunction();
    
  }, []);
  // useEffect(() => {
  //   if (accessToken || storageToken) {
  //     dispatch(connectToSocket());
  //     alert()
  //   }
  // }, [accessToken, storageToken]);
  const getFunction = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    setStorageToken(token);
  };
  const {accessToken, validateOTPData} = useSelector(
    state => state.validateOTP,
  );
  // console.log('accessToken', storageToken);
  // console.log('validateOTPData', accessToken);

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {accessToken || storageToken ? (
            <>
                  <Stack.Screen name="Drawer" component={DrawerNavigation} />
                  <Stack.Screen
                    name="BottomTab"
                    component={BottomTabNavigation}
                  />
                  <Stack.Screen name="CancelScreen" component={CancelScreen} />
                  <Stack.Screen name="Search" component={Search} />
                  <Stack.Screen name="GroupDetail" component={GroupDetails} />
                  <Stack.Screen name="BuySell" component={BuySellScreen} />
                  <Stack.Screen
                    name="PlaceOrder"
                    component={PlaceOrderScreen}
                  />
                  <Stack.Screen name="Profile" component={Profile} />
                  <Stack.Screen
                    name="Portfolio"
                    component={Portfolio}
                    options={{
                      headerShown: true,
                      headerStyle: {
                        backgroundColor: Colors.TRANSPARENT,
                      },
                    }}
                  />
                  <Stack.Screen name="Settings" component={Settings} />
                  <Stack.Screen
                    name="ChangeProfileDetails"
                    component={ChangeProfileDetails}
                  />
                  <Stack.Screen
                    name="OrderNotification"
                    component={OrderNotification}
                  />
                  <Stack.Screen name="GTT" component={GttOrder} />
                </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="OTP" component={OTPValidation} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="UnblockUser" component={UnblockUser} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
