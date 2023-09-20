import { Colors } from "../../constants/color";

const { StyleSheet, Platform, StatusBar } = require("react-native");

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
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15
      },
      headingTextDark: {
        fontSize: 16,
        fontWeight: '400',
        color: Colors.DARK_LIGHT
      },
      headingText: {
        fontSize: 16,
        fontWeight: '400',
        color: Colors.MATT_BLACK
      },
      rowContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        width: '70%'
      },
      buyContainer: {
        borderWidth: 1,
        
        paddingVertical: 15,
        paddingHorizontal: 25
      },
      sellContainer: {
        borderWidth: 1,
        
        paddingVertical: 15,
        paddingHorizontal: 25
      },
      boxText: {
        color: Colors.MATT_BLACK,
        fontSize: 16,
        fontWeight: '600'
      },
      boxTextDark: {
        color: Colors.DARK_TEXT,
        fontSize: 16,
        fontWeight: '600'
      },
      blueContent: {
        borderColor: Colors.BLUE
      },
      greyContent: {
        borderColor: Colors.BORDER_GREY
      }
})