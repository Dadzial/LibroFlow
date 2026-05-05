import {ScrollView, TouchableOpacity, View, Text, Image, ActivityIndicator} from 'react-native';
import {bookDisplayScreenStyles} from "./BookDisplayScreen.styles";
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { fetchAllBooks } from "../../api/FetchAllBooks";
import {getIcon} from "../../utils/IconParser";
import { useBooks, Book } from '../../context/BooksContext';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useTheme } from '../../context/ThemeContext';

export default function BookDisplayScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'BookDisplay'>>();
    const navigation = useNavigation();
    const { themeColors } = useTheme();
    const { bookId } = route.params;
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const addToLibIcon = getIcon('addTolibIcon');
    const { addBookToLibrary, setCurrentlyReadingBook } = useBooks();

    useEffect(() => {
        const loadBook = async () => {
            try {
                const allBooks = await fetchAllBooks('none');
                const foundBook = allBooks.find((b) => b.googleId === bookId || b.title === bookId);
                if (!foundBook) throw new Error('Book not found');

                const mappedBook: Book = {
                    id: foundBook.googleId || foundBook.title,
                    title: foundBook.title,
                    author: foundBook.author,
                    cover: foundBook.cover,
                    pageCount: foundBook.pageCount,
                    language: foundBook.language,
                    description: foundBook.description
                };
                
                setBook(mappedBook);
            } catch (e: any) {
                setError(e.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        loadBook();
    }, [bookId]);

    if (loading) {
        return <View style={[bookDisplayScreenStyles.container, { backgroundColor: themeColors.primaryColor }]}><ActivityIndicator size="large" color={themeColors.accent} /></View>;
    }
    if (error || !book) {
        return <View style={[bookDisplayScreenStyles.container, { backgroundColor: themeColors.primaryColor }]}><Text style={{ color: themeColors.textPrimaryColor }}>Error loading book: {error}</Text></View>;
    }

    const handleAddToLibrary = () => {
        if (book) {
            addBookToLibrary(book);
            navigation.goBack();
        }
    };

    const handleStartReading = () => {
        if (book) {
            setCurrentlyReadingBook(book);
            // @ts-ignore
            navigation.navigate('Main', { screen: 'Home' });
        }
    };

    return (
        <View style={[bookDisplayScreenStyles.container, { backgroundColor: themeColors.primaryColor }]}>
            <TouchableOpacity
                style={[bookDisplayScreenStyles.closeButton, { backgroundColor: themeColors.textPrimaryColor + '1A' }]}
                onPress={() => navigation.goBack()}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Text style={[bookDisplayScreenStyles.closeButtonText, { color: themeColors.textPrimaryColor }]}>×</Text>
            </TouchableOpacity>

            <View style={bookDisplayScreenStyles.bookCoverContainer}>
                <Image
                    source={{ uri: book.cover }}
                    style={bookDisplayScreenStyles.bookCover}
                    resizeMode="cover"
                />
            </View>

            <View style={bookDisplayScreenStyles.bookTitleAuthor}>
                <Text style={[bookDisplayScreenStyles.bookTitle, { color: themeColors.textPrimaryColor }]}>{book.title}</Text>
                <Text style={[bookDisplayScreenStyles.bookAuthor, { color: themeColors.textPrimaryColor, opacity: 0.7 }]}>{book.author}</Text>
            </View>

            <View style={[bookDisplayScreenStyles.bookStats, { backgroundColor: themeColors.secondColor }]}>
                <View style={bookDisplayScreenStyles.bookStatItem}>
                    <Text style={[bookDisplayScreenStyles.bookStatValue, { color: themeColors.textPrimaryColor }]}>
                        {book.pageCount ?? '—'}
                    </Text>
                    <Text style={[bookDisplayScreenStyles.bookStatLabel, { color: themeColors.textPrimaryColor, opacity: 0.6 }]}>Pages</Text>
                </View>
                <View style={[bookDisplayScreenStyles.bookStatDivider, { backgroundColor: themeColors.textPrimaryColor + '33' }]} />
                <View style={bookDisplayScreenStyles.bookStatItem}>
                    <Text style={[bookDisplayScreenStyles.bookStatValue, { color: themeColors.textPrimaryColor }]}>
                        {book.language?.toUpperCase() ?? '—'}
                    </Text>
                    <Text style={[bookDisplayScreenStyles.bookStatLabel, { color: themeColors.textPrimaryColor, opacity: 0.6 }]}>Lang</Text>
                </View>
            </View>

            <ScrollView persistentScrollbar={true} style={bookDisplayScreenStyles.bookDescription}>
                <Text style={[bookDisplayScreenStyles.bookDescriptionText, { color: themeColors.textPrimaryColor, opacity: 0.9 }]}>{book.description || 'No description available.'}</Text>
            </ScrollView>

            <View style={bookDisplayScreenStyles.bookActions}>
                <TouchableOpacity style={[bookDisplayScreenStyles.startReadButton, { backgroundColor: themeColors.accent }]} onPress={handleStartReading}>
                    <Text style={bookDisplayScreenStyles.actionButtonText}>Start Reading</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[bookDisplayScreenStyles.addToLibButton, { backgroundColor: themeColors.secondColor }]} onPress={handleAddToLibrary}>
                    <Image source={addToLibIcon} style={{width: 28, height: 28, tintColor: themeColors.accent}} />
                </TouchableOpacity>
            </View>

        </View>
    );
}
