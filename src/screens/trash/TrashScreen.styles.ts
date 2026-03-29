import {StyleSheet} from "react-native";
import {getColor} from "../../utils/ColorsParser";

export const trashStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: getColor('primaryColor'),
        alignItems: 'center',
        justifyContent: 'center',
    },
});
