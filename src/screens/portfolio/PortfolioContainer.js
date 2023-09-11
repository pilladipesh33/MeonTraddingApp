import {View, Text, FlatList} from 'react-native';
import React from 'react';
import { useNavigationState } from '@react-navigation/native';
import {holdingData} from '../../constants/holdingData'
import { styles } from './styles';
import { Colors } from '../../constants/color';

const PortfolioContainer = () => {
  const screenName = useNavigationState(
    state => state.routes[state.index].name,
  );
  return (
    <View style={{top: 70}}>
      <FlatList
        data={holdingData}
        renderItem={({item}) => (
          <View style={{paddingTop: 10}}>
            {screenName == 'Positions' ? (
              <View />
            ) : (
              <View style={styles.flatlistContainer}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={[styles.containerReverse, {alignItems: 'flex-start'}]}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: Colors.GREY}}>Oty. </Text>
                    <Text
                      style={[styles.subContentText, {color: Colors.BLACK}]}>
                      {item.qty}{' '}
                    </Text>
                    <Text style={{color: Colors.GREY}}>Avg. </Text>
                    <Text
                      style={[styles.subContentText, {color: Colors.BLACK}]}>
                      {item.avg}
                    </Text>
                  </View>
                  <Text style={styles.headingText}>{item.title}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.subContentText}>Invested</Text>
                    <Text style={styles.subContentText2}> {item.invest}</Text>
                  </View>
                </View>
                <View style={styles.containerReverse}>
                  <Text
                    style={[
                      styles.headingText,
                      {
                        color:
                          item.color == 'green' ? Colors.GREEN : Colors.RED,
                      },
                    ]}>
                    {item.loss}
                  </Text>
                  <Text
                    style={[
                      styles.headingText,
                      {
                        color:
                          item.color == 'green' ? Colors.GREEN : Colors.RED,
                        fontWeight: '500',
                      },
                    ]}>
                    {item.value}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: Colors.GREY}}>LTP </Text>
                    <Text
                      style={[styles.subContentText, {color: Colors.BLACK}]}>
                      {item.ltp}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default PortfolioContainer;