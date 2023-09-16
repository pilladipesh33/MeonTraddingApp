import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import Header from '../../components/Header';
import {Avatar, Button, TextInput} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../../constants/color';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordItem } from '../../redux/store/changePasswordSlice';

const ChangeProfileDetails = ({navigation, route}) => {
  const userProfile = route?.params?.key;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [payload, setPayload] = useState('');
  const dispatch = useDispatch();
  const {changePasswordDetails} = useSelector(state => state.changePassword);

  const handleEditProfile = () => {
    if(oldPassword && newPassword == confirmPassword){
        setPayload({
            userID: userProfile?.ClientId,
            oldLoginPassword: oldPassword,
            nwLoginPassword: newPassword,
            confirmNewLoginPassword : confirmPassword
        })
    }
  }
  useEffect(() => {
    if(payload){
        dispatch(changePasswordItem(payload))
        // console.log('changePasswordDetails', changePasswordDetails)
        alert("Password changed successfully")
        navigation.goBack()
    }
  },[payload])

  return (
    <View style={styles.androidSafeArea}>
      <Header title={'Edit Profile'} onPress={() => navigation.goBack()} />
      <View style={styles.editContainer}>
        <Avatar.Text
          size={24}
          label={userProfile?.ClientName}
          style={styles.picContainer}
        />
        <TouchableOpacity style={styles.editButtonContainer}>
          <Feather name="edit" color={Colors.WHITE} size={24} />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: '10%'}}>
        <Text style={styles.detailText2}>Change Password</Text>
        <TextInput
          label="Old Password"
          placeholder="Enter old password"
          value={oldPassword}
          onChangeText={text => setOldPassword(text)}
          mode="outlined"
        />
        <TextInput
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
          mode="outlined"
        />
        <TextInput
          label="Confirm Password"
          placeholder="Confirm you new password"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          mode="outlined"
        />
        <View style={{paddingTop: 20}}>
          <Button mode="contained" onPress={handleEditProfile}>
            <Text>Submit</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ChangeProfileDetails;
