import { View, Text } from 'react-native'
import React from 'react'
import { ScannerTopBarNavigation } from '../../navigations/TopBarNavigation'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import { styles } from './styles'

const Scanners = ({navigation}) => {
  const mode = useSelector((state) => state.theme.mode)
  return (
    <View style={mode == 'Light' ? styles.androidSafeAreaDark : styles.androidSafeArea}>
      <Header menu={true} onPress={() => navigation.openDrawer()} title={'Scanner'} />
      <ScannerTopBarNavigation />
    </View>
  )
}

export default Scanners