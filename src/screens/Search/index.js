import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {searchStockData} from '../../redux/store/searchStockDataSlice';
import {Colors} from '../../constants/color';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addStockToGroupItem } from '../../redux/store/addStockToGroupSlice';

const Search = ({navigation}) => {
  const {stockData, stockStatus} = useSelector(state => state.searchStockData);
  const dispatch = useDispatch();
  const [watchListData, setWatchListData] = useState([]);
  const [searchwatchListData, setSearchWatchListData] = useState('');
  const [timer, setTimer] = useState(null);
  const [payload, setPayload] = useState('');
  const modes = useSelector(state => state.theme.mode);

  useEffect(() => {
    if (searchwatchListData) {
      if (timer) {
        clearTimeout(timer);
      }
      const timeout = setTimeout(() => {
        if (searchwatchListData.length > 1) {
          //console.log('test2', searchwatchListData);
          dispatch(searchStockData(searchwatchListData));
        }
      }, 500);
      setTimer(timeout);
    } else {
      setWatchListData([]);
    }
  }, [searchwatchListData]);

  const searchMarketData = text => {
    setSearchWatchListData(text);
  };

  useEffect(() => {
    if (stockData?.type == 'success') {
      setWatchListData(stockData?.result);
    }
  });

  const handleAddToGroup = async (exchangeSegment, exchangeInstrumentID) => {
    if (watchListData) {
      setPayload({
        userID: await AsyncStorage.getItem('USER_ID'),
        groupName: 'group1',
        exchangeSegment: exchangeSegment,
        exchangeInstrumentID: exchangeInstrumentID,
        symbolExpiry: '9999-12-31',
      });
      console.log('payload', payload)
    }
  };

  useEffect(() => {
    if(payload){
      dispatch(addStockToGroupItem(payload));
    }
  },[payload])

  const {addedStock} = useSelector((state) => state.addStockToGroup);

  useEffect(() => {
    if(addedStock.type == 'success'){
      alert(addedStock?.description)
      navigation.goBack();
    }else {
      alert(addedStock?.error)
    }
  },[addedStock])

  //console.log('test1', watchListData);
  //sconsole.log('test2', watchListData.map())
  return (
    <View
      style={
        modes == 'Light' ? styles.androidSafeAreaDark : styles.androidSafeArea
      }>
      <View style={styles.searchBox}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={25}
            color={modes == 'Light' ? Colors.WHITE : Colors.MATT_BLACK}
            style={{paddingLeft: 15}}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Search eg: INFY base, NIFY fut"
          style={
            modes == 'Light'
              ? styles.textInputContainerDark
              : styles.textInputContainer
          }
          onChangeText={searchMarketData}
          value={searchwatchListData}
          placeholderTextColor={
            modes == 'Light' ? Colors.LIGHT_TEXT : Colors.GREY
          }
        />
      </View>
      {watchListData.length !== null || watchListData !== undefined ? (
        <View style={{paddingTop: 10}}>
          <FlatList
            data={watchListData}
            keyExtractor={item => item?.ExchangeInstrumentID}
            renderItem={({item}) => (
              <View style={styles.cardContainer}>
                <TouchableOpacity
                  style={styles.searchCard}
                  onPress={() => navigation.navigate('BuySell', {key: item})}>
                  <View
                    style={{
                      height: 25,
                      width: 40,
                      backgroundColor:
                        modes == 'Light' ? Colors.BROWN : Colors.LIGHT_GREEN,
                    }}>
                    <Text
                      style={{
                        color: modes == 'Light' ? Colors.RED : Colors.GREEN,
                        textAlign: 'center',
                      }}>
                      {item?.Series}
                    </Text>
                  </View>
                  <View style={styles.contentContainer}>
                    <Text
                      style={
                        modes == 'Light' ? styles.headingDark : styles.heading
                      }>
                      {item?.DisplayName}
                    </Text>
                    <Text
                      style={
                        modes == 'Light' ? styles.contentDark : styles.content
                      }>
                      {item?.CompanyName}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAddToGroup(item.ExchangeSegment, item.ExchangeInstrumentID)}>
                  <AntDesign name="plussquareo" size={24} color={Colors.BLUE} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default Search;
