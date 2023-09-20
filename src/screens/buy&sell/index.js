import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../../constants/color';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  WINDOW_HEIGHT,
} from '../../constants/dimensions';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {subscriptionInstrumentsItem} from '../../redux/store/subscriptionsInstrumentsSlice';
import {unsubscriptionInstrumentsItem} from '../../redux/store/unsubscriptionsInstrumentSlice';
import {styles} from './styles';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BuySellScreen = ({navigation, route}) => {
  const items = route?.params?.key;
  const [stockDetails, setStockDetails] = useState('');
  const [isPrice, setIsPrice] = useState('');
  const [isLow, setIsLow] = useState('');
  const [isHigh, setIsHigh] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeInstrumentID, setExchangeInstrumentId] = useState(
    items?.ExchangeInstrumentID,
  );
  const [exchangeSegment, setExchangeSegment] = useState(
    items?.ExchangeSegment,
  );
  const [instruments, setInstruments] = useState([
    {exchangeInstrumentID, exchangeSegment},
  ]);

  console.log('instruments', instruments);

  // useEffect(() => {
  //   // setTimeout(() => {
  //   //   setIsLoading(false);
  //   // }, 2000);
  //   if(socketData) {
  //     setIsLoading(true);
  //   }
  // }, [socketData]);

  //Socket Connnec
  const dispatch = useDispatch();
  const {socketData, socketDataStatus, joined} = useSelector(
    state => state.socketConnection,
  );

  useEffect(() => {
    if (items && exchangeInstrumentID && exchangeSegment) {
      setInstruments([{exchangeInstrumentID, exchangeSegment}]);
    }
  }, [exchangeInstrumentID, exchangeSegment, items]);

  console.log('exchangeInstrumentsID', exchangeInstrumentID);

  useEffect(() => {
    if (joined && instruments) {
      dispatch(
        subscriptionInstrumentsItem({
          instruments,
          xtsMessageCode: 1502,
        }),
      );
      console.log('sub');
    }
  }, [joined, instruments]);

  useEffect(() => {
    if (exchangeInstrumentID == socketData?.ExchangeInstrumentID) {
      // setIsPrice(socketData?.Touchline?.BidInfo?.Price);
      // setIsLow(socketData?.Touchline?.Low);
      // setIsHigh(socketData?.Touchline?.High);
      setStockDetails({
        Price: socketData?.Touchline?.BidInfo?.Price,
        Low: socketData?.Touchline?.Low,
        High: socketData?.Touchline?.High,
      });
    }
  }, [socketData]);

  // console.log('socketPrice', socketData);
  // console.log('isPrice', isPrice, isLow, isLow);
  const mode = useSelector(state => state.theme.mode);

  const handleBackButton = () => {
    dispatch(
      unsubscriptionInstrumentsItem({
        instruments,
        xtsMessageCode: 1502,
      }),
    );
    console.log('unsub');
    navigation.goBack();
  };

  return (
    <View
      style={
        mode == 'Light' ? styles.androidSafeAreaDark : styles.androidSafeArea
      }>
      {/* {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            animating={true}
            color={mode == 'Light' ? Colors.PURPLE : Colors.BROWN}
            size={'large'}
          />
        </View>
      ) : (
        <> */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => handleBackButton()}>
          <Feather
            name="chevron-left"
            size={25}
            color={mode == 'Light' ? Colors.WHITE : Colors.BLACK}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
          <Text
            style={{
              paddingLeft: 15,
              fontWeight: '600',
              fontSize: 17,
              color: mode == 'Light' ? Colors.WHITE : Colors.BLACK,
            }}>
            {items?.DisplayName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                paddingLeft: 15,
                color: mode == 'Light' ? Colors.WHITE : Colors.BLACK,
              }}>
              {items?.CompanyName}
            </Text>
            <Text style={{paddingLeft: 15, color: Colors.GREEN}}>
              {stockDetails
                ? `${stockDetails.High}`
                : `${items.PriceBand.High}`}
            </Text>
            <Text style={{paddingLeft: 15, color: Colors.RED}}>
              {stockDetails ? `${stockDetails.Low}` : `${items.PriceBand.Low}`}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={mode == 'Light' ? styles.priceTextDark : styles.priceText}>
          ₹{' '}
          {stockDetails
            ? `${stockDetails.Price}`
            : `${items.ExchangeInstrumentID}`}
          {/* ? `${socketData?.Touchline?.BidInfo?.Price}`
               ? `${isPrice}`
               : `${items?.PriceBand?.Low}`} */}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Button
          buttonColor={Colors.BLUE}
          title={'BUY'}
          titleColor={Colors.WHITE}
          buttonStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
          onPress={() =>
            navigation.navigate('PlaceOrder', {
              socketData: socketData,
              action: 'BUY',
              name: items?.DisplayName,
              items: items,
              details: stockDetails,
            })
          }
        />
        <Button
          buttonColor={Colors.RED}
          title={'SELL'}
          titleColor={Colors.WHITE}
          buttonStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
          onPress={() =>
            navigation.navigate('PlaceOrder', {
              socketData: socketData,
              action: 'SELL',
              name: items?.DisplayName,
              items: items,
              details: stockDetails,
            })
          }
        />
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          paddingBottom: 10,
        }}
        onPress={() => navigation.navigate('Charts')}>
        <Feather name="bar-chart-2" size={20} color={Colors.BLUE} />
        <Text style={{paddingLeft: 10, paddingRight: 10, color: Colors.BLUE}}>
          View chart
        </Text>
        <Feather name="arrow-right" size={20} color={Colors.BLUE} />
      </TouchableOpacity>
      <View style={styles.rowContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Feather name="bell" color={Colors.BLACK} size={24} />
          <Text style={{paddingLeft: 10}}>Create Alert</Text>
        </View>
        <TouchableOpacity
        onPress={() => navigation.navigate('GTT', {item: items, price: stockDetails?.Price})}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Ionicons name="arrow-redo-outline" color={Colors.BLUE} size={24} />
          <Text style={{paddingLeft: 10}}>Create GTT</Text>
        </TouchableOpacity>
      </View>
      {items?.Bhavcopy ? (
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>Open</Text>
            <Text
              style={
                mode == 'Light' ? styles.contentTextDark : styles.contentText
              }>
              {items?.Bhavcopy?.Open}
            </Text>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>High</Text>
            <Text
              style={
                mode == 'Light' ? styles.contentTextDark : styles.contentText
              }>
              {items?.Bhavcopy?.High}
            </Text>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>Low</Text>
            <Text
              style={
                mode == 'Light' ? styles.contentTextDark : styles.contentText
              }>
              {items?.Bhavcopy?.Low}
            </Text>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>Prev. close</Text>
            <Text
              style={
                mode == 'Light' ? styles.contentTextDark : styles.contentText
              }>
              {items?.Bhavcopy?.Close}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>Open</Text>
            <Text
              style={
                mode == 'Light' ? styles.contentTextDark : styles.contentText
              }>
              {socketData?.Touchline?.Open}
            </Text>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>High</Text>
            <Text
              style={
                mode == 'Light' ? styles.contentTextDark : styles.contentText
              }>
              {socketData?.Touchline?.High}
            </Text>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>Low</Text>
            <Text
              style={
                mode == 'Light' ? styles.contentTextDark : styles.contentText
              }>
              {socketData?.Touchline?.Low}
            </Text>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>Prev. close</Text>
            <Text
              style={
                mode == 'Light' ? styles.contentTextDark : styles.contentText
              }>
              {socketData?.Touchline?.LastTradedPrice}
            </Text>
          </View>
        </View>
      )}
      <View></View>
      {/* </>
      )} */}
    </View>
  );
};

export default BuySellScreen;
