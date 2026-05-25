import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useBooks } from '../../context/BooksContext';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, G } from 'react-native-svg';

export default function ReadingGoalsCard() {
    const { themeColors } = useTheme();
    const navigation = useNavigation<any>();
    const { readingGoalTarget, readingGoalCompletedCount, setReadingGoal, updateReadingGoal, cancelReadingGoal, resetReadingGoalCompletely } = useBooks();
    const [isSettingGoal, setIsSettingGoal] = useState(false);
    const [isEditingGoal, setIsEditingGoal] = useState(false);
    const [goalInput, setGoalInput] = useState('');
    const [hasShownCompletionMessage, setHasShownCompletionMessage] = useState(false);
    const [showCompletionModal, setShowCompletionModal] = useState(false);

     const handleSetGoal = () => {
         const target = parseInt(goalInput, 10);
         if (target > 0) {
             setHasShownCompletionMessage(false);
             setReadingGoal(target);
             setGoalInput('');
             setIsSettingGoal(false);
         }
     };

     const handleEditGoal = () => {
         setGoalInput(readingGoalTarget?.toString() || '');
         setIsEditingGoal(true);
     };

     const handleSaveEditedGoal = () => {
         const target = parseInt(goalInput, 10);
         if (target > 0) {
             setHasShownCompletionMessage(false);
             updateReadingGoal(target);
             setGoalInput('');
             setIsEditingGoal(false);
         }
     };

    const handleCancelEdit = () => {
        setGoalInput('');
        setIsEditingGoal(false);
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
             setShowCompletionModal(true);
         }
     }, [readingGoalCompletedCount, readingGoalTarget, hasShownCompletionMessage]);

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
                        <View style={styles.buttonsRow}>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: '#6A28B0', flex: 1 }]}
                                onPress={handleSetGoal}
                            >
                                <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
                                    Set
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: '#6A28B0', flex: 1 }]}
                                onPress={() => setIsSettingGoal(false)}
                            >
                                <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        );
    }

    // Show editing UI if in edit mode
    if (isEditingGoal) {
        return (
            <View style={[styles.card, { backgroundColor: themeColors.secondColor }]}>
                <View style={styles.inputContainer}>
                    <Text style={[styles.goalText, { color: themeColors.textPrimaryColor }]}>
                        Edit your reading goal
                    </Text>
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
                    <View style={styles.buttonsRow}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#6A28B0', flex: 1 }]}
                            onPress={handleSaveEditedGoal}
                        >
                            <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
                                Save
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#6A28B0', flex: 1 }]}
                            onPress={handleCancelEdit}
                        >
                            <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <>
        <Modal
            visible={showCompletionModal}
            transparent
            animationType="fade"
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, { backgroundColor: themeColors.secondColor }]}>
                    <Text style={[styles.modalTitle, { color: themeColors.textPrimaryColor }]}>
                        Congratulations!
                    </Text>
                    <Text style={[styles.modalMessage, { color: themeColors.textPrimaryColor }]}>
                        You've completed your reading goal of {readingGoalTarget} books!
                    </Text>
                    <View style={styles.modalButtonsRow}>
                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: '#6A28B0', flex: 1 }]}
                            onPress={() => {
                                resetReadingGoalCompletely();
                                setHasShownCompletionMessage(false);
                                setShowCompletionModal(false);
                                setIsSettingGoal(true);
                                navigation.navigate('Home');
                            }}
                        >
                            <Text style={[styles.modalButtonText, { color: '#FFFFFF' }]}>
                                New Goal
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: '#6A28B0', flex: 1 }]}
                            onPress={() => {
                                cancelReadingGoal();
                                setShowCompletionModal(false);
                            }}
                        >
                            <Text style={[styles.modalButtonText, { color: '#FFFFFF' }]}>
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
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
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.cancelButton, { backgroundColor: '#6A28B0', flex: 1 }]}
                    onPress={handleEditGoal}
                >
                    <Text style={[styles.cancelButtonText, { color: '#FFFFFF' }]}>
                        Edit
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.cancelButton, { backgroundColor: '#6A28B0', flex: 1 }]}
                    onPress={handleCancel}
                >
                    <Text style={[styles.cancelButtonText, { color: '#FFFFFF' }]}>
                        Cancel Goal
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        </>
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },

    buttonsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 16,
    },

    buttonsRow: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        paddingHorizontal: 10,
    },

    cancelButtonText: {
        fontWeight: 'bold',
        fontSize: 14,
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