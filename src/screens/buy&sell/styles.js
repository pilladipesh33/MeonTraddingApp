import {Platform, StatusBar, StyleSheet} from 'react-native';
import {SCREEN_HEIGHT, WINDOW_HEIGHT} from '../../constants/dimensions';
import {Colors} from '../../constants/color';

export const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.WHITE,
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
    color: Colors.MATT_BLACK,
  },
  priceText: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.BLACK,
    textAlign: 'center'
  },
  priceContainer:{
    paddingLeft: '10%'
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
});
