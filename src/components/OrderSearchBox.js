import {View, Text} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {styles} from '../screens/order/styles';
import { Colors } from '../constants/color';

const OrderSearchBox = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: Colors.BORDER_GREY,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={styles.searchBarContainer}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Search')}> */}
        <Feather name="search" size={20} color={Colors.BLUE} />
        {/* </TouchableOpacity> */}
        <SimpleLineIcons
          name="equalizer"
          size={20}
          color={Colors.BLUE}
          style={{paddingLeft: 15}}
        />
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <Text style={styles.searchBarText}>Tradebook</Text>
      </View>
    </View>
  );
};

export default OrderSearchBox;
