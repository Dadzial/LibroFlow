import { View, Text, StyleSheet } from 'react-native';

export default function ReadingGoalsCard() {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <View style={styles.circle}>
                    <Text style={styles.percent}>0%</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.goalText}>0 of 1 books read</Text>
                    <Text style={styles.subText}>
                        You're just starting your journey. Pick a book and start reading!
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        minHeight: 140,

        elevation: 3,

        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

    circle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 6,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },

    percent: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    textContainer: {
        marginLeft: 24,
        flex: 1,
        paddingRight: 24,
    },

    goalText: {
        fontWeight: 'bold',
        color: '#6A28B0',
    },

    subText: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
        lineHeight: 16,
    },
});