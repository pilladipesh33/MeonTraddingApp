import { StyleSheet, Platform, StatusBar } from 'react-native';
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
    cardContainer: {
        marginTop: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10
    },
    cardContainerDark: {
        marginTop: 10,
        backgroundColor: Colors.GREY,
        borderRadius: 10
    },
    cardText: {
        fontSize: 15,
        color: Colors.MATT_BLACK
    },
    cardTextDark: {
        fontSize: 15,
        color: Colors.DARK_TEXT
    },
    timeContainer: {},
    fontText: {
        fontSize: 16,
        color: Colors.MATT_BLACK
    },
    fontTextDark: {
        fontSize: 16,
        color: Colors.DARK_TEXT
    }
})