import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../constants/color';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {SCREEN_HEIGHT} from '../constants/dimensions';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

const SearchBox = ({ navigation }) => {
  const mode = useSelector((state) => state.theme.mode);
    const handleSearchButton = () => {
        navigation.navigate('Search')
    }
  return (
    <View style={mode == 'Light' ? styles.boxContainerDark : [styles.boxContainer, styles.elevation]}>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={handleSearchButton}>
        <Feather name="search" size={20} color={mode == 'Light' ? Colors.LIGHT_TEXT : Colors.GREY} />
        <Text style={mode == 'Light' ? styles.searchTextDark : styles.searchText}>Search & add</Text>
        <Text style={{fontSize: 16, color:mode == 'Light' ? Colors.LIGHT_TEXT :  Colors.GREY}}></Text>
        <TouchableOpacity>
          <SimpleLineIcons name="equalizer" size={20} color={Colors.GREY} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: Colors.WHITE,
    width: '90%',
    height: SCREEN_HEIGHT * 0.06,
    position: 'absolute',
    left: '5%',
    top: 5,
    borderRadius: 5,
  },
  boxContainerDark: {
    backgroundColor: Colors.DARK_LIGHT,
    width: '90%',
    height: SCREEN_HEIGHT * 0.06,
    position: 'absolute',
    left: '5%',
    top: 5,
    borderRadius: 5,
  },
  elevation: {
    elevation: 10,
    shadowColor: '#52006A',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },
  cardHeadingText: {
    color: Colors.MATT_BLACK,
    fontWeight: '400',
  },
  cardHeadingTextDark: {
    color: Colors.LIGHT_TEXT,
    fontWeight: '400',
  },
  searchText: {
    paddingRight: '35%',
    fontSize: 16,
    color: Colors.GREY,
  },
  searchTextDark: {
    paddingRight: '35%',
    fontSize: 16,
    color: Colors.LIGHT_TEXT,
  },
});
