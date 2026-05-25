import { StyleSheet } from 'react-native';
import { getColor } from '../../utils/ColorsParser';

export const rateBookScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: getColor('primaryColor'),
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
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
    cardContent: {
        flex: 1,
        width: '100%',
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
    noteLabel: {
        width: '100%',
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    notesScrollContainer: {
        width: '100%',
        maxHeight: 250,
        marginBottom: 18,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden',
    },
    noteInput: {
        width: '100%',
        minHeight: 250,
        borderWidth: 0,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        color: '#111827',
        backgroundColor: '#FAFAFA',
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
    clearButton: {
        width: '100%',
        backgroundColor: '#FCA5A5',
        paddingVertical: 13,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    clearButtonText: {
        color: '#991B1B',
        fontSize: 16,
        fontWeight: '700',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 0,
    },
    clearButtonInline: {
        flex: 1,
        backgroundColor: '#FCA5A5',
        paddingVertical: 13,
        borderRadius: 12,
        alignItems: 'center',
    },
    secondaryButton: {
        width: '100%',
        backgroundColor: getColor('secondColor'),
        paddingVertical: 13,
        borderRadius: 12,
        alignItems: 'center',
    },
    secondaryButtonInline: {
        flex: 1,
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

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        borderRadius: 16,
        padding: 24,
        width: '80%',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },

    modalButtonsRow: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },

    modalButton: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },

    modalButtonText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
});
