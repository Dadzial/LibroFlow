import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { randomStyles } from "./RandomScreen.styles";

import Dice from '../../components/random/Dice';
import BookPreview from '../../components/random/BookPreview';
import ActionButtons from '../../components/random/ActionButtons';
import { fetchAllBooks } from '../../api/FetchAllBooks';

export default function RandomScreen() {
    const [animateDice, setAnimateDice] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawnBook, setDrawnBook] = useState<any>(null);
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const fetchedBooks = await fetchAllBooks('none');
                setBooks(fetchedBooks);
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
                disabled={loading || !books.length}
            >
                <Text style={randomStyles.drawButtonText}>Draw your book</Text>
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
                <ActionButtons />
            </View>

        </View>
    );
}