import {StyleSheet, Platform, StatusBar} from 'react-native';
import { Colors } from '../../constants/color';

export const styles = StyleSheet.create({
  androidSafeView: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.TRANSPARENT,
    paddingLeft: 10,
    paddingRight: 10
  },
  headerText: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.OYNX
  },
  cardContainer: {
    paddingTop: '5%',
    borderBottomWidth: 1,
    borderColor: Colors.BORDER_GREY
  },
  cardHeadingText: {
    fontSize: 20,
    color: Colors.MATT_BLACK,
    fontWeight: '400'
  },
  cardContentText: {
    fontSize: 15,
    color: Colors.GREY
  },
  infoText: {
    fontSize: 14,
    color: Colors.BLACK
  }
});
