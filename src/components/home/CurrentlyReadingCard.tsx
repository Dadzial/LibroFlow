import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CurrentlyReadingCard({ book }: any) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: book.cover }} style={styles.cover} />

            <View style={styles.content}>
                <Text style={styles.author}>{book.author}</Text>
                <Text style={styles.title}>{book.title}</Text>

                {/* Progress */}
                <View style={styles.progressRow}>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progress,
                                { width: `${book.progress * 100}%` },
                            ]}
                        />
                    </View>
                    <Text style={styles.progressText}>
                        {Math.round(book.progress * 100)}%
                    </Text>
                </View>

                {/* Button */}
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => console.log('Resume clicked')}
                >
                    <Text style={styles.buttonText}>Resume</Text>
                </TouchableOpacity>
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

        // Android
        elevation: 3,

        // iOS
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
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 2,
    },

    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
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

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});