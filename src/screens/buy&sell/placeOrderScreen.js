import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {handlePlaceOrder, placeOrderItem} from '../../redux/store/placeOrderSlice';
import {PlaceOrderTopBarNavigation} from '../../navigations/TopBarNavigation';
import Header from '../../components/Header';
import SelectDropdown from 'react-native-select-dropdown';
import {TextInput} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../constants/color';
import Button from '../../components/Button';
import { CheckBox, Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlaceOrderScreen = ({navigation, route}) => {
  const socketData = route?.params?.items;
  const name = route?.params?.name;
  const action = route?.params?.action;
  const item = route?.params?.items;
  const stockDetails = route?.params?.details;
  const ProductType = ['CNC', 'MIS', 'NRML', 'BO', 'CO'];
  const OrderType = ['LIMIT', 'MARKET', 'SL-L', 'SL-M'];
  const Validity = ['DAY', 'IOC', 'EOS'];

  const [payload, setPayload] = useState('');
  const [isAMO, setIsAMO] = useState(false);
  const [productType, setProductType] = useState('');
  const [orderType, setOrderType] = useState('');
  const [validity, setValidity] = useState();
  const [quantity, setQuantity] = useState();
  const [disclosureQuantity, setDisclosureQuantity] = useState();
  const [orderSide, setOrderSide] = useState(action);
  const [exchangeInstrumentID, setExchangeInstrumentId] = useState(
    item?.ExchangeInstrumentID,
  );
  // console.log('exchangeInstrumentID', exchangeInstrumentID)
  const dispatch = useDispatch();
  const {orderData} = useSelector(state => state.placeOrder);
  const mode = useSelector(state => state.theme.mode);

  // const onPressBuy = () => {
  //   handlePlaceOrder(
  //     productType,
  //     orderType,
  //     validity,
  //     quantity,
  //     disclosureQuantity,
  //     navigation,
  //     orderSide,
  //     exchangeInstrumentID,
  //     isAMO
  //   );
  // };

  const handleConfirm = async () => {
    setPayload({
      clientID: await AsyncStorage.getItem("USER_ID"),
      // exchangeSegment: ExchangeSegment === 1 ? "NSECM" : "BSECM",
      exchangeSegment: 'NSECM',
      exchangeInstrumentID: exchangeInstrumentID,
      productType: productType,
      orderType: orderType,
      orderSide: orderSide,
      timeInForce: validity,
      isAMO: isAMO,
      disclosedQuantity: disclosureQuantity,
      orderQuantity: quantity,
      limitPrice: stockDetails?.Price,
      stopPrice: 0,
      userID: await AsyncStorage.getItem("USER_ID"),
    })
  }

  useEffect(() => {
    if(payload && payload.orderQuantity > 0) {
      dispatch(placeOrderItem(payload))
    }
  },[payload]);

  useEffect(() => {
    if(orderData?.type == 'success'){
      navigation.goBack();
    }
  },[orderData])

  console.log('payload', orderData)

  return (
    <View
      style={
        mode == 'Light' ? styles.androidSafeAreaDark : styles.androidSafeArea
      }>
      <Header
        title={name}
        onPress={() => navigation.goBack()}
        subContent={stockDetails?.Price}
      />
      <CheckBox
      right
      title={'AMO'}
      textStyle={{fontSize: 20, fontWeight: '500', color: Colors.MATT_BLACK}}
      checkedIcon={
        <Icon
          name="radio-button-checked"
          type="material"
          color="blue"
          size={25}
          iconStyle={{ marginRight: 10 }}
        />
      }
      uncheckedIcon={
        <Icon
          name="radio-button-unchecked"
          type="material"
          color="grey"
          size={25}
          iconStyle={{ marginRight: 10 }}
        />
      }
      checked={isAMO}
      onPress={() => setIsAMO(!isAMO)}
    />
      <View style={styles.rowContainer2}>
        <SelectDropdown //PRODUCT TYPE
          data={ProductType}
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            setProductType(selectedItem);
          }}
          defaultButtonText={'Product type'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={18}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown1DropdownStyle}
        />
        <SelectDropdown //ORDER TYPE
          data={OrderType}
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            setOrderType(selectedItem);
          }}
          defaultButtonText={'Order type'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={18}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>
      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 10,
        }}>
        <SelectDropdown //VALIDITY
          data={Validity}
          onSelect={(selectedItem, index) => {
            //console.log(selectedItem, index);
            setValidity(selectedItem);
          }}
          defaultButtonText={'Validity'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#444'}
                size={18}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />

        <View style={{width: '50%', paddingLeft: 10, paddingRight: 5}}>
          <TextInput
            label={'Quantity'}
            value={quantity}
            onChangeText={setQuantity}
            contentStyle={styles.textInputContainer}
            mode="outlined"
            outlineColor={Colors.BLACK}
          />
        </View>
      </View>
      <View
        style={[
          styles.rowContainer,
          {paddingLeft: 10, paddingTop: 20, alignItems: 'center'},
        ]}>
        <Text style={styles.contentText}>Disclosure Quantity</Text>
        <TextInput
          value={disclosureQuantity}
          mode="outlined"
          style={{paddingLeft: 5}}
          outlineColor={Colors.BLACK}
          activeOutlineColor={Colors.BLACK}
          onChangeText={setDisclosureQuantity}
        />
      </View>
      <View>
        <Button
          title={`${action}`}
          onPress={() => handleConfirm()}
          buttonStyle={{}}
          buttonColor={action == 'SELL' ? Colors.RED : Colors.BLUE}
        />
      </View>
    </View>
  );
};

export default PlaceOrderScreen;
