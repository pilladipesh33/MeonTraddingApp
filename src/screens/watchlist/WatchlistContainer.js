import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getGroupDetails} from '../../redux/store/getGroupDetailsSlice';
import {Colors} from '../../constants/color';
import SelectDropdown from 'react-native-select-dropdown';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const WatchlistContainer = ({navigation}) => {
  const {groups} = useSelector(state => state.getGroupDetails);
  const [groupList, setGroupList] = useState([]);
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    dispatch(getGroupDetails());
    if (groups?.type == 'success') {
      setGroupList(groups?.result?.groupList);
    }
  }, [navigation, groups]);

// console.log('groupList', groupList)

  return (
    <FlatList
      data={groupList}
      keyExtractor={item => item?.groupName}
      renderItem={({item}) => (
        <View style={{paddingTop: 10}}>
          <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('GroupDetail', {key: item})}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={[styles.containerReverse, {alignItems: 'flex-start'}]}>
                <Text style={styles.headingText}>{item?.groupName}</Text>
                <Text style={styles.subContentText}>
                  {item?.exchangeSegment}
                </Text>
              </View>
              <View style={styles.containerReverse}>
                <Text style={[styles.headingText, {color: item.color}]}>
                  {item.value}
                </Text>
                <Text style={[styles.subContentText, {color: Colors.BLACK}]}>
                  {item.increment}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      maxToRenderPerBatch={10}
    />
    
  );
};

export default WatchlistContainer;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.GREY,
  },
  containerReverse: {
    flexDirection: 'column',
    padding: 5,
    alignItems: 'flex-end',
  },
  headingText: {
    color: Colors.BLACK,
    fontSize: 15,
    fontWeight: '400',
  },
  subContentText: {
    color: Colors.GREY,
    fontSize: 14,
  },
  dropdown2BtnStyle: {
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderColor: Colors.BORDER_GREY,
  },
});
