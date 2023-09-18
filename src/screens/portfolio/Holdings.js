import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import {Colors} from '../../constants/color';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {holdingData} from '../../constants/holdingData';
import PortfolioContainer from './PortfolioContainer';
import {useDispatch, useSelector} from 'react-redux';
import {holdingItem} from '../../redux/store/holdingSlice';

const Holdings = () => {
  const dispatch = useDispatch();
  const {holdingData} = useSelector(state => state.holding);
  useEffect(() => {
    dispatch(holdingItem());
  }, []);
  //console.log('holdingData', holdingData);
  return (
    <View style={styles.bodyContainer}>
      <View style={[styles.boxContainer, styles.elevation]}>
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>Invested</Text>
              <Text style={styles.contentText}>13,228.55</Text>
          </View>
          <View style={[styles.columnContainerReverse]}>
            <Text style={[styles.headingText, {paddingLeft: 45}]}>Current</Text>
            <Text style={styles.contentText}>15,463.77</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Colors.BORDER_GREY,
            width: '90%',
            alignSelf: 'center',
          }}></View>
        <View style={styles.rowContainer}>
          <Text style={[styles.contentText, {color: Colors.GREY}]}>P&L</Text>
          <View style={styles.rowContainer}>
            <Text style={[styles.contentText, {color: Colors.GREEN}]}>
              +2,235.22{' '}
            </Text>
            <View
              style={{
                width: 65,
                height: 30,
                borderRadius: 20,
                backgroundColor: Colors.LIGHT_GREEN,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.headingText, {color: Colors.GREEN}]}>
                +16.90%
              </Text>
            </View>
          </View>
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
      <PortfolioContainer />
    </View>
  );
};

export default Holdings;
