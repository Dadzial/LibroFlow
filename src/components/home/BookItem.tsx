import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Book } from '../../context/BooksContext';
import { getIcon } from '../../utils/IconParser';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

interface BookItemProps {
    book: Book;
    onRemove?: (id: string | number) => void;
}

export default function BookItem({ book, onRemove }: BookItemProps) {
    const deleteIcon = getIcon('deleteIcon');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handlePress = () => {
        navigation.navigate('BookDisplay', { bookId: book.id.toString() });
    };

    return (
        <TouchableOpacity 
            style={styles.container} 
            activeOpacity={0.8}
            onPress={handlePress}
        >
            <View>
                <Image source={{ uri: book.cover }} style={styles.image} />
                {onRemove && (
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={(e) => {
                            e.stopPropagation();
                            onRemove(book.id);
                        }}
                    >
                        <Image source={deleteIcon} style={styles.icon} />
                    </TouchableOpacity>
                )}
            </View>
            <Text numberOfLines={1} style={styles.title}>{book.title}</Text>
            <Text numberOfLines={1} style={styles.author}>{book.author}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginRight: 12,
        width: 120,
    },
    image: {
        width: 120,
        height: 170,
        borderRadius: 10,
    },
    title: {
        fontWeight: 'bold',
        marginTop: 5,
    },
    author: {
        fontSize: 12,
        color: '#666',
    },
    removeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    icon: {
        width: 16,
        height: 16,
        tintColor: '#FF3B30',
    }
});