import { FlatList ,View, Text} from "react-native";
import { LibraryBookPreview } from "./BookPreview";
import { Book, useBooks } from "../../context/BooksContext";

export default function MyBooks() {
    const { libraryBooks, favoriteBooks, removeBookFromLibrary } = useBooks();

    const filteredBooks = libraryBooks.filter(
        book => !favoriteBooks.some(fav => fav.id === book.id)
    );

    if (filteredBooks.length === 0) {
        return (
            <View style={{ alignItems: 'center', width: '100%', padding: 20 }}>
                <Text style={{ color: 'gray' }}>No other books in your library.</Text>
            </View>
        );
    }

    return (
        <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <FlatList
                data={filteredBooks}
                numColumns={3}
                scrollEnabled={false}
                keyExtractor={(item: Book) => item.id.toString()}
                columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 15,
                    marginBottom: 25
                }}
                contentContainerStyle={{
                    paddingVertical: 10,
                }}
                renderItem={({ item }: { item: Book }) => (
                    <LibraryBookPreview
                        book={item}
                        onRemove={removeBookFromLibrary}
                        style={{ marginRight: 0 }}
                    />
                )}
            />
        </View>
    );
}
