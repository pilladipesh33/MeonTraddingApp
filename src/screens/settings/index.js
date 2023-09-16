import {View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from '../../components/Header';
import {Switch, Text} from 'react-native-paper';
import {Colors} from '../../constants/color';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/store/themeSlice';

const Settings = ({navigation}) => {
    const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme(mode === 'Light' ? 'Dark' : 'Light'))
  };

    // console.log('darkMode', mode)
  return (
    <View style={mode == 'Light' ? styles.androidSafeAreaDark : styles.androidSafeArea}>
      <Header onPress={() => navigation.goBack()} title={'Settings'} />
      <View style={styles.rowContainer}>
        <Text style={mode == 'Light' ? styles.themeTextDark : styles.themeText}>{mode} Theme</Text>
        <Switch
          value={mode}
          onValueChange={handleToggleTheme}
        />
      </View>
      <View style={[styles.settingContainer, styles.rowContainer]}>
        <Text style={mode == 'Light' ?styles.themeTextDark : styles.themeText}>Order Notification</Text>
        <Switch color={Colors.GREEN}/>
      </View>
      <View style={[styles.settingContainer, styles.rowContainer]}>
        <Text style={mode == 'Light' ?styles.themeTextDark : styles.themeText}>Order Confirmation</Text>
        <Switch color={Colors.GREEN}/>
      </View>
      <View style={[styles.settingContainer, styles.rowContainer]}>
        <Text style={mode == 'Light' ?styles.themeTextDark : styles.themeText}>Fingerprint</Text>
        <Switch color={Colors.GREEN}/>
      </View>
    </View>
  );
};

export default Settings;
