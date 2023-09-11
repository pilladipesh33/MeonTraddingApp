import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../constants/color';
import DropDownArrow from '../../components/DropDownArrow';
import { styles } from './styles';
import WatchlistDataSection from './WatchlistDataSection';

const Watchlist = ({navigation}) => {
  const [isBannerVisible, setBannerVisible] = useState(false);
  const toggelBanner = () => {
    setBannerVisible(!isBannerVisible);
  };
  return (
    <View style={styles.androidSafeArea}>
      {isBannerVisible && (
        <DropDownArrow/>
      )}
      <View style={styles.container}>
        <Text style={styles.headingText}>Watchlist</Text>
        <TouchableOpacity onPress={toggelBanner}>
          {isBannerVisible ? (
            <Feather name={'chevron-up'} size={40} color={Colors.MATT_BLACK} />
          ) : (
            <Feather
              name={'chevron-down'}
              size={40}
              color={Colors.MATT_BLACK}
            />
          )}
        </TouchableOpacity>
      </View>
      {/* <WishlistTopBarNavigation navigation={navigation}/> */}
      {/* <StockDataSections navigation={navigation} /> */}
      <WatchlistDataSection navigation={navigation}/>
    </View>
  );
};

export default Watchlist;

