import { ScrollView, Text } from 'react-native';
import { homeStyles } from './HomeScreen.styles';

import CurrentlyReadingCard from '../../components/home/CurrentlyReadingCard';
import BooksCarousel from '../../components/home/BooksCarousel';
import ReadingGoalsCard from '../../components/home/ReadingGoalsCard';

import { currentBook, books } from '../../mock/books';

export default function HomeScreen() {
    return (
        <ScrollView style={homeStyles.container}>
            <Text style={homeStyles.sectionTitle}>Currently reading</Text>
            <CurrentlyReadingCard book={currentBook} />
            <BooksCarousel books={books} />
            <Text style={homeStyles.sectionTitle}>Reading goals</Text>
            <ReadingGoalsCard />
        </ScrollView>
    );
}