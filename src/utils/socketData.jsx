import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const SocketData = () => {
    const {socketData} = useSelector(state => state.socketConnection);
//     console.log('socketData', socketData)
  return (
    <View>
      <Text>socketData</Text>
    </View>
  )
}

export default SocketData