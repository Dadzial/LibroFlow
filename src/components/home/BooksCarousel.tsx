import { View, Text, ScrollView, StyleSheet } from 'react-native';
import BookItem from './BookItem';
import { TouchableOpacity } from 'react-native';
import {getColor} from "../../utils/ColorsParser";

export default function BooksCarousel({ books }: any) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Books to read</Text>
                <TouchableOpacity onPress={() => console.log('View all clicked')}>
                    <Text style={styles.seeMore}>View all</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            flexGrow: 1,
                        }}>
                {books.map((book: any) => (
                    <BookItem key={book.id} book={book} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 28,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: getColor('textPrimaryColor'),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    seeMore: {
        color: '#6A28B0',
        fontWeight: '600',
    },
});