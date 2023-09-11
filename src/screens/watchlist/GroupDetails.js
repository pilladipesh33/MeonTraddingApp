import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_HEIGHT, WINDOW_HEIGHT} from '../../constants/dimensions';
import { Colors } from '../../constants/color';
import { deleteGroupItem } from '../../redux/store/deletGroupSlice';
import { getGroupSymbols } from '../../redux/store/getGroupSymbolSlice';
import { getInstrumentsDetailsById, updateInstrumentData } from '../../redux/store/getInstrumentsDetailByIdSlice';
import { subscriptionInstrumentsItem } from '../../redux/store/subscriptionsInstrumentsSlice';
import { unsubscriptionInstrumentsItem } from '../../redux/store/unsubscriptionsInstrumentSlice';

const GroupDetails = ({route, navigation}) => {
  const data = route?.params?.key;
  const groupName = data?.groupName;
  const [groupData, setGroupData] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [stockData, setStockData] = useState();
//   const [dataList, setDataList] = useState([]);
//   const [highValue, setHighValue] = useState('');
  //DELETE API INTEGRATION
  const dispatch = useDispatch();
  const {deletedGroup, deletedGroupStatus} = useSelector(
    state => state.deleteGroup,
  );

  // console.log('sct0,', stockDa
  const handleDeleteButton = () => {
    dispatch(deleteGroupItem(data?.groupName));
    if (deletedGroup?.type == 'success') {
      navigation.navigate('BottomTab');
    }
  };
  //GROUP DATA API INTEGRATI
  const {groupSymbol, groupSymbolStatus} = useSelector(
    state => state.getGroupSymbol,
  );

  useEffect(() => {
    dispatch(getGroupSymbols(groupName));
    if (groupSymbol?.type == 'success') {
      setGroupData(groupSymbol?.result);
      setInstruments(groupData?.instruments);
    }
  }, [groupSymbol]);

  const {instrumentsDetail, instrumentsDetailStatus} = useSelector(
    state => state.getInstrumentDetailsById,
  );

  useEffect(() => {
    if (instruments !== undefined) {
      dispatch(getInstrumentsDetailsById({instruments, source: 'WEB'}));
      setStockData(instrumentsDetail);
    } else if (instruments == undefined) {
      updateInstrumentData([]);
    }
  }, [instruments]);

  const handleBackButton = () => {
    navigation.navigate('BottomTab');
    setStockData('');
  };
  //SOCKET CONNECTIONS
  const {socketData, socketDataStatus, joined} = useSelector(
    state => state.socketConnection,
  );

  console.log('instruments', instruments)

  useEffect(() => {
    if (joined && instruments) {
      dispatch(
        subscriptionInstrumentsItem({
          instruments,
          xtsMessageCode: 1502,
        }),
      );
    }
    return () => {
      dispatch(
        unsubscriptionInstrumentsItem({
          instruments,
          xtsMessageCode: 1502,
        }),
      );
    };
  }, [joined]);

  // console.log('previousValue', previousValue);
  // console.log('currentValue', currentValue)
//   console.log('socketData', socketData.ExchangeInstrumentID);

  return (
    <View style={styles.androidSafeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBackButton}>
          <Feather name="chevron-left" size={25} color={Colors.BLACK} />
        </TouchableOpacity>
        <View style={styles.columnContainer}>
          <Text style={styles.headingText}>{data?.groupName}</Text>
          <Text style={styles.subHeadingText}>{data?.exchangeSegment}</Text>
        </View>
      </View>
      <View
        style={[
          styles.headerContainer,
          {
            justifyContent: 'space-between',
            borderBottomWidth: 0,
            paddingRight: 10,
            paddingLeft: 10,
          },
        ]}>
        <Text>Present in List</Text>
        <TouchableOpacity style={{}} onPress={handleDeleteButton}>
          <Feather name="trash-2" size={25} color={Colors.MATT_BLACK} />
        </TouchableOpacity>
      </View>
      <View style={{paddingTop: 10, flex: 1}}>
        <FlatList
          data={stockData?.result}
          keyExtractor={item => item?.exchangeInstrumentID}
          extraData={socketData}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                style={styles.dataContainer}
                onPress={() => navigation.navigate('BuyAndSell', {key: item})}>
                <View>
                  <View style={styles.columnContainer}>
                    <Text style={styles.textContainer}>
                      {item?.TradingSymbol}
                    </Text>
                    <Text style={styles.textContainer}>{item?.Name}</Text>
                  </View>
                  <View style={styles.columnContainer}>
                    {item?.ExchangeInstrumentID ==
                    socketData?.ExchangeInstrumentID ? (
                      <Text
                        style={[styles.textContainer, {color: Colors.GREEN}]}>
                        {socketData?.Touchline?.High}
                      </Text>
                    ) : (
                      <View>
                        <Text
                          style={[styles.textContainer, {color: Colors.GREEN}]}>
                          {item?.PriceBand?.High} {/* {previousValue} */}
                        </Text>
                      </View>
                    )}
                    {item?.ExchangeInstrumentID ==
                    socketData?.ExchangeInstrumentID ? (
                      <Text style={[styles.textContainer, {color: Colors.RED}]}>
                        {socketData?.Touchline?.Low}{' '}
                      </Text>
                    ) : (
                      <View>
                        <Text
                          style={[styles.textContainer, {color: Colors.RED}]}>
                          {item?.PriceBand?.Low}{' '}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                {/* ) : (
                    <View></View>
                  )} */}
              </TouchableOpacity>
            </View>
          )}
          initialNumToRender={10}
        />
      </View>
    </View>
  );
};

export default GroupDetails;

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: SCREEN_HEIGHT - WINDOW_HEIGHT,
    borderBottomWidth: 1,
    borderColor: Colors.BORDER_GREY,
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  headingText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.MATT_BLACK,
  },
  subHeadingText: {
    fontSize: 14,
    fontWeight: '300',
    color: Colors.GREY,
  },
  dataContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.GREY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  textContainer: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.BLACK,
  },
});
