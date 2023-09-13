import { View, Text } from 'react-native'
import React from 'react'
import { AlertTopBarNavigation } from '../../navigations/TopBarNavigation'
import { styles } from './styles'

const Alert = () => {
  return (
    <View style={styles.container}>
      <AlertTopBarNavigation />
    </View>
  )
}

export default Alert