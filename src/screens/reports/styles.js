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
      screenContainer: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15
      },
      inputText: {
        paddingLeft: 10,
        fontSize: 16,
        color: Colors.MATT_BLACK
      },
})