import { FlatList ,View, Text} from "react-native";
import { LibraryBookPreview } from "./BookPreview";
import { Book, useBooks } from "../../context/BooksContext";

export default function MyBooks() {
    const { libraryBooks, favoriteBooks, ratedBooks, removeBookFromLibrary } = useBooks() as any;

    const allBooks = Array.from(
        new Map(
            [
                ...libraryBooks,
                ...favoriteBooks.filter((fav: Book) => !libraryBooks.some((lib: Book) => lib.id === fav.id)),
                ...ratedBooks.filter((rated: Book) => !libraryBooks.some((lib: Book) => lib.id === rated.id) && !favoriteBooks.some((fav: Book) => fav.id === rated.id))
            ].map(book => [book.id, book])
        ).values()
    );

    if (allBooks.length === 0) {
        return (
            <View style={{ alignItems: 'center', width: '100%', padding: 20 }}>
                <Text style={{ color: 'gray' }}>No books in your library.</Text>
            </View>
        );
    }

    return (
        <View style={{ width: '100%' }}>
            <FlatList
                data={allBooks}
                numColumns={3}
                scrollEnabled={false}
                keyExtractor={(item: Book) => item.id.toString()}
                columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 15,
                    marginBottom: 25,
                    paddingHorizontal: 20,
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
