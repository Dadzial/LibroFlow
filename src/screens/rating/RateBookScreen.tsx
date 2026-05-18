import { useEffect, useMemo, useState } from 'react';
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useBooks } from '../../context/BooksContext';
import { useTheme } from '../../context/ThemeContext';
import { rateBookScreenStyles } from './RateBookScreenStyles';

export default function RateBookScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'RateBook'>>();
    const navigation = useNavigation<any>();
    const { book } = route.params;
    const booksContext = useBooks() as any;
    const { getBookReview, saveBookReview, clearBookReview, libraryBooks, addBookToLibrary } = booksContext;
    const { themeColors, isDark } = useTheme();

    const existingReview = useMemo(() => getBookReview(book.id), [book.id, getBookReview]);

    const initialRating = useMemo(() => {
        return existingReview?.rating ?? book.rating ?? 0;
    }, [book.id, book.rating, existingReview]);

    const [selectedRating, setSelectedRating] = useState<number>(initialRating);
    const [note, setNote] = useState<string>(existingReview?.note ?? '');

    useEffect(() => {
        setSelectedRating(initialRating);
        setNote(existingReview?.note ?? '');
    }, [book.id, existingReview, initialRating]);

    const handleSave = () => {
        if (!selectedRating) return;

        // Check if book is in library
        const isBookInLibrary = libraryBooks.some((b: any) => b.id === book.id || b.title === book.title);

        if (!isBookInLibrary) {
            Alert.alert(
                'Add to library first',
                'You must add this book to your library before saving the rating.',
                [
                    {
                        text: 'Add to library',
                        onPress: () => {
                            addBookToLibrary(book);
                            saveBookReview(book, selectedRating, note.trim());
                            navigation.goBack();
                        }
                    },
                    {
                        text: 'Cancel',
                        onPress: () => {}
                    }
                ]
            );
        } else {
            saveBookReview(book, selectedRating, note.trim());
            navigation.goBack();
        }
    };

    const handleClearRating = () => {
        clearBookReview(book.id);
        setSelectedRating(0);
        setNote('');
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: themeColors.primaryColor }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={[rateBookScreenStyles.container, { backgroundColor: themeColors.primaryColor }]}>
                        <View style={[rateBookScreenStyles.card, { flexDirection: 'column', backgroundColor: themeColors.primaryColor }]}>
                            <Image source={{ uri: book.cover }} style={rateBookScreenStyles.cover} resizeMode="cover" />

                            <Text style={[rateBookScreenStyles.title, { color: themeColors.textPrimaryColor }]}>{book.title}</Text>
                            <Text style={[rateBookScreenStyles.author, { color: themeColors.textPrimaryColor, opacity: 0.7 }]}>{book.author}</Text>

                            <Text style={[rateBookScreenStyles.sectionLabel, { color: themeColors.textPrimaryColor }]}>Rate this book</Text>
                            <View style={rateBookScreenStyles.starsRow}>
                                {[1, 2, 3, 4, 5].map((value) => {
                                    const filled = selectedRating >= value;
                                    return (
                                        <TouchableOpacity
                                            key={value}
                                            onPress={() => setSelectedRating(value)}
                                            style={rateBookScreenStyles.starButton}
                                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                        >
                                            <Ionicons
                                                name={filled ? 'star' : 'star-outline'}
                                                size={34}
                                                color={filled ? '#F59E0B' : (isDark ? '#4B5563' : '#B6B6B6')}
                                            />
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            <Text style={[rateBookScreenStyles.ratingText, { color: themeColors.textPrimaryColor, opacity: 0.6 }]}>
                                {selectedRating ? `${selectedRating}/5` : 'Tap a star to rate'}
                            </Text>

                            <Text style={[rateBookScreenStyles.noteLabel, { color: themeColors.textPrimaryColor }]}>Notes</Text>
                            <ScrollView
                                style={[(rateBookScreenStyles as any).notesScrollContainer, { borderColor: themeColors.textPrimaryColor + '33', height: 150, maxHeight: 150 }]}
                                scrollEnabled={true}
                                nestedScrollEnabled={true}
                            >
                                <TextInput
                                    value={note}
                                    onChangeText={setNote}
                                    placeholder="What did you like or dislike?"
                                    placeholderTextColor={themeColors.textPrimaryColor + '66'}
                                    multiline
                                    textAlignVertical="top"
                                    editable
                                    style={[rateBookScreenStyles.noteInput, { backgroundColor: themeColors.secondColor, color: themeColors.textPrimaryColor, minHeight: 150 }]}
                                />
                            </ScrollView>

                            <TouchableOpacity
                                style={[rateBookScreenStyles.saveButton, { backgroundColor: themeColors.accent, marginTop: 10 }, !selectedRating && rateBookScreenStyles.saveButtonDisabled]}
                                onPress={handleSave}
                                disabled={!selectedRating}
                            >
                                <Text style={rateBookScreenStyles.saveButtonText}>Save rating</Text>
                            </TouchableOpacity>

                            <View style={(rateBookScreenStyles as any).buttonRow}>
                                <TouchableOpacity
                                    style={[(rateBookScreenStyles as any).secondaryButtonInline, { backgroundColor: themeColors.secondColor }]}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Text style={[rateBookScreenStyles.secondaryButtonText, { color: themeColors.textPrimaryColor }]}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[(rateBookScreenStyles as any).clearButtonInline, { backgroundColor: isDark ? '#7F1D1D' : '#FCA5A5' }]}
                                    onPress={handleClearRating}
                                >
                                    <Text style={[(rateBookScreenStyles as any).clearButtonText, { color: isDark ? '#FECACA' : '#991B1B' }]}>Clear</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
