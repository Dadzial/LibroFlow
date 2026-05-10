import { ScrollView, Text, View } from 'react-native';
import { homeStyles } from './HomeScreen.styles';
import { useTheme } from '../../context/ThemeContext';
import { Colors } from '../../utils/ColorsParser';

import CurrentlyReadingCard from '../../components/home/CurrentlyReadingCard';
import BooksCarousel from '../../components/home/BooksCarousel';
import ReadingGoalsCard from '../../components/home/ReadingGoalsCard';

import { currentBook } from '../../mock/books';
import { useBooks } from '../../context/BooksContext';

export default function HomeScreen() {
    const { toReadBooks, removeBookFromLibrary } = useBooks();
    const { themeColors } = useTheme();

    return (
        <ScrollView style={[homeStyles.container, { backgroundColor: themeColors.primaryColor }]}>
            <Text style={[homeStyles.sectionTitle, { color: themeColors.textPrimaryColor }]}>
                Currently reading
            </Text>
            <CurrentlyReadingCard />
            
            {toReadBooks.length > 0 ? (
                <BooksCarousel books={toReadBooks} onRemove={removeBookFromLibrary} />
            ) : (
                <View style={{ marginBottom: 20, alignItems: 'center' }}>
                    <Text style={{ color: themeColors.textPrimaryColor, opacity: 0.6 }}>No books in your "To Read" list.</Text>
                </View>
            )}
            
            <Text style={[homeStyles.sectionTitle, { color: themeColors.textPrimaryColor }]}>Reading goals</Text>
            <ReadingGoalsCard />
        </ScrollView>
    );
}