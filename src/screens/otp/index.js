import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput, Button} from 'react-native-paper';
import {validateOTPUser} from '../../redux/store/validateOTPSlice';
import {Colors} from '../../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPValidation = ({navigation, route}) => {
  const {userData} = useSelector(state => state.login);
  const {validateOTPData} = useSelector(state => state.validateOTP);
  const [payload, setPayload] = useState('');
  const [pin, setPin] = useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (payload) {
      dispatch(validateOTPUser(payload));
    }
  }, [payload]);
  //console.log('TOKEN', AsyncStorage.getItem('TOKEN'));
  React.useEffect(() => {
    if (validateOTPData?.type == 'success') {
      // navigation.navigate('Profile')
    }
  }, [validateOTPData]);

  const handleVerifyOtp = () => {
    if (pin) {
      setPayload({
        userID: `${userData?.result?.userID}`,
        pin: pin,
        source: 'EnterpriseWeb',
      });
    }
    //console.log('validateOTPData', validateOTPData.type);
  };
  return (
    <View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: '700',
          color: Colors.BLACK,
          paddingTop: '10%',
        }}>
        Welcome {userData?.result?.userID} {'\n'}Enter OTP{' '}
      </Text>
      <View
        style={{
          justifyContent: 'center',
          paddingTop: '70%',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <TextInput
          label="OTP"
          value={pin}
          onChangeText={text => setPin(text)}
          mode="outlined"
          ke
        />
        <Button onPress={handleVerifyOtp}>
          <Text>Submit</Text>
        </Button>
      </View>
    </View>
  );
};

export default OTPValidation;

const styles = StyleSheet.create({});
