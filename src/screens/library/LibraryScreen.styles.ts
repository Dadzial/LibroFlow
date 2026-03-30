import {StyleSheet} from "react-native";
import {getColor} from "../../utils/ColorsParser";

export const libraryStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: getColor('primaryColor'),
    },
    screenTitleContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
    },
    screenTitle: {
        fontSize: 25,
        fontWeight: '700',
        textShadowColor: 'rgba(147,146,146,0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        color: getColor('textPrimaryColor'),
    },
});
