import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'

const MarketView = () => {
  return (
    <View style={styles.androidSafeView}>
      <Text style={styles.headerText}>Stocks</Text>
    </View>
  )
}

export default MarketView