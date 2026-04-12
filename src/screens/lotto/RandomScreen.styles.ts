import { StyleSheet } from "react-native";
import { getColor } from "../../utils/ColorsParser";

export const randomStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: getColor('primaryColor'),
        paddingHorizontal: 16,
    },

    screenTitleContainer: {
        alignItems: 'center',
        marginTop: 16,
    },

    screenTitle: {
        fontSize: 26,
        fontWeight: '700',
        textShadowColor: 'rgba(147,146,146,0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        color: getColor('textPrimaryColor'),
    },

    screenDescription: {
        fontSize: 16,
        fontWeight: '300',
        textShadowColor: 'rgba(147,146,146,0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        color: getColor('textPrimaryColor'),
        textAlign: 'center',
        marginTop: 8,
        paddingHorizontal: 10,
    },

    diceWrapper: {
        marginTop: 24,
    },

    drawButton: {
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: '#eee',
        paddingVertical: 10,
        paddingHorizontal: 22,
        borderRadius: 12,
        elevation: 2,
    },

    drawButtonText: {
        color: '#6A28B0',
        fontWeight: '600',
    },

    subText: {
        textAlign: 'center',
        marginTop: 14,
        color: '#666',
    },

    pickTitle: {
        textAlign: 'center',
        marginTop: 28,
        fontWeight: 'bold',
        fontSize: 16,
    },

    booksWrapper: {
        marginTop: 18,
    },

    actionsWrapper: {
        marginTop: 32,
    },
});