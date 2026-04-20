import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { randomStyles } from "./RandomScreen.styles";

import Dice from '../../components/random/Dice';
import BookPreview from '../../components/random/BookPreview';
import ActionButtons from '../../components/random/ActionButtons';
import { fetchAllBooks } from '../../api/FetchAllBooks';
import { useBooks, Book } from '../../context/BooksContext';
import { useNavigation } from '@react-navigation/native';

export default function RandomScreen() {
    const navigation = useNavigation();
    const [animateDice, setAnimateDice] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawnBook, setDrawnBook] = useState<Book | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const { addBookToLibrary, setCurrentlyReadingBook } = useBooks();

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const fetchedBooks: any[] = await fetchAllBooks('none');
                
                const mappedBooks: Book[] = fetchedBooks.map(b => ({
                    id: b.googleId || b.title,
                    title: b.title,
                    author: b.author,
                    cover: b.cover,
                    pageCount: b.pageCount,
                    language: b.language,
                    description: b.description
                }));
                
                setBooks(mappedBooks);
            } catch (e) {
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, []);

    const handleDraw = () => {
        if (!books.length) return;
        setAnimateDice(true);
        setIsDrawing(true);
        setDrawnBook(null);
        setTimeout(() => {
            const randomlyPicked = books[Math.floor(Math.random() * books.length)];
            setDrawnBook(randomlyPicked);
            setAnimateDice(false);
            setIsDrawing(false);
        }, 1500);
    };

    const handleAddToLibrary = () => {
        if (drawnBook) {
            addBookToLibrary(drawnBook);
        }
    };

    const handleStartReading = () => {
        if (drawnBook) {
            setCurrentlyReadingBook(drawnBook);
            // @ts-ignore
            navigation.navigate('Main', { screen: 'Home' });
        }
    };

    return (
        <View style={randomStyles.container}>
            <View style={randomStyles.screenTitleContainer}>
                <Text style={randomStyles.screenTitle}>The Book Lottery</Text>
                <Text style={randomStyles.screenDescription}>
                    Can't decide what to read next? Let destiny choose your next grand adventure.
                </Text>
            </View>
            <View style={randomStyles.diceWrapper}>
                <Dice animate={animateDice} />
            </View>
            <TouchableOpacity
                style={randomStyles.drawButton}
                onPress={handleDraw}
                disabled={loading || !books.length || isDrawing}
            >
                <Text style={randomStyles.drawButtonText}>
                    {isDrawing ? "Choosing..." : "Draw your book"}
                </Text>
            </TouchableOpacity>
            <Text style={randomStyles.subText}>
                Ready for a surprise?
            </Text>
            <Text style={randomStyles.pickTitle}>
                {drawnBook ? drawnBook.title : "Your pick for today"}
            </Text>
            <View style={randomStyles.booksWrapper}>
                <BookPreview isDrawing={isDrawing} finalBook={drawnBook} books={books} />
            </View>
            <View style={randomStyles.actionsWrapper}>
                <ActionButtons 
                    onAddToLibrary={handleAddToLibrary} 
                    onStartReading={handleStartReading}
                    disabled={!drawnBook || isDrawing} 
                />
            </View>

        </View>
    );
}