import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, CheckBox, Icon, Input, Text} from '@rneui/themed';
import {styles} from './styles';
import {TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../constants/color';

const AddFunds = ({title}) => {
  const [userProfile, setUserProfile] = useState('');
  const [check4, setCheck4] = useState(false);
  const [isBankDetails, setIsBankDetails] = useState([]);
  const [isBankName, setIsBankName] = useState('')
  const fetchUserDetails = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const userID = await AsyncStorage.getItem('USER_ID');
    const apiUrl = `https://itrade.investmentwallet.in:10121/enterprise/user/profile?clientID=${userID}&userID=${userID}`;
    const requestOption = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await fetch(apiUrl, requestOption);
    const data = await response?.json();
    AsyncStorage.setItem('EMAIL', data?.result?.EmailId);
    AsyncStorage.setItem('PHONE', data?.result?.MobileNo);
    if (data?.type == 'success') {
      setUserProfile(data?.result);
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if(userProfile){
        setIsBankDetails(userProfile?.ClientBankInfoList)
    }
  })

  useEffect(() => {
    if(isBankDetails){
        if (isBankDetails && isBankDetails.length > 0 && isBankDetails[0].BankName) {
            setIsBankName(isBankDetails[0].BankName);
            console.log('BankName:', isBankName);
          } else {
            console.log('BankName not found in the array.');
          }
    }
  })

  return (
    <View style={styles.container}>
      <Text h3 h3Style={styles.heading}>
        {title ? title : "Deposit Funds"}
      </Text>
      <View style={styles.nameContainer}>
        <Text h4 h4Style={styles.nameText}>
          {userProfile?.ClientName}
        </Text>
      </View>
      <View style={{paddingTop: 15}}>
        <Text style={styles.inputText}>Amount</Text>
        <Input
          placeholder="Enter Amount"
          leftIcon={<Icon name="currency-rupee" size={24} color="black" />}
          leftIconContainerStyle={{backgroundColor: Colors.BORDER_GREY}}
        />
        <Text style={styles.inputText}>Select bank account</Text>
        <View style={styles.rowContainer}>
          <Text style={[styles.bankText]}>{isBankName}</Text>
          <CheckBox
            center
            checkedIcon={
              <Icon
                name="radio-button-checked"
                type="material"
                color="green"
                size={25}
                iconStyle={{marginRight: 10}}
              />
            }
            uncheckedIcon={
              <Icon
                name="radio-button-unchecked"
                type="material"
                color="grey"
                size={25}
                iconStyle={{marginRight: 10}}
              />
            }
            checked={check4}
            onPress={() => setCheck4(!check4)}
          />
        </View>
        <Text style={styles.inputText}>Virtual payment address (UPI ID)</Text>
        <Input placeholder="example: username@upi" />
      </View>
      <View>
        <Button title={'Submit'} />
      </View>
    </View>
  );
};

export default AddFunds;
