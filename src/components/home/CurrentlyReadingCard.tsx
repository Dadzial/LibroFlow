import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useBooks } from '../../context/BooksContext';
import { getColor } from '../../utils/ColorsParser';

export default function CurrentlyReadingCard() {
    const { currentlyReadingBook, readingTime, isReading, setIsReading, setCurrentlyReadingBook } = useBooks();

    if (!currentlyReadingBook) {
        return (
            <View style={[styles.card, { justifyContent: 'center', alignItems: 'center', height: 100 }]}>
                <Text style={{ color: 'gray' }}>Select a book to start reading!</Text>
            </View>
        );
    }

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h > 0 ? h + ':' : ''}${m < 10 && h > 0 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
    };

    const progress = currentlyReadingBook.progress || 0;

    const handleRemoveCurrent = () => {
        setCurrentlyReadingBook(null);
        setIsReading(false);
    };

    return (
        <View style={styles.card}>
            <Image source={{ uri: currentlyReadingBook.cover }} style={styles.cover} />

            <View style={styles.content}>
                <View>
                    <View style={styles.headerRow}>
                        <Text style={styles.author}>{currentlyReadingBook.author}</Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={handleRemoveCurrent}>
                            <Text style={styles.deleteButtonText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title} numberOfLines={1}>{currentlyReadingBook.title}</Text>
                </View>

                <View>
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>{formatTime(readingTime)}</Text>
                    </View>
                    
                    <View style={styles.progressRow}>
                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progress,
                                    { width: `${progress * 100}%` },
                                ]}
                            />
                        </View>
                        <Text style={styles.progressText}>
                            {Math.round(progress * 100)}%
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, isReading && styles.buttonActive]}
                        activeOpacity={0.7}
                        onPress={() => setIsReading(!isReading)}
                    >
                        <Text style={styles.buttonText}>{isReading ? 'Pause' : (readingTime > 0 ? 'Resume' : 'Start')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 28,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
    cover: {
        width: 90,
        height: 140,
        borderRadius: 12,
        marginRight: 16,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    author: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    deleteButton: {
        backgroundColor: '#FEE2E2',
        borderRadius: 12,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButtonText: {
        color: '#EF4444',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 24,
        includeFontPadding: false,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 2,
    },
    timerContainer: {
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    timerText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6A28B0',
        backgroundColor: '#F3E8FF',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        overflow: 'hidden'
    },
    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        marginRight: 8,
    },
    progress: {
        height: 8,
        backgroundColor: '#6A28B0',
        borderRadius: 10,
    },
    progressText: {
        fontSize: 12,
        color: '#444',
    },
    button: {
        marginTop: 14,
        backgroundColor: '#6A28B0',
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonActive: {
        backgroundColor: '#4C1D95',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});