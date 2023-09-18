import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { styles } from './styles'
import OrderSearchBox from '../../components/OrderSearchBox';
import {useDispatch, useSelector} from 'react-redux';
import { orderBookData } from '../../redux/store/orderBookSlice';
import OrderContainer from './OrderContainer';

const Executed = ({navigation, route}) => {
  const mode = useSelector((state) => state.theme.mode);
  const [executedOrder, setExecutedOrder] = useState([]);
  //console.log('data', route?.param)
  return (
    <View>
      <View style={mode=='Light'? styles.bodyContainerDark : styles.bodyContainer}>
        <View style={styles.bodyContentContainer}>
          <OrderSearchBox />
          {/* Flatlist to show data */}
            <OrderContainer navigation={navigation}/> 
        </View>
      </View>
    </View>
  )
}

export default Executed