import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface ActionButtonsProps {
    onAddToLibrary?: () => void;
    onStartReading?: () => void;
    disabled?: boolean;
}

export default function ActionButtons({ onAddToLibrary, onStartReading, disabled }: ActionButtonsProps) {
    const { themeColors, isDark } = useTheme();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.primary, 
                    { backgroundColor: themeColors.accent },
                    disabled && { opacity: 0.5 }
                ]}
                onPress={onStartReading}
                disabled={disabled}
            >
                <Text style={styles.primaryText}>Start reading</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.secondary, 
                    { backgroundColor: themeColors.secondColor },
                    disabled && { opacity: 0.5 }
                ]}
                onPress={onAddToLibrary}
                disabled={disabled}
            >
                <Text style={[styles.secondaryText, { color: themeColors.accent }]}>Add to library</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    primary: {
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 40,
        elevation: 5
    },
    primaryText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    secondary: {
        marginTop: 10,
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 40,
        elevation: 5
    },
    secondaryText: {
        fontWeight: '600',
    },
});