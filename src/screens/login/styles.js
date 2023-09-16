import {StyleSheet, Platform, StatusBar} from 'react-native';
import {Colors} from '../../constants/color';

export const styles = StyleSheet.create({
  AndroidSafeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.WHITE,
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    paddingTop: '50%'
  },
  buttonContainer: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '10%'
  },
  txtContainer: {
    paddingTop: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10
  },
  txt: {
    fontWeight: '500',
    fontSize: 16,
    color: Colors.GREY
  }
});
