import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AuthNavigation from './authNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {connectToSocket} from '../redux/store/socketConnectionSlice';
import StackNavigation from './StackNavigation';
import {NavigationContainer} from '@react-navigation/native';

export const Routes = () => {
  const [accessToken, setAccessToken] = useState('');
  const dispatch = useDispatch();
  //const {validateOTPData} = useSelector((state) => state.validateOTP);
  useEffect(() => {
    const getAccessToken = async () => {
      const token = await AsyncStorage.getItem('TOKEN');
      setAccessToken(token);
      console.log('tok', token);
    };
    dispatch(connectToSocket());
    return getAccessToken();
  }, []);

  console.log('accessToken', accessToken);
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
      {accessToken ? (
        <StackNavigation />
        ) : (
          <AuthNavigation />
      )}
      </NavigationContainer>
    </View>
  );
};
