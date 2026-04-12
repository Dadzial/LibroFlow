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
        marginBottom: 20,
    },

    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: getColor('textPrimaryColor'),
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
    },

    favoritesList: {
        marginBottom: 28,
    },

    section: {
        marginBottom: 15,
    },
});