import { View, Text } from 'react-native'
import React from 'react'
import { AlertTopBarNavigation } from '../../navigations/TopBarNavigation'
import { styles } from './styles'
import Header from '../../components/Header'
import { useSelector } from 'react-redux'

const Alert = ({navigation}) => {
  const mode = useSelector((state) => state?.theme?.mode)
  return (
    <View style={mode == 'Light' ? styles.androidSafeAreaDark : styles.androidSafeArea}>
      <Header menu={true} title={'Alerts'} onPress={() => navigation.openDrawer()} />
      <AlertTopBarNavigation />
    </View>
  )
}

export default Alert