import { StyleSheet } from "react-native";
import { Colors } from "../../constants/color";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingRight: 10,
        paddingLeft: 10
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