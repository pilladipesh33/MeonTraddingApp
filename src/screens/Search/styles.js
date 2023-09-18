import { Colors } from "../../constants/color";
import { SCREEN_HEIGHT, WINDOW_HEIGHT } from "../../constants/dimensions";
import { Platform, StatusBar, StyleSheet } from 'react-native'

export  const styles = StyleSheet.create({
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
    searchBox: {
      height: SCREEN_HEIGHT - WINDOW_HEIGHT,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInputContainer: {
      paddingLeft: 20,
      width: '100%',
      fontSize: 16,
      fontWeight: '500',
      color: Colors.GREY,
    },
    textInputContainerDark: {
      paddingLeft: 20,
      width: '100%',
      fontSize: 16,
      fontWeight: '500',
      color: Colors.WHITE,
    },
    searchCard: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: Colors.BORDER_GREY,
      paddingRight: 10,
      paddingLeft: 10,
    },
    contentContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    heading: {
      //paddingTop: 10,
      padding: 10,
      paddingBottom: 4,
      fontSize: 16,
      color: Colors.MATT_BLACK,
    },
    headingDark: {
      //paddingTop: 10,
      padding: 10,
      paddingBottom: 4,
      fontSize: 16,
      color: Colors.WHITE,
    },
    content: {
      paddingLeft: 10,
      paddingBottom: 5,
    },
    contentDark: {
      paddingLeft: 10,
      paddingBottom: 5,
      color: Colors.LIGHT_TEXT
    },
    cardContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: Colors.BORDER_GREY,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 10,
    },
  });
  