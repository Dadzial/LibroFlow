import { Text, View } from 'react-native';
import {searchStyles} from "./SearchScreen.styles";
import SearchBar from "../../components/search/SearchBar"
import QuickFilters from "../../components/search/QuickFilters";
import NewBooks from "../../components/search/NewBooks";
import AllBooks from "../../components/search/AllBooks";
import {useState} from "react";


const MAIN_CATEGORIES = [
    'Fantasy',
    'Sci-Fi',
    'Classics',
    'Mystery',
    'Criminal',
    'Horror',
    'Romance',
    'Historical',
];

export default function SearchScreen() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchText, setSearchText] = useState('');

    return (
        <View style={searchStyles.mainContainer}>
            <View style={searchStyles.screenTitleContainer}>
                <Text style={searchStyles.screenTitle}>Search</Text>
            </View>
            <View style={searchStyles.searchBarContainer}>
                <SearchBar searchText={searchText} onSearch={setSearchText} />
            </View>
            <View style={searchStyles.quickFiltersContainer}>
                <QuickFilters
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    categories={MAIN_CATEGORIES}
                />
            </View>
            
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                <View style={searchStyles.newBooksContainer}>
                    <NewBooks activeCategory={activeCategory} searchText={searchText} />
                </View>
                <View style={searchStyles.allBooksContainer}>
                    <AllBooks activeCategory={activeCategory} searchText={searchText} />
                </View>
            </View>
        </View>
    );
}
