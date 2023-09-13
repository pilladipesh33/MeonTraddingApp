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

const Search = ({navigation}) => {
  const {stockData, stockStatus} = useSelector(state => state.searchStockData);
  const dispatch = useDispatch();
  const [watchListData, setWatchListData] = useState([]);
  const [searchwatchListData, setSearchWatchListData] = useState('');
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (searchwatchListData) {
      if (timer) {
        clearTimeout(timer);
      }
      const timeout = setTimeout(() => {
        if (searchwatchListData.length > 1) {
          console.log('test2', searchwatchListData);
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

  console.log('test1', watchListData);
  //sconsole.log('test2', watchListData.map())
  return (
    <View style={styles.androidSafeArea}>
      <View style={styles.searchBox}>
        <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
          <AntDesign
            name="arrowleft"
            size={25}
            color={Colors.MATT_BLACK}
            style={{paddingLeft: 15}}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Search eg: INFY base, NIFY fut"
          style={styles.textInputContainer}
          onChangeText={searchMarketData}
          value={searchwatchListData}
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
                  onPress={() =>
                    navigation.navigate('BuySell', {key: item})
                  }>
                  <View
                    style={{
                      height: 25,
                      width: 40,
                      backgroundColor: Colors.LIGHT_GREEN,
                    }}>
                    <Text style={{color: Colors.GREEN, textAlign: 'center'}}>
                      {item?.Series}
                    </Text>
                  </View>
                  <View style={styles.contentContainer}>
                    <Text style={styles.heading}>{item?.DisplayName}</Text>
                    <Text style={styles.content}>{item?.CompanyName}</Text>
                  </View>
                </TouchableOpacity>
                <View>
                  <AntDesign name="plussquareo" size={20} color={Colors.BLUE} />
                </View>
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
