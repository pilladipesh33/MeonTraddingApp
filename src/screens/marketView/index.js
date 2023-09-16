import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'

const MarketView = ({navigation}) => {
  const mode = useSelector((state) => state.theme.mode);
  return (
    <View style={mode == 'Light' ? styles.androidSafeAreaDark : styles.androidSafeArea}>
      <Header menu={true} title={'Stocks'} onPress={() => navigation.openDrawer()} />
    </View>
  )
}

export default MarketView