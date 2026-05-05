import {StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, Animated, Dimensions} from 'react-native';
import {getColor} from "../../utils/ColorsParser";
import {fetchAllBooks} from "../../api/FetchAllBooks";
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigation/RootNavigator";
import { useTheme } from '../../context/ThemeContext';

type Book = {
    googleId?: string;
    cover:string,
    title:string,
    author:string,
    categories?:string[],
}

type AllBooksProps = {
    activeCategories: string[]
    searchText: string
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 50 - 30) / 3;

export default function AllBooks({activeCategories, searchText}: AllBooksProps) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'BookDisplay'>>();
    const { themeColors } = useTheme();
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [contentWidth, setContentWidth] = useState(1);
    const [listWidth, setListWidth] = useState(1);
    const [scrollbarWidth, setScrollbarWidth] = useState(1);
    const scrollX = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        const loadBooks = async () => {
            setIsLoading(true);
            try {
                const fetchedBooks: any[] = await fetchAllBooks('none', activeCategories);
                setBooks(fetchedBooks);
            } catch (error) {
                console.error("Error in books load:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadBooks();
    }, [activeCategories]);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchText.toLowerCase()) ||
        book.author.toLowerCase().includes(searchText.toLowerCase())
    );

    const indicatorWidth = Math.max(20, scrollbarWidth * (listWidth / Math.max(contentWidth, listWidth)));
    const translateX = scrollX.interpolate({
        inputRange: [0, Math.max(1, contentWidth - listWidth)],
        outputRange: [0, scrollbarWidth - indicatorWidth],
        extrapolate: 'clamp',
    });

    const renderBookItem = ({ item }: { item: Book }) => (
        <TouchableOpacity
            style={styles.bookCard}
            onPress={() => navigation.navigate('BookDisplay', { bookId: item.googleId || item.title })}
        >
            <Image
                source={{ uri: item.cover }}
                style={[styles.bookCover, { backgroundColor: themeColors.secondColor }]}
                resizeMode="cover"
            />
            <Text style={[styles.bookTitle, { color: themeColors.textPrimaryColor }]} numberOfLines={1}>{item.title}</Text>
            <Text style={[styles.bookAuthor, { color: themeColors.scrollbarColor }]} numberOfLines={1}>{item.author}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: themeColors.textPrimaryColor }]}>All Books</Text>
            </View>

            {isLoading ? (
                <View style={{ height: 180, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={themeColors.accent} />
                </View>
            ) : filteredBooks.length === 0 ? (
                <View style={{ height: 180, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: themeColors.textPrimaryColor, opacity: 0.6 }}>No books found</Text>
                </View>
            ) : (
                <View>
                    <Animated.FlatList
                        data={filteredBooks}
                        renderItem={renderBookItem}
                        keyExtractor={(item, index) => item.googleId ? item.googleId : index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                        onContentSizeChange={(w) => setContentWidth(w)}
                        onLayout={(e) => setListWidth(e.nativeEvent.layout.width)}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false }
                        )}
                        scrollEventThrottle={16}
                    />

                    <View 
                        style={[styles.customScrollbarBg, { backgroundColor: themeColors.secondColor }]}
                        onLayout={(e) => setScrollbarWidth(e.nativeEvent.layout.width)}
                    >
                        <Animated.View
                            style={[
                                styles.customScrollbarIndicator,
                                {
                                    width: indicatorWidth,
                                    transform: [{ translateX }],
                                    backgroundColor: themeColors.scrollbarColor
                                }
                            ]}
                        />
                    </View>
                </View>
            )}
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
        backgroundColor: getColor('scrollbarColor'),
        borderRadius: 10,            
    }
});