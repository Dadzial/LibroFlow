import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function ReadingGoalsCard() {
    const { themeColors } = useTheme();
    return (
        <View style={[styles.card, { backgroundColor: themeColors.secondColor }]}>
            <View style={styles.row}>
                <View style={[styles.circle, { borderColor: themeColors.primaryColor }]}>
                    <Text style={[styles.percent, { color: themeColors.textPrimaryColor }]}>0%</Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={[styles.goalText, { color: themeColors.textPrimaryColor }]}>0 of 1 books read</Text>
                    <Text style={[styles.subText, { color: themeColors.textPrimaryColor, opacity: 0.7 }]}>
                        You're just starting your journey. Pick a book and start reading!
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
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
    },

    subText: {
        fontSize: 12,
        marginTop: 5,
        lineHeight: 16,
    },
});