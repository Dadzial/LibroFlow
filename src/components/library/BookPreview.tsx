import React from "react";
import { View, Text, Image, ViewStyle, TouchableOpacity, StyleSheet } from "react-native";
import { Book, useBooks } from "../../context/BooksContext";
import { getIcon } from "../../utils/IconParser";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import { useTheme } from "../../context/ThemeContext";

export interface LibraryBookPreviewProps {
    style?: ViewStyle;
    book: Book;
    onRemove?: (id: string | number) => void;
}

export const LibraryBookPreview: React.FC<LibraryBookPreviewProps> = ({ style, book, onRemove }) => {
    const { toggleFavorite, favoriteBooks, toggleToRead, toReadBooks, getBookReview } = useBooks() as any;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const isFavorite = favoriteBooks.some((b: Book) => b.id === book.id);
    const isToRead = toReadBooks.some((b: Book) => b.id === book.id);
    const review = getBookReview(book.id);
    const deleteIcon = getIcon('deleteIcon');
    const heartIcon = getIcon('favIcon'); 
    const toReadIcon = getIcon('toReadIcon');

    if (!book) return null;

    const handleBookPress = () => {
        navigation.navigate('BookDisplay', { bookId: book.id.toString() });
    };

    return (
        <View style={[styles.container, style]}>
            <View>
                <TouchableOpacity activeOpacity={0.9} onPress={handleBookPress}>
                    <Image
                        source={{ uri: book.cover }}
                        style={styles.cover}
                    />
                </TouchableOpacity>
                <View style={styles.actionsContainer}>
                    {onRemove && (
                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: isDark ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)' }]}
                            onPress={() => onRemove(book.id)}
                        >
                            <Image source={deleteIcon} style={[styles.icon, { tintColor: isDark ? themeColors.accentRed : '#666' }]} />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            { backgroundColor: isDark ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)' },
                            isFavorite && styles.favoriteActive
                        ]}
                        onPress={() => toggleFavorite(book.id)}
                    >
                        <Image source={heartIcon} style={[styles.icon, {tintColor: isFavorite ? '#FFF' : (isDark ? '#BBB' : '#666')}]} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            { backgroundColor: isDark ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)' },
                            isToRead && styles.toReadActive
                        ]}
                        onPress={() => toggleToRead(book.id)}
                    >
                        <Image source={toReadIcon} style={[styles.icon, {tintColor: isToRead ? '#FFF' : (isDark ? '#BBB' : '#666')}]} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text numberOfLines={1} style={[styles.title, { color: themeColors.textPrimaryColor }]}>
                {book.title}
            </Text>
            <Text style={[styles.author, { color: themeColors.textPrimaryColor, opacity: 0.7 }]}>
                {book.author}
            </Text>
            {review && (
                <View style={styles.reviewContainer}>
                    <Text style={styles.reviewRating}>★ {review.rating}/5</Text>
                    {review.note ? (
                        <Text numberOfLines={2} style={styles.reviewNote}>
                            {review.note}
                        </Text>
                    ) : null}
                </View>
            )}
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        marginRight: 15,
    },
    cover: {
        width: 100,
        height: 150,
        borderRadius: 10,
    },
    title: {
        width: 100,
        marginTop: 5,
        fontWeight: '500',
    },
    author: {
        fontSize: 12,
        color: 'gray',
    },
    reviewContainer: {
        width: 100,
        marginTop: 4,
        gap: 2,
    },
    reviewRating: {
        fontSize: 12,
        fontWeight: '700',
        color: '#F59E0B',
    },
    reviewNote: {
        fontSize: 11,
        color: '#4B5563',
        lineHeight: 14,
    },
    actionsContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
        flexDirection: 'column',
        gap: 5,
    },
    actionButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    favoriteActive: {
        backgroundColor: '#EC4899', 
    },
    toReadActive: {
        backgroundColor: '#3B82F6', 
    },
    icon: {
        width: 18,
        height: 18,
    }
});
