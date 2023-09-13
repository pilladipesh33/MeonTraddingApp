import {View, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';

const ExchangeMessgesContainer = (data, renderItem) => {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item}
        renderItem={({item}) => {
          <View style={{flex: 1,backgroundColor: 'red'}}>
            <Text>{item.BroadcastMessage}</Text>
          </View>;
        }}
        maxToRenderPerBatch={10}
      />
    </View>
  );
};

export default ExchangeMessgesContainer;
