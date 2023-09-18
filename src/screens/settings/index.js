import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from '../../components/Header';
import {Switch, Text} from 'react-native-paper';
import {Colors} from '../../constants/color';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/store/themeSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Settings = ({navigation}) => {
    const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme(mode === 'Light' ? 'Dark' : 'Light'))
  };

    // console.log('darkMode', mode)
  return (
    <View style={mode == 'Light' ? styles.androidSafeAreaDark : styles.androidSafeArea}>
      <Header onPress={() => navigation.openDrawer()} title={'Settings'} menu={true}/>
      <View style={styles.rowContainer}>
        <Text style={mode == 'Light' ? styles.themeTextDark : styles.themeText}>{mode} Theme</Text>
        <Switch
          value={mode}
          onValueChange={handleToggleTheme}
          color={mode == 'Light' ? Colors.DARK_BLUE : Colors.PURPLE }
        />
      </View>
      <TouchableOpacity style={[styles.settingContainer, styles.rowContainer]} onPress={() => navigation.navigate('OrderNotification')}>
        <Text style={mode == 'Light' ?styles.themeTextDark : styles.themeText}>Notifications</Text>
        <MaterialIcons name='arrow-forward-ios' size={24} color={mode == 'Light' ? Colors.WHITE : Colors.BLACK} />
      </TouchableOpacity>
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
