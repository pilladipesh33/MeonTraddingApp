import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Colors} from '../../constants/color';

const OrderContainer = ({navigation, data}) => {
  // console.log('data?.result', data?.result)
  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 40}}
      data={data?.result}
      keyExtractor={item => item?.AppOrderID?.toString()}
      renderItem={({item}) => (
        <TouchableOpacity
          style={{paddingTop: 10}}
          onLongPress={() =>
            navigation.navigate('CancelScreen', {
              key: data,
              id: item?.AppOrderID,
            })
          }>
          <View style={styles.container}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={[styles.containerReverse, {alignItems: 'flex-start'}]}>
                <View
                  style={{
                    height: 25,
                    width: 50,
                    backgroundColor:
                      item.OrderSide == 'BUY' ? Colors.LIGHT_BLUE : Colors.PINK,
                  }}>
                  <Text
                    style={{
                      color: item.OrderSide == 'BUY' ? Colors.BLUE : Colors.RED,
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
                  ₹ 798.25
                </Text>
                <Text style={[styles.subContentText, {color: Colors.BLACK}]}>
                  Qty: {item.OrderQuantity}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default OrderContainer;
