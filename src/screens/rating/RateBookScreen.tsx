import { useEffect, useMemo, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useBooks } from '../../context/BooksContext';
import { rateBookScreenStyles } from './RateBookScreenStyles';

export default function RateBookScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'RateBook'>>();
    const navigation = useNavigation<any>();
    const { book } = route.params;
    const booksContext = useBooks() as any;
    const { getBookReview, saveBookReview, clearBookReview } = booksContext;

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
        saveBookReview(book, selectedRating, note.trim());
        navigation.goBack();
    };

    const handleClearRating = () => {
        clearBookReview(book.id);
        setSelectedRating(0);
        setNote('');
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <View style={rateBookScreenStyles.container}>
                <View style={[rateBookScreenStyles.card, { flexDirection: 'column', flex: 1 }]}>
                    <Image source={{ uri: book.cover }} style={rateBookScreenStyles.cover} resizeMode="cover" />

                    <Text style={rateBookScreenStyles.title}>{book.title}</Text>
                    <Text style={rateBookScreenStyles.author}>{book.author}</Text>

                    <Text style={rateBookScreenStyles.sectionLabel}>Rate this book</Text>
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
                                        color={filled ? '#F59E0B' : '#B6B6B6'}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <Text style={rateBookScreenStyles.ratingText}>
                        {selectedRating ? `${selectedRating}/5` : 'Tap a star to rate'}
                    </Text>

                    <Text style={rateBookScreenStyles.noteLabel}>Notes</Text>
                    <ScrollView
                        style={(rateBookScreenStyles as any).notesScrollContainer}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                    >
                        <TextInput
                            value={note}
                            onChangeText={setNote}
                            placeholder="What did you like or dislike?"
                            placeholderTextColor="#9CA3AF"
                            multiline
                            textAlignVertical="top"
                            editable
                            style={rateBookScreenStyles.noteInput}
                        />
                    </ScrollView>

                    <TouchableOpacity
                        style={[rateBookScreenStyles.saveButton, !selectedRating && rateBookScreenStyles.saveButtonDisabled]}
                        onPress={handleSave}
                        disabled={!selectedRating}
                    >
                        <Text style={rateBookScreenStyles.saveButtonText}>Save rating</Text>
                    </TouchableOpacity>

                    <View style={(rateBookScreenStyles as any).buttonRow}>
                        <TouchableOpacity
                            style={(rateBookScreenStyles as any).secondaryButtonInline}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={rateBookScreenStyles.secondaryButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={(rateBookScreenStyles as any).clearButtonInline}
                            onPress={handleClearRating}
                        >
                            <Text style={(rateBookScreenStyles as any).clearButtonText}>Clear</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

