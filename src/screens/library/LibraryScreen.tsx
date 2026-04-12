import {ScrollView, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { libraryStyles } from "./LibraryScreen.styles";
import AllBooks from "../../components/library/AllBooks";
import BookPreview from "../../components/library/BookPreview";

const { width } = Dimensions.get('window');
const PADDING = 25;
const GAP = 15;
const CARD_WIDTH = (width - 2 * PADDING - 2 * GAP) / 3;
const favorites = [1, 2, 3, 4, 5];

const getSideSpacer = (count: number) => {
    const totalBooksWidth = count * CARD_WIDTH + (count - 1) * GAP;
    return Math.max((width - totalBooksWidth) / 2, 0);
};

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
                    <View style={{ width: getSideSpacer(favorites.length) }} />
                    {favorites.map((item, idx) => (
                        <BookPreview
                            key={idx}
                            style={{
                                width: CARD_WIDTH,
                                marginRight: idx !== favorites.length - 1 ? GAP : 0,
                            }}
                        />
                    ))}
                    <View style={{ width: getSideSpacer(favorites.length) }} />
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