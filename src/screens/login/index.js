import {Text, View, TouchableOpacity, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {TextInput, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../redux/store/loginSlice';
import {Colors} from '../../constants/color';

const Login = ({navigation, route}) => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [payload, setPayload] = useState('');
  const {userData} = useSelector(state => state.login);
  const key = route?.params?.key;

  //console.log('key', key)

  useEffect(() => {
    if (payload) {
      dispatch(loginUser(payload, navigation));
    }
  }, [payload]);

  const handleLogin = () => {
    if (userID && password) {
      setPayload({
        userID: userID,
        password: password,
      });
      navigation.navigate('OTP');
    } else {
      alert('Enter details');
    }
  };
  return (
    <View style={styles.AndroidSafeAreaView}>
      <Text style={styles.headingText}>Welcome to Meon Tradding</Text>
      <View style={styles.inputContainer}>
        <TextInput
          label="User ID"
          value={userID}
          onChangeText={text => setUserID(text)}
          mode="outlined"
        />
        <View style={{paddingTop: 20}}>
          <TextInput
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            mode="outlined"
          />
        </View>
      </View>
      <View style={styles.txtContainer}>
        <Text
          style={styles.txt}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password
        </Text>
        <Text
          style={[styles.txt, {color: Colors.BLUE}]}
          onPress={() => {
            Linking.openURL('https://google.com')
          }}>
          Create new account
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleLogin}>
          <Text>Submit</Text>
        </Button>
      </View>
    </View>
  );
};

export default Login;
