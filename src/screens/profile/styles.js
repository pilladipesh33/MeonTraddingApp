import {StyleSheet, Platform, StatusBar} from 'react-native';
import { Colors } from '../../constants/color';

export const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: Colors.WHITE,
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
      headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
      },
      subHeadingText: {
        fontSize: 15,
        fontWeight: '300',
        color: Colors.MATT_BLACK,
      },
      header: {
        fontWeight: '700',
        fontSize: 16,
        color: Colors.BLACK,
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
      detailText2: {
        fontSize: 15,
        color: Colors.BLACK,
        paddingTop: 5,
      },
})