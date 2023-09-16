import {StyleSheet, Platform, StatusBar} from 'react-native';
import { Colors } from '../../constants/color';

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
      container: {
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderColor: Colors.BORDER_GREY,
        paddingTop:5
      },
      headingText: {
        fontSize: 24,
        fontWeight: '500',
        color: Colors.MATT_BLACK,
      },
      headingTextDark: {
        fontSize: 24,
        fontWeight: '500',
        color: Colors.DARK_TEXT,
      },
      headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10
      },
      subHeadingText: {
        fontSize: 15,
        fontWeight: '300',
        color: Colors.MATT_BLACK,
      },
      subHeadingTextDark: {
        fontSize: 15,
        fontWeight: '300',
        color: Colors.DARK_TEXT
      },
      header: {
        fontWeight: '700',
        fontSize: 16,
        color: Colors.BLACK,
        textAlign: 'center',
        paddingLeft: 15
      },
      headerDark: {
        fontWeight: '700',
        fontSize: 16,
        color: Colors.DARK_TEXT,
        textAlign: 'center',
        paddingLeft: 15
      },
      item: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.BORDER_GREY,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15,
      },
      title: {
        paddingLeft: 10,
        fontSize: 14,
        color: Colors.MATT_BLACK,
      },
      columnContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10,
      },
      columnContainer2: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingTop: 10,
        paddingBottom: 10,
      },
      detailText: {
        fontSize: 15,
        color: Colors.GREY,
        paddingTop: 5,
      },
      detailTextDark: {
        fontSize: 15,
        color: '#B3B3B3',
        paddingTop: 5,
      },
      detailText2: {
        fontSize: 15,
        color: Colors.BLACK,
        paddingTop: 5,
      },
      detailText2Dark: {
        fontSize: 15,
        color: Colors.DARK_TEXT,
        paddingTop: 5,
      },
      picContainer: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: Colors.DARK_BLUE,
      },
      editContainer: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      editButtonContainer: {
        position: 'absolute',
        
      }
})