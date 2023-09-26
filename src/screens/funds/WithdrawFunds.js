import { View, Text } from 'react-native'
import React from 'react'
import AddFunds from './AddFunds'
import { useSelector } from 'react-redux'
import { styles } from './styles'
import { constantStyles } from '../../constants/styling'

const WithdrawFunds = () => {
  const mode = useSelector((state) => state.theme.mode);
  return (
    <View style={mode == 'Light' ? constantStyles.androidSafeAreaDark : constantStyles.androidSafeArea}>
      <AddFunds title = {'Withdraw Funds'}/>
    </View>
  )
}

export default WithdrawFunds