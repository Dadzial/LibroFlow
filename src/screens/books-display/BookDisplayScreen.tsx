import {ScrollView, TouchableOpacity, View, Text, Image, ActivityIndicator} from 'react-native';
import {bookDisplayScreenStyles} from "./BookDisplayScreen.styles";
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { fetchAllBooks } from "../../api/FetchAllBooks";
import {getIcon} from "../../utils/IconParser";
import { useBooks, Book } from '../../context/BooksContext';
import { RootStackParamList } from '../../navigation/RootNavigator';

export default function BookDisplayScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'BookDisplay'>>();
    const navigation = useNavigation<any>();
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
                if (!foundBook) {
                    setError('Book not found');
                    return;
                }

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
        return <View style={bookDisplayScreenStyles.container}><ActivityIndicator size="large" color="#2563EB" /></View>;
    }
    if (error || !book) {
        return <View style={bookDisplayScreenStyles.container}><Text>Error loading book: {error}</Text></View>;
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

    const handleRateBook = () => {
        if (book) {
            navigation.navigate('RateBook', { book });
        }
    };

    return (
        <View style={bookDisplayScreenStyles.container}>
            <TouchableOpacity
                style={bookDisplayScreenStyles.closeButton}
                onPress={() => navigation.goBack()}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Text style={bookDisplayScreenStyles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <View style={bookDisplayScreenStyles.bookCoverContainer}>
                <Image
                    source={{ uri: book.cover }}
                    style={bookDisplayScreenStyles.bookCover}
                    resizeMode="cover"
                />
            </View>

            <View style={bookDisplayScreenStyles.bookTitleAuthor}>
                <Text style={bookDisplayScreenStyles.bookTitle}>{book.title}</Text>
                <Text style={bookDisplayScreenStyles.bookAuthor}>{book.author}</Text>
            </View>

            <View style={bookDisplayScreenStyles.bookStats}>
                <View style={bookDisplayScreenStyles.bookStatItem}>
                    <Text style={bookDisplayScreenStyles.bookStatValue}>
                        {book.pageCount ?? '—'}
                    </Text>
                    <Text style={bookDisplayScreenStyles.bookStatLabel}>Pages</Text>
                </View>
                <View style={bookDisplayScreenStyles.bookStatDivider} />
                <View style={bookDisplayScreenStyles.bookStatItem}>
                    <Text style={bookDisplayScreenStyles.bookStatValue}>
                        {book.language?.toUpperCase() ?? '—'}
                    </Text>
                    <Text style={bookDisplayScreenStyles.bookStatLabel}>Lang</Text>
                </View>
            </View>

            <ScrollView persistentScrollbar={true} style={bookDisplayScreenStyles.bookDescription}>
                <Text style={bookDisplayScreenStyles.bookDescriptionText}>{book.description || 'No description available.'}</Text>
            </ScrollView>

            <View style={bookDisplayScreenStyles.bookActions}>
                <View style={bookDisplayScreenStyles.topRow}>
                    <TouchableOpacity style={bookDisplayScreenStyles.addToLibButton} onPress={handleAddToLibrary}>
                        <Image source={addToLibIcon} style={{width: 28, height: 28}} />
                    </TouchableOpacity>
                </View>

                <View style={bookDisplayScreenStyles.actionRow}>
                    <TouchableOpacity style={bookDisplayScreenStyles.startReadButton} onPress={handleStartReading}>
                        <Text style={bookDisplayScreenStyles.actionButtonText}>Start Reading</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={bookDisplayScreenStyles.rateButton} onPress={handleRateBook}>
                        <Text style={bookDisplayScreenStyles.rateButtonText}>Rate</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}
