import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getExchangeMessageItem} from '../../redux/store/getExchangeMessageSlice';
import {ExchangeMessageData} from '../../constants/data';
import ExchangeMessgesContainer from './ExchangeMessgesContainer';
import {FlatList} from 'react-native-gesture-handler';
import {Text, Card, Button, Icon} from '@rneui/themed';
// import ExchangeMessgesContainer from './ExchangeMessgesContainer';
// import CustomFlatList from '../../components/CustomFlatlist';

const ExchangeMessage = () => {
  // const [messageData, setMessageData] = useState('');
  // const dispatch = useDispatch();
  // const {exchangeMessageData, exchangeMessageStatus} = useSelector(
  //   state => state.getExchangeMessage,
  // );

  // useEffect(() => {
  //   if (exchangeMessageStatus == 'idle') {
  //     dispatch(getExchangeMessageItem());
  //     if (exchangeMessageData.type == 'success') {
  //       setMessageData(exchangeMessageData);
  //     }
  //   }
  // }, [exchangeMessageStatus]);

  // console.log(messageData?.result);
  return (
    <View style={styles.container}>
      {/* <ExchangeMessgesContainer data={ExchangeMessageData}/> */}
      <FlatList
        data={ExchangeMessageData}
        keyExtractor={item => item.SequenceNumber}
        renderItem={({item}) => {
          return (
            <Card containerStyle={{marginTop: 15}}>
              <Text style={styles.fontText}>{item?.BroadcastMessage}</Text>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default ExchangeMessage;
