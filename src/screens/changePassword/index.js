import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './styles';
import {Colors} from '../../constants/color';
import {Button, TextInput} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordItem } from '../../redux/store/forgotPasswordSlice';

const ForgotPassword = ({navigation}) => {
  const [userID, setUserID] = useState('40151');
  const [panID, setPanID] = useState('BURPJ6446D');
  const [dob, setDob] = useState('03-Feb-1997');
  const [payload, setPayload] = useState("")
  const dispatch = useDispatch();
  const {forgotPasswordDetails} = useSelector(state => state.forgotPassword)

  return (
    <View style={styles.AndroidSafeAreaView}>
      <View style={styles.headerContainer}>
        <Feather
          name="arrow-left"
          size={24}
          color={Colors.MATT_BLACK}
          onPress={() => navigation.navigate('Login')}
        />
        <Text style={styles.headerText}>Forgot Password</Text>
      </View>
      <View style={[styles.inputContainer]}>
        <View style={styles.dataContainer}>
          <TextInput
            label="User ID"
            placeholder="Enter User ID"
            value={userID}
            onChangeText={text => setUserID(text)}
            mode="outlined"
          />

          <View style={{paddingTop: 10}}>
            <TextInput
              label="D.O.B"
              placeholder="Enter Date of Birth (3-Feb-1997)"
              value={dob}
              onChangeText={text => setDob(text)}
              mode="outlined"
            />
          </View>
          <View style={{paddingTop: 10}}>
            <TextInput
              label="Pan ID"
              placeholder="Enter Pan Number"
              value={panID}
              onChangeText={text => setPanID(text)}
              mode="outlined"
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => handleSubmitButton()}>
          <Text>Submit</Text>
        </Button>
      </View>
    </View>
  );
};

export default ForgotPassword;
