import React from 'react';
import {ScrollView, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { libraryStyles } from "./LibraryScreen.styles";
import MyBooks from "../../components/library/MyBooks";
import { LibraryBookPreview } from "../../components/library/BookPreview";
import { Book, useBooks } from "../../context/BooksContext";

const { width } = Dimensions.get('window');
const PADDING = 25;
const GAP = 15;
const CARD_WIDTH = (width - 2 * PADDING - 2 * GAP) / 3;

export default function LibraryScreen() {
    const { favoriteBooks } = useBooks();

    return (
        <View style={libraryStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={libraryStyles.sectionHeader}>
                    <Text style={libraryStyles.sectionTitle}>Favorites</Text>
                    <TouchableOpacity onPress={() => console.log('Favorites - View all')}>
                        <Text style={libraryStyles.viewAll}>View all</Text>
                    </TouchableOpacity>
                </View>

                {favoriteBooks.length > 0 ? (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[libraryStyles.horizontalList, { paddingHorizontal: 20 }]}
                        style={libraryStyles.favoritesList}
                    >
                        {favoriteBooks.map((item: Book, idx: number) => (
                            <LibraryBookPreview
                                key={item.id}
                                book={item}
                                style={{
                                    width: CARD_WIDTH,
                                    marginRight: idx !== favoriteBooks.length - 1 ? GAP : 0,
                                }}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                        <Text style={{ color: 'gray' }}>No favorite books yet.</Text>
                    </View>
                )}

                <View style={libraryStyles.sectionHeader}>
                    <Text style={libraryStyles.sectionTitle}>All Books</Text>
                    <TouchableOpacity onPress={() => console.log('All Books - View all')}>
                        <Text style={libraryStyles.viewAll}>View all</Text>
                    </TouchableOpacity>
                </View>

                <View style={libraryStyles.section}>
                    <MyBooks />
                </View>

            </ScrollView>
        </View>
    );
}
