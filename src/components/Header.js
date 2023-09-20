import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {SCREEN_HEIGHT, WINDOW_HEIGHT} from '../constants/dimensions';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../constants/color';
import {useSelector} from 'react-redux';

const Header = ({title, onPress, screenName, navigation, menu, subContent}) => {
  const mode = useSelector(state => state.theme.mode);
  return (
    <View
      style={
        mode == 'Light' ? styles.headerContainerDark : styles.headerContainer
      }>
      <TouchableOpacity onPress={onPress}>
        {menu == true ? (
          <Feather
            name="menu"
            color={mode == 'Light' ? Colors.WHITE : Colors.BLACK}
            size={24}
          />
        ) : (
          <Feather
            name="arrow-left"
            color={mode == 'Light' ? Colors.WHITE : Colors.BLACK}
            size={24}
          />
        )}
      </TouchableOpacity>
      <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
        <Text
          style={mode == 'Light' ? styles.headerTextDark : styles.headerText}>
          {title}
        </Text>
        {subContent ? (
          <Text style={mode == 'Light' ? styles.subTextDark : styles.subText}>
            ₹ {subContent}
          </Text>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: SCREEN_HEIGHT - WINDOW_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerContainerDark: {
    height: SCREEN_HEIGHT - WINDOW_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.DARK,
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.MATT_BLACK,
    paddingLeft: '5%',
  },
  headerTextDark: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.DARK_TEXT,
    paddingLeft: '5%',
  },
  subText: {
    paddingLeft: '5%',
    color: Colors.MATT_BLACK
  },
  subTextDark: {
    paddingLeft: '5%',
    color: Colors.DARK_TEXT
  }
});
