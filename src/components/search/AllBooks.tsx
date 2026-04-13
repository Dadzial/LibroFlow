import {StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, Animated, Dimensions} from 'react-native';
import {getColor} from "../../utils/ColorsParser";
import {fetchAllBooks} from "../../api/FetchAllBooks";
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigation/RootNavigator";

type Book = {
    googleId?: string;
    cover:string,
    title:string,
    author:string,
    categories?:string[],
}

type AllBooksProps = {
    activeCategory:string | null
    searchText:string
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 50 - 30) / 3;

export default function AllBooks({activeCategory, searchText}: AllBooksProps) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'BookDisplay'>>();
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const scrollX = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        const loadBooks = async () => {
            try {
                const fetchedBooks = await fetchAllBooks('none');
                setBooks(fetchedBooks);
            } catch (error) {
                console.error("Error in books load:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadBooks();
    }, []);

    const displayBooks = activeCategory
        ? books.filter(book => {
            if (!book.categories) return false;
            return book.categories.some(cat =>
                cat.toLowerCase().includes(activeCategory.toLowerCase())
            );
        })
        : books;

    const filteredBooks = displayBooks.filter(book =>
        book.title.toLowerCase().includes(searchText.toLowerCase()) ||
        book.author.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderBookItem = ({ item }: { item: Book }) => (
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
                <Text style={styles.headerTitle}>All Books</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View all</Text>
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color={getColor('primaryColor' as any)} />
            ) : (
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
            )}
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
        paddingHorizontal: 25,
        marginTop: 5,
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
        color: getColor('textPrimaryColor'),
    },
    viewAll:{
        fontSize: 15,
        fontWeight: 'bold',
        color: getColor('accent'),
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
        backgroundColor: getColor('secondColor'),
    },
    bookTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: getColor('textPrimaryColor'),
        marginBottom: 2,
    },
    bookAuthor: {
        fontSize: 12,
        marginBottom: 5,
        color: getColor('scrollbarColor'),
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
