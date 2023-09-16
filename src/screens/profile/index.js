import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {styles} from './styles';
import {Colors} from '../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {setAccessToken} from '../../redux/store/validateOTPSlice';

const Profile = ({navigation}) => {
  const [userProfile, setUserProfile] = useState('');
  const dispatch = useDispatch();
  const {accessToken} = useSelector(state => state.validateOTP)

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
      dispatch(setAccessToken(null));
      console.log('token', accessToken)
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

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

  console.log('userProfile', userProfile);

  return (
    <ScrollView style={{backgroundColor: Colors.WHITE}}>
      <View style={styles.androidSafeArea}>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            {/* <Feather name={'chevron-down'} size={40} color={Colors.MATT_BLACK} /> */}
          </View>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>{userProfile?.ClientName}</Text>
            <View style={{paddingRight: 10}}>
              <Feather name={'bell'} size={20} color={Colors.MATT_BLACK} />
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <View style={styles.columnContainer}>
              <Text style={styles.detailText}>E-mail</Text>
              <Text style={styles.detailText}>Phone</Text>
              <Text style={styles.detailText}>PAN</Text>
              <Text style={styles.detailText}>Demat (BO)</Text>
            </View>
            <View style={styles.columnContainer2}>
              <Text style={styles.detailText2}>{userProfile?.EmailId}</Text>
              <Text style={styles.detailText2}>{userProfile?.MobileNo}</Text>
              <Text style={styles.detailText2}>{userProfile?.PAN}</Text>
              <Text style={styles.detailText2}>
                {userProfile?.DematAccountNumber}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={{paddingTop: 10, paddingBottom: 10}}>
            <Text style={styles.detailText2}>Bank accounts</Text>
            <Text style={styles.detailText}>
              {userProfile == undefined
                ? userProfile?.ClientBankInfoList[0].BankName
                : 'NULL'}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <View style={styles.columnContainer}>
              <Text style={styles.detailText}>Segments</Text>
              <Text style={styles.detailText}>Demat authorisation</Text>
            </View>
            <View style={styles.columnContainer2}>
              <Text style={[styles.detailText2, {color: Colors.BLUE}]}>
                NFO, MF, CDS, MCX, BSE, NSE
              </Text>
              <Text style={[styles.detailText2, {color: Colors.BLUE}]}>
                POA
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Portfolio')} style={styles.item}>
            <Feather
              name="briefcase"
              size={24}
              color={Colors.GREY}
            />
            <Text style={styles.header}>Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Funds')}
            style={styles.item}>
            <MaterialIcons
              name="account-balance-wallet"
              size={24}
              color={Colors.GREY}
            />
            <Text style={styles.header}>Funds</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLogout()} style={styles.item}>
            <MaterialIcons
              name="logout"
              size={24}
              color={Colors.GREY}
            />
            <Text style={styles.header}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
