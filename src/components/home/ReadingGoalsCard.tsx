import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useBooks } from '../../context/BooksContext';
import { useState, useEffect } from 'react';
import Svg, { Circle, G } from 'react-native-svg';

export default function ReadingGoalsCard() {
    const { themeColors } = useTheme();
    const { readingGoalTarget, readingGoalCompletedCount, setReadingGoal, cancelReadingGoal, resetReadingGoalCompletely } = useBooks();
    const [isSettingGoal, setIsSettingGoal] = useState(false);
    const [goalInput, setGoalInput] = useState('');
    const [hasShownCompletionMessage, setHasShownCompletionMessage] = useState(false);

    const handleSetGoal = () => {
        const target = parseInt(goalInput, 10);
        if (target > 0) {
            setReadingGoal(target);
            setGoalInput('');
            setIsSettingGoal(false);
        }
    };

    const handleCancel = () => {
        cancelReadingGoal();
        setIsSettingGoal(false);
        setGoalInput('');
        setHasShownCompletionMessage(false);
    };

    const percentage = readingGoalTarget
        ? Math.round((readingGoalCompletedCount / readingGoalTarget) * 100)
        : 0;

    // Show alert when goal is completed
    useEffect(() => {
        if (percentage === 100 && readingGoalTarget && !hasShownCompletionMessage) {
            setHasShownCompletionMessage(true);
            Alert.alert(
                'Congratulations!',
                `You've completed your reading goal of ${readingGoalTarget} books!`,
                [
                    {
                        text: 'New Goal',
                        onPress: () => {
                            resetReadingGoalCompletely();
                            setHasShownCompletionMessage(false);
                            setIsSettingGoal(true);
                        }
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            cancelReadingGoal();
                            setHasShownCompletionMessage(false);
                        }
                    }
                ]
            );
        }
    }, [percentage, readingGoalTarget, hasShownCompletionMessage]);

    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    if (!readingGoalTarget) {
        return (
            <View style={[styles.card, { backgroundColor: themeColors.secondColor }]}>
                {!isSettingGoal ? (
                    <TouchableOpacity
                        style={styles.centerContent}
                        onPress={() => setIsSettingGoal(true)}
                    >
                        <Text style={[styles.goalText, { color: themeColors.textPrimaryColor }]}>
                            Set your reading goal
                        </Text>
                        <Text style={[styles.subText, { color: themeColors.textPrimaryColor, opacity: 0.7 }]}>
                            How many books do you want to read?
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, {
                                backgroundColor: themeColors.primaryColor,
                                color: themeColors.textPrimaryColor,
                                borderColor: themeColors.textPrimaryColor
                            }]}
                            placeholder="Number of books"
                            placeholderTextColor={themeColors.textPrimaryColor}
                            keyboardType="numeric"
                            value={goalInput}
                            onChangeText={setGoalInput}
                            autoFocus
                        />
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: themeColors.primaryColor }]}
                            onPress={handleSetGoal}
                        >
                            <Text style={[styles.buttonText, { color: themeColors.textPrimaryColor }]}>
                                Set
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: themeColors.primaryColor }]}
                            onPress={() => setIsSettingGoal(false)}
                        >
                            <Text style={[styles.buttonText, { color: themeColors.textPrimaryColor }]}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }

    return (
        <View style={[styles.card, { backgroundColor: themeColors.secondColor }]}>
            <View style={styles.row}>
                <View style={styles.circleContainer}>
                    <Svg width={90} height={90} viewBox="0 0 90 90">
                        {/* Background circle */}
                        <Circle
                            cx="45"
                            cy="45"
                            r={radius}
                            fill="none"
                            stroke={themeColors.textPrimaryColor}
                            strokeWidth="3"
                            opacity="0.2"
                        />
                        {/* Progress circle - rotated by -90 degrees */}
                        <G transform="translate(45, 45) rotate(-90) translate(-45, -45)">
                            <Circle
                                cx="45"
                                cy="45"
                                r={radius}
                                fill="none"
                                stroke="#6A28B0"
                                strokeWidth="6"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                            />
                        </G>
                    </Svg>
                    <Text style={[styles.percentOverlay, { color: themeColors.textPrimaryColor }]}>
                        {percentage}%
                    </Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={[styles.goalText, { color: themeColors.textPrimaryColor }]}>
                        {readingGoalCompletedCount} of {readingGoalTarget} books read
                    </Text>
                    <Text style={[styles.subText, { color: themeColors.textPrimaryColor, opacity: 0.7 }]}>
                        {readingGoalTarget - readingGoalCompletedCount} books to go!
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.cancelButton, { backgroundColor: themeColors.primaryColor }]}
                onPress={handleCancel}
            >
                <Text style={[styles.cancelButtonText, { color: themeColors.textPrimaryColor }]}>
                    Cancel Goal
                </Text>
            </TouchableOpacity>
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

    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 100,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

    circleContainer: {
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    percentOverlay: {
        position: 'absolute',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
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

    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 100,
        gap: 10,
    },

    input: {
        width: '80%',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 16,
    },

    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center',
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 14,
    },

    cancelButton: {
        marginTop: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },

    cancelButtonText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
});