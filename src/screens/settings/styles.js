import {StyleSheet, Platform, StatusBar} from 'react-native';
import {Colors} from '../../constants/color';

export const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.WHITE,
  },
  androidSafeAreaDark: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.DARK,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  themeText: {
    color: Colors.MATT_BLACK,
    fontSize: 16,
  },
  themeTextDark: {
    color: Colors.DARK_TEXT,
    fontSize: 16,
  },
  settingContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.BORDER_GREY
  }
});
