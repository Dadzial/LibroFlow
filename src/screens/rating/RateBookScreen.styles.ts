import { StyleSheet } from 'react-native';
import { getColor } from '../../utils/ColorsParser';

export const rateBookScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: getColor('primaryColor'),
        padding: 20,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },
    cover: {
        width: 130,
        height: 200,
        borderRadius: 14,
        marginBottom: 16,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        color: '#222',
    },
    author: {
        fontSize: 15,
        color: '#666',
        marginTop: 4,
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    starsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginBottom: 10,
    },
    starButton: {
        padding: 4,
    },
    ratingText: {
        fontSize: 15,
        color: '#555',
        marginBottom: 20,
    },
    saveButton: {
        width: '100%',
        backgroundColor: getColor('accent'),
        paddingVertical: 13,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    saveButtonDisabled: {
        opacity: 0.5,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    secondaryButton: {
        width: '100%',
        backgroundColor: getColor('secondColor'),
        paddingVertical: 13,
        borderRadius: 12,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#222',
        fontSize: 16,
        fontWeight: '600',
    },
});

