import { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { randomStyles } from "./RandomScreen.styles";

import Dice from '../../components/random/Dice';
import BookPreview from '../../components/random/BookPreview';
import ActionButtons from '../../components/random/ActionButtons';
import { books } from '../../mock/books';

export default function RandomScreen() {

    const [animateDice, setAnimateDice] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawnBook, setDrawnBook] = useState<typeof books[0] | null>(null);

    const handleDraw = () => {
        console.log('Draw button pressed');

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
                <BookPreview isDrawing={isDrawing} finalBook={drawnBook} />
            </View>

            <View style={randomStyles.actionsWrapper}>
                <ActionButtons />
            </View>

        </View>
    );
}