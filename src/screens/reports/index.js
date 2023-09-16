import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { styles } from './styles';
import Header from '../../components/Header';

const Reports = ({navigation}) => {
  const mode = useSelector((state) => state.theme.mode);
  return (
    <View style={mode == 'Light' ? styles.androidSafeAreaDark : styles.androidSafeArea}> 
      <Header title={'Reports'} menu={true} onPress={() => navigation.openDrawer()} />
    </View>
  )
}

export default Reports