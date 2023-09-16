import {StyleSheet, Platform, StatusBar} from 'react-native';
import {Colors} from '../../constants/color';
import { SCREEN_HEIGHT, WINDOW_HEIGHT } from '../../constants/dimensions';

export const styles = StyleSheet.create({
  AndroidSafeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.WHITE,
  },
  headerContainer: {
    height: SCREEN_HEIGHT - WINDOW_HEIGHT,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10
  },
  headerText: {
    fontSize: 18,
    color: Colors.MATT_BLACK,
    fontWeight: '600',
    paddingLeft: '5%'
  },
  inputContainer: {
    width: '95%',
    borderWidth: 1,
    borderColor: Colors.BORDER_GREY,
    marginTop: '20%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  dataContainer: {
    marginTop: '10%',
    width: '85%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: '10%',
  },
  shadowProps: {
    shadowOffset: {
        width: -2,
        height: 4
    },
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3,  
    
  },
  buttonContainer: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '10%'
  },
});
