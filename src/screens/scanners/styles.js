import { StyleSheet, Platform, StatusBar } from "react-native";
import { Colors } from "../../constants/color";

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
    boxContainer: {
        width: '45%',
        // backgroundColor: 'red',
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: Colors.BORDER_GREY,
        borderRadius: 5
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        marginLeft: 10,
        marginRight: 10,

    }
})