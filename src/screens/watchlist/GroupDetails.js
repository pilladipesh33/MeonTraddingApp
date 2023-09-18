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
import Header from '../../components/Header';

const GroupDetails = ({route, navigation}) => {
  const data = route?.params?.key;
  const groupName = data?.groupName;
  const [groupData, setGroupData] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [stockData, setStockData] = useState();
  const [isShowData, setIsShowData] = useState('');
  const mode = useSelector((state) => state.theme.mode);
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
      navigation.navigate('Drawer');
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

  // console.log('instruments', instruments)

  useEffect(() => {
    if (instruments !== undefined) {
      dispatch(getInstrumentsDetailsById({instruments, source: 'WEB'}));
      setStockData(instrumentsDetail);
    } else if (instruments == undefined) {
      updateInstrumentData([]);
    }
  }, [instruments]);

  //SOCKET CONNECTIONS
  const {socketData, socketDataStatus, joined} = useSelector(
    state => state.socketConnection,
  );

  // console.log('instruments', instruments)

  useEffect(() => {
    if (joined && instruments) {
      dispatch(
        subscriptionInstrumentsItem({
          instruments,
          xtsMessageCode: 1502,
        }),
      );
    }
  }, [joined]);

  const handleBackButton = () => {
    dispatch(
      unsubscriptionInstrumentsItem({
        instruments,
        xtsMessageCode: 1502,
      }),
    );
    console.log('unsub');
    navigation.goBack();
    setStockData('');
  }

  useEffect(() => {
    if(socketData){
      // console.log(socketData?.Touchline?.High);
      setIsShowData({
        High: socketData?.Touchline?.High,
        Low: socketData?.Touchline?.Low,
        ExchangeInstrumentID: socketData?.ExchangeInstrumentID,
      })
    }
  },[socketData])

  // console.log('socketData', socketData)
  return (
    <View style={mode == 'Light' ? styles.androidSafeAreaDark : styles.androidSafeArea}>
      <Header title={data?.groupName} menu={false} onPress={() => handleBackButton()} />
      {/* <View
        style={[
          styles.headerContainer,
          {
            justifyContent: 'space-between',
            borderBottomWidth: 0,
            paddingRight: 10,
            paddingLeft: 10,
          },
        ]}>
         <TouchableOpacity style={{}} onPress={handleDeleteButton}>
          <Feather name="trash-2" size={25} color={mode == 'Light' ? Colors.RED : Colors.BROWN} />
        </TouchableOpacity> 
      </View> */}
      <View style={{paddingTop: 10, flex: 1}}>
        <FlatList
          data={stockData?.result}
          keyExtractor={item => item?.exchangeInstrumentID}
          extraData={isShowData}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                style={styles.dataContainer}
                onPress={() => navigation.navigate('BuySell', {key: item})}>
                <View>
                  <View style={styles.columnContainer}>
                    <Text style={mode == 'Light' ? styles.textContainerDark : styles.textContainer}>
                      {item?.TradingSymbol}
                    </Text>
                    <Text style={mode == 'Light' ? styles.textContainer2Dark : styles.textContainer}>{item?.Name}</Text>
                  </View>
                  <View>
                    {isShowData?.ExchangeInstrumentID == item?.exchangeInstrumentID}
                    <Text>{isShowData?.High}</Text>
                  </View>
                   {/* <View style={styles.columnContainer}>
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
                          {item?.PriceBand?.High}
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
                  </View> */}
                </View> 
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
  androidSafeAreaDark: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.DARK,
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
  textContainerDark: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.WHITE,
  },
  textContainer2Dark: {
    fontSize: 15,
    fontWeight: '600',
    color: '#EDEBF5',
    opacity: 0.6
  },
});
