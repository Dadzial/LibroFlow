import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ActionButtonsProps {
    onAddToLibrary?: () => void;
    onStartReading?: () => void;
    disabled?: boolean;
}

export default function ActionButtons({ onAddToLibrary, onStartReading, disabled }: ActionButtonsProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.primary, disabled && { opacity: 0.5 }]}
                onPress={onStartReading}
                disabled={disabled}
            >
                <Text style={styles.primaryText}>Start reading</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.secondary, disabled && { opacity: 0.5 }]}
                onPress={onAddToLibrary}
                disabled={disabled}
            >
                <Text style={styles.secondaryText}>Add to library</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    primary: {
        backgroundColor: '#7B3FE4',
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
        backgroundColor: '#ffffff',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 40,
        elevation: 5
    },
    secondaryText: {
        color: '#7B3FE4',
        fontWeight: '600',
    },
});