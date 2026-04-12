import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ActionButtons() {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.primary}
                onPress={() => console.log('Start reading pressed')}>
                <Text style={styles.primaryText}>Start reading</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondary}
                onPress={() => console.log('Add to library pressed')}>
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