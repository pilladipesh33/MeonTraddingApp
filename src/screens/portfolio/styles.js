import { StyleSheet, Platform, StatusBar } from 'react-native'
import { Colors } from '../../constants/color'
import { SCREEN_HEIGHT } from '../../constants/dimensions'

export const styles = StyleSheet.create({
    androidSafeArea: {
        flex : 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: Colors.TRANSPARENT
      },
      container: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      headerText: {
        fontSize: 24,
        fontWeight: '500',
        color: Colors.OYNX
      },
      bodyContainer: {
        backgroundColor: Colors.WHITE,
        height: '100%',
        top: 80,
        borderRadius: 20,
      },
      boxContainer: {
        backgroundColor: Colors.WHITE,
        width: '90%',
        height: SCREEN_HEIGHT * 0.14,
        position: 'absolute',
        left: '5%',
        top: -55,
        borderRadius: 5,
      },
      boxContainer2: {
        backgroundColor: Colors.WHITE,
        width: '90%',
        height: SCREEN_HEIGHT * 0.1,
        position: 'absolute',
        left: '5%',
        top: -45,
        borderRadius: 5,
      },
      elevation: {
        elevation: 10,
        shadowColor: '#52006A',
      },
      cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        alignItems: 'center',
      },
      cardHeadingText: {
        color: Colors.MATT_BLACK,
        fontWeight: '400',
      },
      searchText: {
        paddingRight: '35%',
        fontSize: 16,
        color: Colors.GREY,
      },
      bodyContentContainer: {paddingTop: '15%', paddingLeft: 10, paddingRight: 10},
      searchBarContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      searchBarText: {
        fontSize: 15,
        color: Colors.BLUE,
        paddingRight: 10,
      },
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        paddingBottom: 10
      },
      columnContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
      },
      columnContainerReverse: {
        flexDirection: 'column',
      },
      headingText: {
        fontSize: 14,
        color: Colors.GREY,
      },
      contentText: {
        fontSize: 20,
        color: Colors.BLACK,
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
      subContentText2: {
        color: Colors.BLACK,
        fontSize: 14,
      },
      profileContainer: {
        height: 40,
        width: 40,
        borderRadius: 80,
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center'
      }
})