import {
  View,
  Text,
  FlatList,
  ScrollView,
  Platform,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {styles} from './styles';
import {Button, Card} from 'react-native-paper';
import {Colors} from '../../constants/color';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';

const Market = ({navigation}) => {
  const [newsData, setNewsData] = useState([]);
  // useEffect(() => {
  //   const fetchNews = () => {
  //     const response = axios
  //       .get(
  //         'https://eodhistoricaldata.com/api/news?api_token=demo&s=AAPL.US&offset=0&limit=10',
  //       )
  //       .then(response => {
  //         setNewsData(response);
  //       });
  //   };
  //   return fetchNews();
  // }, []);

  return (
    <View
      style={[
        styles.androidSafeView,
        {
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          backgroundColor: Colors.WHITE,
        },
      ]}>
      <Header menu={true} title={'News'} onPress={() => navigation.openDrawer()} />
      <ScrollView>
        <View style={styles.cardContainer}>
          <Text style={styles.cardHeadingText}>
            iPhone 15 launch: Release date, price and new features
          </Text>
          <Text style={styles.cardContentText}>
            Apple will host its iPhone 15 launch event called “Wanderlust” in
            California - APPLE INC HANDOUT/EPA-EFE.Apple is just days away
            from revealing the latest additions to its iPhone line-up as the
            technology giant upgrades its flagship smartphone. The US company
            will on Tuesday unveil its new iPhone 15 and iPhone 15 Pro, updating
            last year’s iPhone 14 handsets. It is also expected to upgrade its
            Apple Watch line up. The iPhone-maker will host its launch event,
            called “Wanderlust”, at the Steve Jobs Theatre at Apple Park in
            California.
          </Text>
          <Text style={styles.infoText}>Continue reading...</Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.cardHeadingText}>
            iPhone 15 launch: Release date, price and new features
          </Text>
          <Text style={styles.cardContentText}>
            Apple will host its iPhone 15 launch event called “Wanderlust” in
            California - APPLE INC HANDOUT/EPA-EFE.Apple is just days away
            from revealing the latest additions to its iPhone line-up as the
            technology giant upgrades its flagship smartphone. The US company
            will on Tuesday unveil its new iPhone 15 and iPhone 15 Pro, updating
            last year’s iPhone 14 handsets. It is also expected to upgrade its
            Apple Watch line up. The iPhone-maker will host its launch event,
            called “Wanderlust”, at the Steve Jobs Theatre at Apple Park in
            California.
          </Text>
          <Text style={styles.infoText}>Continue reading...</Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.cardHeadingText}>
            iPhone 15 launch: Release date, price and new features
          </Text>
          <Text style={styles.cardContentText}>
            Apple will host its iPhone 15 launch event called “Wanderlust” in
            California - APPLE INC HANDOUT/EPA-EFE.Apple is just days away
            from revealing the latest additions to its iPhone line-up as the
            technology giant upgrades its flagship smartphone. The US company
            will on Tuesday unveil its new iPhone 15 and iPhone 15 Pro, updating
            last year’s iPhone 14 handsets. It is also expected to upgrade its
            Apple Watch line up. The iPhone-maker will host its launch event,
            called “Wanderlust”, at the Steve Jobs Theatre at Apple Park in
            California.
          </Text>
          <Text style={styles.infoText}>Continue reading...</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Market;
