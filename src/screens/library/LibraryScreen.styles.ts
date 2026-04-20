import { StyleSheet } from "react-native";
import { getColor } from "../../utils/ColorsParser";

export const libraryStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: getColor('primaryColor'),
        padding: 16,
        paddingTop: 10,
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
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: getColor('textPrimaryColor'),
    },
    viewAll: {
        color: '#6A28B0',
        fontWeight: '600',
    },
    horizontalList: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    favoritesList: {
        marginBottom: 28,
    },
    section: {
        marginBottom: 15,
    },
});