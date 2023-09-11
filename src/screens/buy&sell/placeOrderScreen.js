import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import {Colors} from '../../constants/color';
import Button from '../../components/Button';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {handlePlaceOrder, placeOrderItem} from '../../redux/store/placeOrderSlice';

const PlaceOrderScreen = ({navigation, route}) => {
  const socketData = route?.params?.items;
  const name = route?.params?.name;
  const action = route?.params?.action;
  const item = route?.params?.items;
  console.log('action', item?.ExchangeInstrumentID);

  const [productType, setProductType] = useState('');
  const [orderType, setOrderType] = useState('');
  const [validity, setValidity] = useState();
  const [quantity, setQuantity] = useState();
  const [disclosureQuantity, setDisclosureQuantity] = useState();
  const [orderSide, setOrderSide] = useState(action);
  const [exchangeInstrumentID, setExchangeInstrumentId] = useState(item?.ExchangeInstrumentID);
  const dispatch = useDispatch();
  const {orderData} = useSelector(state => state.placeOrder)
//   const onPressPlaceOrder = () => {
//     dispatch(placeOrderItem(payload));
//     // navigation.navigate('BottomTab');
//     console.log('orderData', orderData)
//   };

  const ProductType = ['NRML', 'BO', 'CO', 'CNC', 'MIS'];
  const OrderType = ['LIMIT', 'MARKET', 'SL-L', 'SL-M'];
  const Validity = ['DAY', 'IOC', 'EOS'];

  console.log('test',productType, orderType, validity, quantity, disclosureQuantity, exchangeInstrumentID);
console.log('payload', exchangeInstrumentID)

    const onPressBuy = () => {
       handlePlaceOrder(productType,orderType,validity,quantity,disclosureQuantity, navigation, orderSide, exchangeInstrumentID)
    }

    console.log('item', exchangeInstrumentID)
  return (
    <View style={styles.androidSafeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
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
            {name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{paddingLeft: 15, color: Colors.BLACK}}>
            ₹ {socketData ? (`${socketData?.Touchline?.BidInfo?.Price}`) : (`${item?.PriceBand?.High}`)}
            
            </Text>
            <Text style={{paddingLeft: 15, color: Colors.GREEN}}>
              {item?.Touchline?.High}
            </Text>
            <Text style={{paddingLeft: 15, color: Colors.BLACK}}>
              {item?.key?.increment}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.rowContainer2}>
        <SelectDropdown //PRODUCT TYPE
          data={ProductType}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
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
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
        <SelectDropdown //ORDER TYPE
          data={OrderType}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
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
            console.log(selectedItem, index);
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
          onPress={() => onPressBuy()}
          buttonStyle={{}}
          buttonColor={action == 'SELL' ? Colors.RED : Colors.BLUE}
        />
      </View>
    </View>
  );
};

export default PlaceOrderScreen;
