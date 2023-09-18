import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { Colors } from '../../constants/color'
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import OrderSearchBox from '../../components/OrderSearchBox';
import { useSelector } from 'react-redux';

const Open = () => {
  const mode = useSelector((state) => state.theme.mode);
  return (
    <View>
      <View style={mode == 'Light' ? styles.bodyContainerDark : styles.bodyContainer}>
        <View style={styles.bodyContentContainer}>
          <OrderSearchBox />
          {/* Flatlist to show data */}
            {/* <OrderContainer data={data} navigation={navigation}/>  */}
        </View>
      </View>
    </View>
  )
}

export default Open