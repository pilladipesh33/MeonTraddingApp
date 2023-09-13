import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { OrderTopBarNavigation } from '../../navigations/TopBarNavigation'
import { styles } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { orderBookData } from '../../redux/store/orderBookSlice'

const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(orderBookData());
  },[]);
  return (
    <View style={styles.androidSafeArea}>
      {/* <View style={styles.container}>
      <Text style={styles.headerText}>Orders</Text>
      </View> */}
      <OrderTopBarNavigation/>
    </View>
  )
}

export default Order