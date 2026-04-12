import { View, Image, StyleSheet, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import { books } from '../../mock/books';

interface BookPreviewProps {
    isDrawing?: boolean;
    finalBook?: typeof books[0] | null;
}

export default function BookPreview({ isDrawing, finalBook }: BookPreviewProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isDrawing) {
            interval = setInterval(() => {
                setCurrentIndex(Math.floor(Math.random() * books.length));
            }, 100);
        } else if (finalBook) {
            const index = books.findIndex(b => b.id === finalBook.id);
            setCurrentIndex(index >= 0 ? index : 0);
        }
        return () => clearInterval(interval);
    }, [isDrawing, finalBook]);

    const displayIndex = currentIndex;
    const leftIndex = (currentIndex + 1) % books.length;
    const rightIndex = (currentIndex + 2) % books.length;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: books[leftIndex]?.cover }}
                style={[styles.book, styles.left]}
            />
            <Image
                source={{ uri: books[displayIndex]?.cover }}
                style={styles.center}
            />
            <Image
                source={{ uri: books[rightIndex]?.cover }}
                style={[styles.book, styles.right]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 10,
    },
    book: {
        width: 90,
        height: 130,
        borderRadius: 12,
    },
    center: {
        width: 120,
        height: 170,
        borderRadius: 14,
        marginHorizontal: 12,
    },
    left: {
        transform: [{ rotate: '-15deg' }],
    },
    right: {
        transform: [{ rotate: '15deg' }],
    },
});