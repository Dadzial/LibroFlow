import React, { useEffect, useRef, useState } from 'react';
import {Animated, ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getColor} from "../../utils/ColorsParser";
import {fetchAllBooks} from "../../api/FetchAllBooks";
import {RootStackParamList} from "../../navigation/RootNavigator";
import {StackNavigationProp} from "@react-navigation/stack";

type NewBook = {
    googleId?: string;
    cover:string,
    title:string,
    author:string,
    publishedDate: string,
    createdAt?: string;
    categories?:string[],
}

type AllBooksProps = {
    activeCategory:string | null
    searchText:string
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 50 - 30) / 3;

export default function NewBooks({activeCategory, searchText}: AllBooksProps) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'BookDisplay'>>();
    const [newBooks, setNewBooks] = useState<NewBook[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const fetchedBooks: any[] = await fetchAllBooks('none');

                const twoMonthsAgo = new Date();
                twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 36);

                const recentBooks = fetchedBooks.filter((book) => {

                    const dateToCheck = book.publishedDate ? book.publishedDate : book.createdAt;

                    if (!dateToCheck) return false;
                    const bookDate = new Date(dateToCheck);
                    return bookDate >= twoMonthsAgo;
                });

                setNewBooks(recentBooks);
            } catch (error) {
                console.error("Error in books load:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadBooks();
    }, []);

    const displayBooks = activeCategory
        ? newBooks.filter(book =>{
            if (!book.categories) return false;
            return book.categories.some(cat =>
                cat.toLowerCase().includes(activeCategory.toLowerCase())
            );
        })
        : newBooks

    const filteredBooks = displayBooks.filter(book =>
        book.title.toLowerCase().includes(searchText.toLowerCase()) ||
        book.author.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderBookItem = ({ item }: { item: NewBook }) => (
        <TouchableOpacity
            style={styles.bookCard}
            onPress={() => navigation.navigate('BookDisplay', { bookId: item.googleId || item.title })}
        >
            <Image
                source={{ uri: item.cover }}
                style={styles.bookCover}
                resizeMode="cover"
            />
            <Text style={styles.bookTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>New Books</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View all</Text>
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={getColor('primaryColor' as any)} />
                </View>
            ) : newBooks.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No new books</Text>
                </View>
            ) : (
                <View>
                    <Animated.FlatList
                        data={filteredBooks}
                        renderItem={renderBookItem}
                        keyExtractor={(item, index) => item.googleId ? item.googleId : index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        persistentScrollbar={true}
                        contentContainerStyle={styles.listContainer}
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
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        marginTop: 10,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        marginBottom: 5
    },
    headerTitle:{
        fontSize: 15,
        fontWeight: 'bold',
        color: getColor('textPrimaryColor' as any),
    },
    viewAll:{
        fontSize: 15,
        fontWeight: 'bold',
        color: getColor('accent' as any),
    },
    loaderContainer: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: getColor('secondColor' as any),
        borderRadius: 8,
        marginHorizontal: 4,
    },
    emptyText: {
        fontSize: 16,
        color: getColor('scrollbarColor' as any),
        fontWeight: '600',
    },
    listContainer: {
        paddingRight: 15,
    },
    bookCard: {
        width: CARD_WIDTH,
        marginRight: 15,
    },
    bookCover: {
        width: CARD_WIDTH,
        height: CARD_WIDTH * 1.6,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: getColor('secondColor' as any),
    },
    bookTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: getColor('textPrimaryColor' as any),
        marginBottom: 2,
    },
    bookAuthor: {
        fontSize: 12,
        marginBottom: 5,
        color: getColor('scrollbarColor' as any),
    },
    customScrollbarBg: {
        height: 3,
        width: '100%',
        backgroundColor: getColor('secondColor' as any),
        borderRadius: 10,
        alignSelf: 'center',
        overflow: 'hidden',
        marginTop: 0
    },
    customScrollbarIndicator: {
        height: '100%',
        width: 30,
        backgroundColor: getColor('scrollbarColor' as any),
        borderRadius: 10,
    }
});