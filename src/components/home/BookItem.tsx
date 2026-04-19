import { View, Text, Image, StyleSheet } from 'react-native';
import { Book } from '../../context/BooksContext';

interface BookItemProps {
    book: Book;
}

export default function BookItem({ book }: BookItemProps) {
    return (
        <View style={styles.container}>
            <Image source={{ uri: book.cover }} style={styles.image} />
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
        </View>
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
});