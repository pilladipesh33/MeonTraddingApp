import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getExchangeMessageItem} from '../../redux/store/getExchangeMessageSlice';
import {ExchangeMessageData} from '../../constants/data';
import ExchangeMessgesContainer from './ExchangeMessgesContainer';
import {FlatList} from 'react-native-gesture-handler';
import {Text, Card, Button, Icon} from '@rneui/themed';
import Header from '../../components/Header';
// import ExchangeMessgesContainer from './ExchangeMessgesContainer';
// import CustomFlatList from '../../components/CustomFlatlist';

const ExchangeMessage = ({navigation}) => {
  const mode = useSelector((state) => state.theme.mode)
  return (
    <View style={mode == 'Light' ? styles.androidSafeAreaDark : styles.androidSafeArea}>
      <Header menu={true} title={'Messages'} onPress={() => navigation.openDrawer()} />
      <FlatList
        data={ExchangeMessageData}
        keyExtractor={item => item.SequenceNumber}
        renderItem={({item}) => {
          return (
            <Card containerStyle={mode == 'Light' ? styles.cardContainerDark : styles.cardContainer}>
              <Text style={mode == 'Light' ? styles.fontTextDark : styles.fontText}>{item?.BroadcastMessage}</Text>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default ExchangeMessage;
