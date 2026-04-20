import { ScrollView, Text, View } from 'react-native';
import { homeStyles } from './HomeScreen.styles';

import CurrentlyReadingCard from '../../components/home/CurrentlyReadingCard';
import BooksCarousel from '../../components/home/BooksCarousel';
import ReadingGoalsCard from '../../components/home/ReadingGoalsCard';

import { currentBook } from '../../mock/books';
import { useBooks } from '../../context/BooksContext';

export default function HomeScreen() {
    const { toReadBooks, removeBookFromLibrary } = useBooks();

    return (
        <ScrollView style={homeStyles.container}>
            <Text style={homeStyles.sectionTitle}>Currently reading</Text>
            <CurrentlyReadingCard />
            
            {toReadBooks.length > 0 ? (
                <BooksCarousel books={toReadBooks} onRemove={removeBookFromLibrary} />
            ) : (
                <View style={{ marginBottom: 20, alignItems: 'center' }}>
                    <Text style={{ color: 'gray' }}>No books in your "To Read" list.</Text>
                </View>
            )}
            
            <Text style={homeStyles.sectionTitle}>Reading goals</Text>
            <ReadingGoalsCard />
        </ScrollView>
    );
}