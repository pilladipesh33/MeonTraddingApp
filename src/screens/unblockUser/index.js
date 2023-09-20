import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import {TextInput} from 'react-native-paper';
import {unblockUserItem} from '../../redux/store/unblockUserSlice';
import {Button} from '@rneui/themed';

const UnblockUser = ({navigation}) => {
  const [userID, setUserID] = useState('');
  const [dob, setDob] = useState('');
  const [panID, setPanID] = useState('');
  const [payload, setPayload] = useState('');
  const dispatch = useDispatch();
  const mode = useSelector(state => state.theme.mode);
  const unblockUserDetails = useSelector(state => state.unblockUser);

  console.log(dob, userID, panID )

  const handleSubmit = () => {
    if (userID && dob && panID) {
      setPayload({
        userID: userID,
        dateOfBirth: dob,
        panNo: panID,
      });
      console.log('payload', payload)
    }
  };

  useEffect(() => {
    if (payload) {
      dispatch(unblockUserItem(payload));
    }
  }, [payload]);
  
  useEffect(() => {
    if (unblockUserDetails?.unblockUserDetails?.type == 'success') {
      alert(unblockUserDetails?.unblockUserDetails?.description);
      navigation.goBack();
    }
  });
  return (
    <View
      style={
        mode == 'Light' ? styles.androidSafeAreaDark : styles.androidSafeArea
      }>
      <Header title={'Unblock User'} onPress={() => navigation.goBack()} />
      <View>
        <TextInput
          label="User ID"
          value={userID}
          onChangeText={text => setUserID(text)}
          mode="outlined"
          placeholder="Enter User ID"
        />
        <TextInput
          label="D.O.B"
          value={dob}
          onChangeText={text => setDob(text)}
          mode="outlined"
          placeholder="E.g - 03-Feb-1997"
        />
        <TextInput
          label="Pan ID"
          value={panID}
          onChangeText={text => setPanID(text)}
          mode="outlined"
          placeholder="Enter Pan number "
          autoCapitalize="characters"
        />
      </View>
      <View style={{alignSelf: 'center', paddingTop: 30}}>
      <Button
        title="Unblock User"
        buttonStyle={{
          backgroundColor: 'black',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{fontWeight: 'bold'}}
        onPress={handleSubmit}
      />
      </View>
    </View>
  );
};

export default UnblockUser;
