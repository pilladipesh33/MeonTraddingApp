import {Platform, StatusBar, StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, WINDOW_HEIGHT} from '../../constants/dimensions';
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: SCREEN_HEIGHT - WINDOW_HEIGHT,
  },
  buttonContainer: {
    width: '45%',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 18,
  },
  modalContainer: {
    height: SCREEN_HEIGHT * 0.5,
    backgroundColor: 'red',
    paddingTop: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.BORDER_GREY,
    paddingTop: 20,
    paddingBottom: 20,
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    color: Colors.GREY,
  },
  contentText: {
    color: Colors.matt,
  },
  contentTextDark: {
    color: Colors.WHITE,
  },
  priceText: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.BLACK,
    textAlign: 'center'
  },
  priceTextDark: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.WHITE,
    textAlign: 'center'
  },
  priceContainer:{
    // paddingLeft: '10%'
    position: 'absolute',
    top: '5%',
    right: 0,
    paddingRight: '5%'
  },
  dropdown2BtnStyle: {
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 1,
    borderColor: Colors.BORDER_GREY,
  },
  rowContainer2: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  textInputContainer: {
    width: '50%',
  },
  contentText2: {
    fontSize: 15,
    color: Colors.BLACK,
    paddingRight: 10,
  },
  loaderContainer: {
    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    alignSelf: 'center'
  }
});
