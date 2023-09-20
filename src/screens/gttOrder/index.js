import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import Header from '../../components/Header';
import {CheckBox, Icon} from '@rneui/themed';
import {Colors} from '../../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-paper';
import {Button} from '@rneui/base';
import { placeGTTOrderItem } from '../../redux/store/placeGTTOrderSlice';

const GttOrder = ({navigation, route}) => {
  const [payload, setPayload] = useState('');
  const [isBuy, setIsBuy] = useState(false);
  const [isSell, setIsSell] = useState(false);
  const [isOrderQuantity, setIsOrderQuantity] = useState('');
  const items = route?.params?.item;
  const [isPrice, setIsPrice] = useState(route?.params?.price);
  const mode = useSelector(state => state.theme.mode);

  const handleBuyContainer = () => {
    setIsBuy(!isBuy);
    setIsSell(false ? false : false);
  };
  const handleSellContainer = () => {
    setIsSell(!isSell);
    setIsBuy(false ? false : false);
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (isBuy == true) {
      setPayload({
        clientID: await AsyncStorage.getItem('USER_ID'),
        exchangeSegment: 'NSECM',
        exchangeInstrumentID: items?.ExchangeInstrumentID,
        orderSide: 'BUY',
        orderQuantity: isOrderQuantity,
        limitPrice: isPrice,
        stopPrice: 0,
        userID: await AsyncStorage.getItem('USER_ID'),
      });
    } else if (isSell == true) {
      setPayload({
        clientID: await AsyncStorage.getItem('USER_ID'),
        exchangeSegment: 'NSECM',
        exchangeInstrumentID: items.ExchangeInstrumentID,
        orderSide: 'BUY',
        orderQuantity: isOrderQuantity,
        limitPrice: isPrice,
        stopPrice: 0,
        userID: await AsyncStorage.getItem('USER_ID'),
      });
    }
  };

  useEffect(() => {
    if(payload){
        dispatch(placeGTTOrderItem(payload));
    }
  },[payload]);

  const {gttOrderData} = useSelector((state) => state.placeGttOrder)

  useEffect(() => {
    if(gttOrderData){
        alert(gttOrderData?.description);
        navigation.goBack();
    }
  },[gttOrderData])
  return (
    <View
      style={
        mode == 'Light' ? styles.androidSafeAreaDark : styles.androidSafeArea
      }>
      <Header onPress={() => navigation.goBack()} title={'GTT Order'} />

      <View style={{paddingTop: 10, paddingRight: 10, paddingLeft: 10}}>
        <View style={styles.rowContainer}>
          <Text
            style={
              mode == 'Light' ? styles.headingTextDark : styles.headingText
            }>
            Type
          </Text>
          <View style={styles.rowContainer2}>
            <CheckBox
              right
              title={'BUY'}
              textStyle={{
                fontSize: 20,
                fontWeight: '500',
                color: Colors.BLUE,
              }}
              checkedIcon={
                <Icon
                  name="radio-button-checked"
                  type="material"
                  color={Colors.BLUE}
                  size={25}
                  iconStyle={{marginRight: 10}}
                />
              }
              uncheckedIcon={
                <Icon
                  name="radio-button-unchecked"
                  type="material"
                  color="grey"
                  size={25}
                  iconStyle={{marginRight: 10}}
                />
              }
              checked={isBuy}
              onPress={() => handleBuyContainer()}
            />
            <CheckBox
              right
              title={'SELL'}
              textStyle={{
                fontSize: 20,
                fontWeight: '500',
                color: Colors.RED,
              }}
              checkedIcon={
                <Icon
                  name="radio-button-checked"
                  type="material"
                  color={Colors.RED}
                  size={25}
                  iconStyle={{marginRight: 10}}
                />
              }
              uncheckedIcon={
                <Icon
                  name="radio-button-unchecked"
                  type="material"
                  color="grey"
                  size={25}
                  iconStyle={{marginRight: 10}}
                />
              }
              checked={isSell}
              onPress={() => handleSellContainer()}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 15}}>
          <TextInput
            label="Price"
            value={isPrice}
            onChangeText={text => setIsPrice(text)}
            mode="outlined"
            placeholder={`${isPrice}`}
          />
        </View>
        <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
          <TextInput
            label="Order Quantity"
            value={isOrderQuantity}
            onChangeText={text => setIsOrderQuantity(text)}
            mode="outlined"
          />
        </View>

        <Button
          title="Submit"
          buttonStyle={{
            backgroundColor: 'black',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: '25%',
            marginVertical: 10,
          }}
          titleStyle={{fontWeight: 'bold'}}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default GttOrder;
