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

const BuySellScreen = ({navigation, route}) => {
  const items = route?.params?.key;
  const [visible, setVisible] = useState(false);
  const [exchangeInstrumentID, setExchangeInstrumentId] = useState(
    items?.ExchangeInstrumentID,
  );
  const [exchangeSegment, setExchangeSegment] = useState(
    items?.ExchangeSegment,
  );
  const [instruments, setInstruments] = useState([
    {exchangeInstrumentID, exchangeSegment},
  ]);

  //Socket Connnec
  const dispatch = useDispatch();
  const {socketData, socketDataStatus, joined} = useSelector(
    state => state.socketConnection,
  );

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
  }, [joined, instruments]);

  console.log('socketData1', socketData?.ExchangeSegment)

  return (
    <View style={styles.androidSafeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Drawer')}>
          <Feather name="chevron-left" size={25} color={Colors.BLACK} />
        </TouchableOpacity>
        <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
          <Text
            style={{
              paddingLeft: 15,
              fontWeight: '600',
              fontSize: 17,
              color: Colors.BLACK,
            }}>
            {items?.DisplayName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{paddingLeft: 15, color: Colors.BLACK}}>
              {items?.CompanyName}
            </Text>
            <Text style={{paddingLeft: 15, color: Colors.GREEN}}>
              {socketData
                ? `${socketData?.Touchline?.High}`
                : `${items?.PriceBand?.High}`}
            </Text>
            <Text style={{paddingLeft: 15, color: Colors.RED}}>
              {socketData
                ? `${socketData?.Touchline?.Low}`
                : `${items?.PriceBand?.Low}`}
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            ₹{' '}
            {socketData
              ? `${socketData?.Touchline?.BidInfo?.Price}`
              : `${items?.PriceBand?.Low}`}
          </Text>
        </View>
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
            navigation.navigate('PlaceOrder', {socketData: socketData, action: 'BUY', name: items?.DisplayName, items: items})
          }
        />
        <Button
          buttonColor={Colors.RED}
          title={'SELL'}
          titleColor={Colors.WHITE}
          buttonStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
          onPress={() =>
            navigation.navigate('PlaceOrder', {key: socketData, action: 'SELL'})
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
      {items?.Bhavcopy ? (
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>Open</Text>
            <Text style={styles.contentText}>{items?.Bhavcopy?.Open}</Text>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>High</Text>
            <Text style={styles.contentText}>{items?.Bhavcopy?.High}</Text>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>Low</Text>
            <Text style={styles.contentText}>{items?.Bhavcopy?.Low}</Text>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>Prev. close</Text>
            <Text style={styles.contentText}>{items?.Bhavcopy?.Close}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.rowContainer}>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>Open</Text>
            <Text style={styles.contentText}>{socketData?.Touchline?.Open}</Text>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>High</Text>
            <Text style={styles.contentText}>{socketData?.Touchline?.High}</Text>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>Low</Text>
            <Text style={styles.contentText}>{socketData?.Touchline?.Low}</Text>
          </View>
          <View style={styles.columnContainer}>
            <Text style={styles.headingText}>Prev. close</Text>
            <Text style={styles.contentText}>{socketData?.Touchline?.LastTradedPrice}</Text>
          </View>
        </View>
      )}
      <View>
      </View>
    </View>
  );
};

export default BuySellScreen;
