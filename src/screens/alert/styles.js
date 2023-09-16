import {StyleSheet, Platform, StatusBar} from 'react-native';
import {Colors} from '../../constants/color';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/dimensions';

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
  dropDownContainer: {
    paddingTop: '15%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  dropdown2BtnStyle: {
    width: '100%',
    backgroundColor: Colors.WHITE,
  },
  dropdown1BtnTxtStyle: {
    fontSize: 18,
    color: Colors.MATT_BLACK,
  },
  textInputContainer: {
    width: SCREEN_WIDTH * 0.4,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  numberContainer: {
    width: '100%',
  },
  elevation: {
    elevation: 10,
    shadowColor: '#52006A',
  },
  cardContainer: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: Colors.BORDER_GREY,
    borderRadius: 5,
    padding: 10
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingText: {
    fontWeight: '700',
    color: Colors.BLACK,
    fontSize: 16
  },
  headingTextDark: {
    fontWeight: '700',
    color: Colors.WHITE,
    fontSize: 16
  },
  codeText: {
    color: Colors.GREY,
  },
  codeTextDark: {
    color: Colors.GREY,
  },
  statusText: {
    fontWeight: '700',
    color: Colors.GREEN,
    fontSize: 16
  },
  txt: {
    color: Colors.BLACK,
    paddingBottom: 5
  },
  txtDark: {
    color: Colors.DARK_TEXT,
    paddingBottom: 5
  }
});
