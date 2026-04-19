import React from "react";
import { View, Text, Image, ViewStyle, TouchableOpacity, StyleSheet } from "react-native";
import { Book, useBooks } from "../../context/BooksContext";
import { getIcon } from "../../utils/IconParser";

export interface LibraryBookPreviewProps {
    style?: ViewStyle;
    book: Book;
    onRemove?: (id: string | number) => void;
}

export const LibraryBookPreview: React.FC<LibraryBookPreviewProps> = ({ style, book, onRemove }) => {
    const { toggleFavorite, favoriteBooks } = useBooks();
    const isFavorite = favoriteBooks.some((b: Book) => b.id === book.id);
    const deleteIcon = getIcon('deleteIcon');
    const heartIcon = getIcon('favIcon'); 

    if (!book) return null;

    return (
        <View style={[styles.container, style]}>
            <View>
                <Image
                    source={{ uri: book.cover }}
                    style={styles.cover}
                />
                <View style={styles.actionsContainer}>
                    {onRemove && (
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => onRemove(book.id)}
                        >
                            <Image source={deleteIcon} style={styles.icon} />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={[styles.actionButton, isFavorite && styles.favoriteActive]}
                        onPress={() => toggleFavorite(book.id)}
                    >
                        <Image source={heartIcon} style={[styles.icon, {tintColor: isFavorite ? '#FFF' : '#666'}]} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text numberOfLines={1} style={styles.title}>
                {book.title}
            </Text>
            <Text style={styles.author}>
                {book.author}
            </Text>
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
    icon: {
        width: 18,
        height: 18,
    }
});
