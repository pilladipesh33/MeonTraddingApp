import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Colors } from './color';

export const constantStyles = StyleSheet.create({
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
      loaderContainer: {
        position: 'absolute', 
        top: 0, left: 0, 
        right: 0, bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
        alignSelf: 'center'
      },
})