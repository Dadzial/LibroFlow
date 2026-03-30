import {StyleSheet} from "react-native";
import {getColor} from "../../utils/ColorsParser";

export const trashStyles = StyleSheet.create({
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
    screenDescription: {
        fontSize: 18,
        fontWeight: '300',
        textShadowColor: 'rgba(147,146,146,0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        color: getColor('textPrimaryColor'),
        textAlign: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    trashListContainer: {
        marginTop:10
    }
});
