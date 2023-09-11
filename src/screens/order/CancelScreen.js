import {
    FlatList,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState, useCallback} from 'react';
  import Feather from 'react-native-vector-icons/Feather';
  import { useDispatch, useSelector } from 'react-redux';
import { cancelOrderItem } from '../../redux/store/cancelOrderSlice';
import { Colors } from '../../constants/color';
import { SCREEN_HEIGHT, WINDOW_HEIGHT } from '../../constants/dimensions';
import Button from '../../components/Button';
 
  const CancelScreen = ({navigation, route}) => {
    const [showButton, setShowButton] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState('');
    const [renderData, setRenderData] = useState(data);
    const AppOrderID = route?.params?.id;
    const data = route?.params?.key;
    // console.log('data', AppOrderID);
    const dispatch = useDispatch();
    const {cancelOrder} = useSelector(state => state.cancelOrder)
  
    const handleCancelOrder = () => {
      dispatch(cancelOrderItem(AppOrderID));
      navigation.navigate('BottomTab')
    }
  
    return (
      <View style={styles.androidSafeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('BottomTab')}>
            <Feather name="arrow-left" size={24} color={Colors.BLACK} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Cancel Orders</Text>
          <Text style={styles.headerContentText}>Select all</Text>
        </View>
        <View>
          <FlatList
            contentContainerStyle={{paddingBottom: 40}}
            data={data}
            keyExtractor={item => item?.AppOrderID?.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{paddingTop: 10, paddingLeft: 20, paddingRight: 10}}
                onPress={() => {}}>
                {/* SELECTED ITEM INDICATOR */}
                {AppOrderID == item?.AppOrderID ||
                selectedOrder == item?.AppOrderID ? (
                  <View style={styles.selectedContainer}></View>
                ) : (
                  <View />
                )}
                {/* {screenName == 'Executed' || screenName == 'Cancel' ? ( */}
  
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={[styles.containerReverse, {alignItems: 'flex-start'}]}>
                    <View
                      style={{
                        height: 25,
                        width: 50,
                        backgroundColor:
                          item.OrderSide == 'BUY'
                            ? Colors.LIGHT_BLUE
                            : Colors.PINK,
                      }}>
                      <Text
                        style={{
                          color:
                            item.OrderSide == 'BUY' ? Colors.BLUE : Colors.RED,
                          textAlign: 'center',
                        }}>
                        {item.OrderSide}
                      </Text>
                    </View>
                    <Text style={styles.headingText}>{item.TradingSymbol}</Text>
                    <Text style={styles.subContentText}>
                      {item.ExchangeSegment}
                    </Text>
                  </View>
                  <View style={styles.containerReverse}>
                    <View
                      style={{
                        height: 26,
                        width: 'auto',
                        backgroundColor:
                          item.OrderStatus == 'Rejected'
                            ? Colors.PINK
                            : item.OrderStatus == 'COMPLETE'
                            ? Colors.LIGHT_GREEN
                            : Colors.BORDER_GREY,
                      }}>
                      <Text
                        style={{
                          color:
                            item.OrderStatus == 'Rejected'
                              ? Colors.RED
                              : item.OrderStatus == 'COMPLETE'
                              ? Colors.GREEN
                              : Colors.MATT_BLACK,
                          textAlign: 'center',
                          fontSize: 13,
                        }}>
                        {item.OrderStatus}
                      </Text>
                    </View>
                    <Text style={[styles.headingText, {color: Colors.BLACK}]}>
                      ₹798.25
                    </Text>
                    <Text style={[styles.subContentText, {color: Colors.BLACK}]}>
                      Qty: {item.OrderQuantity}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <Button
          title={'Cancel Order'}
          onPress={handleCancelOrder}
          buttonStyle={styles.buttonViewContainer}
          buttonColor={Colors.BLUEB}
        />
      </View>
    );
  };
  
  export default CancelScreen;
  
  const styles = StyleSheet.create({
    androidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: Colors.WHITE,
    },
    headerContainer: {
      height: SCREEN_HEIGHT - WINDOW_HEIGHT,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: 10,
      paddingLeft: 10,
      borderBottomWidth: 1,
      borderColor: Colors.BORDER_GREY,
    },
    headerContentText: {
      color: Colors.BLUE,
      fontWeight: '500',
      fontSize: 16,
    },
    headerText: {
      color: Colors.BLACK,
      fontWeight: '700',
      fontSize: 16,
    },
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
    selectedContainer: {
      position: 'absolute',
      height: '100%',
      backgroundColor: Colors.BLUEB,
      top: 5,
      width: '3%',
    },
    buttonViewContainer: {
      position: 'absolute',
      bottom: 10,
      width: '100%',
    },
  });
  