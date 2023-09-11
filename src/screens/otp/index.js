import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput, Button} from 'react-native-paper';
import {validateOTPUser} from '../../redux/store/validateOTPSlice';
import { Colors } from '../../constants/color';

const OTPValidation = ({navigation}) => {
  const {userData} = useSelector(state => state.login);
  const [pin, setPin] = useState('');
  const dispatch = useDispatch();
  const handleVerifyOtp = () => {
    if (pin) {
      dispatch(
        validateOTPUser({
          userID: userData?.result?.userID,
          pin: pin,
          source: 'EnterpriseWeb',
        }),
      );
    }
    if(userData?.type)
    navigation.navigate('BottomTab');
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
