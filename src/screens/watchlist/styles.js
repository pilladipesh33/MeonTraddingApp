import { Platform, StatusBar, StyleSheet } from 'react-native'
import { Colors } from '../../constants/color';

export const styles = StyleSheet.create({
    androidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: Colors.TRANSPARENT,
    },
    container: {
      paddingLeft: 10,
      paddingRight: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headingText: {
      fontSize: 24,
      fontWeight: '500',
      color: Colors.OYNX,
    },
    overlay: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.5)',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
    },
    containerReverse:{
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    headerText: {
      fontWeight: '400',
      color: Colors.GREY,
      fontSize: 17,
      paddingTop: 10
    },
    contentText: {
      fontWeight: '400',
      color: Colors.BLACK,
      fontSize: 17
    }
  });