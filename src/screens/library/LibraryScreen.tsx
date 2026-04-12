import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { libraryStyles } from "./LibraryScreen.styles";
import AllBooks from "../../components/library/AllBooks";
import BookPreview from "../../components/library/BookPreview";

export default function LibraryScreen() {
    return (
        <View style={libraryStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={libraryStyles.sectionHeader}>
                    <Text style={libraryStyles.sectionTitle}>Favorites</Text>
                    <TouchableOpacity onPress={() => console.log('Favorites - View all')}>
                        <Text style={libraryStyles.viewAll}>View all</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={libraryStyles.horizontalList}
                    style={libraryStyles.favoritesList}
                >
                    <BookPreview />
                    <BookPreview />
                    <BookPreview />
                    <BookPreview />
                    <BookPreview />
                </ScrollView>

                <View style={libraryStyles.sectionHeader}>
                    <Text style={libraryStyles.sectionTitle}>All Books</Text>
                    <TouchableOpacity onPress={() => console.log('All Books - View all')}>
                        <Text style={libraryStyles.viewAll}>View all</Text>
                    </TouchableOpacity>
                </View>

                <View style={libraryStyles.section}>
                    <AllBooks />
                </View>

            </ScrollView>
        </View>
    );
}