import { View, Text } from 'react-native'
import React from 'react'
import { ScannerTopBarNavigation } from '../../navigations/TopBarNavigation'

const Scanners = () => {
  return (
    <View style={{flex: 1}}>
      <ScannerTopBarNavigation />
    </View>
  )
}

export default Scanners