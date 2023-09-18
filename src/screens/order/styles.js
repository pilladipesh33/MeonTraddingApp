import { StyleSheet, Platform, StatusBar } from 'react-native'
import { Colors } from '../../constants/color';

export const styles = StyleSheet.create({
    bodyContainer: {
      backgroundColor: Colors.WHITE,
      height: '100%',
    },
    bodyContainerDark: {
      backgroundColor: Colors.DARK,
      height: '100%',
    },
    bodyContentContainer: {paddingLeft: 10, paddingRight: 10},
    searchBarContainer: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    searchBarText: {
      fontSize: 15,
      color: Colors.BLUE,
    },
    searchBarTextDark: {
      fontSize: 15,
      color: Colors.HIGHLIGHT,
    },
    androidSafeArea: {
        flex : 1,
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        // backgroundColor: Colors.TRANSPARENT
      },
      container: {
        paddingLeft: 10,
        paddingRight: 10,
      },
      headerText: {
        fontSize: 24,
        fontWeight: '500',
        color: Colors.OYNX
      },
      flatlistContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.GREY,
      },
      containerReverse: {
        flexDirection: 'column',
        padding: 5,
        alignItems: 'flex-end',
      },
      headingText: {
        color: Colors.BLACK,
        fontSize: 15,
        fontWeight: '400',
      },
      subContentText: {
        color: Colors.GREY,
        fontSize: 14,
      },
  });