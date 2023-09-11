import {StyleSheet, Platform, StatusBar} from 'react-native';
import { Colors } from '../../constants/color';

export const styles = StyleSheet.create({
  androidSafeView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.WHITE,
    paddingLeft: 10,
    paddingRight: 10
  },
  headerText: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.OYNX
  },
});
