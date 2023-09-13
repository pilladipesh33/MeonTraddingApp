import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/color';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    cardContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.BORDER_GREY,
        paddingLeft: 10,
        paddingRight: 10
    },
    cardText: {
        fontSize: 15,
        color: Colors.MATT_BLACK
    },
    timeContainer: {},
    fontText: {
        fontSize: 16,
        color: Colors.MATT_BLACK
    }
})