import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import {Colors} from '../../constants/color';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useDispatch, useSelector} from 'react-redux';
import { positionItem } from '../../redux/store/positionSlice';
import PortfolioContainer from './PortfolioContainer';

const Positions = () => {
    const dispatch = useDispatch();
    const {positionData} = useSelector((state) => state.positions)
    useEffect(() => {
        dispatch(positionItem());
    },[])
  return (
    <View style={styles.bodyContainer}>
      <View style={[styles.boxContainer2, styles.elevation]}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 15}}>
          <Text style={{fontSize: 16, color: Colors.GREY}}>Total P&L</Text>
          <Text style={{fontSize: 20, color: Colors.BLACK}}>0.00</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: Colors.BORDER_GREY,
          justifyContent: 'space-between',
          alignItems: 'center',
          top: 80,
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
        <View />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Octicons
            name="people"
            size={20}
            style={{paddingRight: 10}}
            color={Colors.BLUE}
          />
          <Text style={styles.searchBarText}>Family</Text>
          <Text style={styles.searchBarText}>Analytics</Text>
        </View>
      </View>
      <PortfolioContainer positionData={positionData?.result} />
    </View>
  );
};

export default Positions;
