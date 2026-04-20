import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import BookItem from './BookItem';
import { getColor } from "../../utils/ColorsParser";
import { Book } from '../../context/BooksContext';
import React, { useRef } from 'react';


interface BooksCarouselProps {
    books: Book[];
    onRemove?: (id: string | number) => void;
}

export default function BooksCarousel({ books, onRemove }: BooksCarouselProps) {
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Books to read</Text>
            </View>

            <Animated.FlatList
                data={books}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <BookItem book={item} onRemove={onRemove} />
                )}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            />

            <View style={styles.customScrollbarBg}>
                <Animated.View
                    style={[
                        styles.customScrollbarIndicator,
                        {
                            transform: [{
                                translateX: Animated.multiply(scrollX, 0.2)
                            }]
                        }
                    ]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 28,
        paddingHorizontal: 0,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: getColor('textPrimaryColor'),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    seeMore: {
        color: '#6A28B0',
        fontWeight: '600',
    },
    listContainer: {
        paddingRight: 15,
        paddingBottom: 10,
    },
    customScrollbarBg: {
        height: 3,
        width: '100%',
        backgroundColor: getColor('secondColor'),
        borderRadius: 10,        
        alignSelf: 'center',
        overflow: 'hidden',
        marginTop: 0
    },
    customScrollbarIndicator: {
        height: '100%',
        width: 30,                     
        backgroundColor: getColor('scrollbarColor'),
        borderRadius: 10,            
    }
});