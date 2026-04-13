import {ScrollView, TouchableOpacity, View, Text, Image, ActivityIndicator} from 'react-native';
import {bookDisplayScreenStyles} from "./BookDisplayScreen.styles";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { fetchAllBooks } from "../../api/FetchAllBooks";
import {getIcon} from "../../utils/IconParser";

export default function BookDisplayScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { bookId } = route.params as { bookId: string };
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const addToLibIcon = getIcon('addTolibIcon');

    useEffect(() => {
        const loadBook = async () => {
            try {
                const allBooks = await fetchAllBooks('none');
                const foundBook = allBooks.find((b) => b.googleId === bookId || b.title === bookId);
                if (!foundBook) throw new Error('Book not found');
                setBook(foundBook);
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

    return (
        <View style={bookDisplayScreenStyles.container}>
            {/* X close button */}
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
                <TouchableOpacity style={bookDisplayScreenStyles.startReadButton} onPress={() => {}}>
                    <Text style={bookDisplayScreenStyles.actionButtonText}>Start Reading</Text>
                </TouchableOpacity>
                <TouchableOpacity style={bookDisplayScreenStyles.addToLibButton} onPress={() => {}}>
                    <Image source={addToLibIcon} style={{width: 28, height: 28}} />
                </TouchableOpacity>
            </View>

        </View>
    );
}
