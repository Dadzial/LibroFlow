import { Text, View } from 'react-native';
import {searchStyles} from "./SearchScreen.styles";
import SearchBar from "../../components/search/SearchBar"
import QuickFilters from "../../components/search/QuickFilters";
import NewBooks from "../../components/search/NewBooks";
import AllBooks from "../../components/search/AllBooks";
import {useState} from "react";
import { useTheme } from '../../context/ThemeContext';


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
    const [activeCategories, setActiveCategories] = useState<string[]>([]);
    const [searchText, setSearchText] = useState('');
    const { themeColors } = useTheme();

    return (
        <View style={[searchStyles.mainContainer, { backgroundColor: themeColors.primaryColor }]}>
            <View style={searchStyles.screenTitleContainer}>
                <Text style={[searchStyles.screenTitle, { color: themeColors.textPrimaryColor }]}>Search</Text>
            </View>
            <View style={searchStyles.searchBarContainer}>
                <SearchBar searchText={searchText} onSearch={setSearchText} />
            </View>
            <View style={searchStyles.quickFiltersContainer}>
                <QuickFilters
                    activeCategories={activeCategories}
                    onCategoriesChange={setActiveCategories}
                    categories={MAIN_CATEGORIES}
                />
            </View>

            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                <View style={searchStyles.newBooksContainer}>
                    <NewBooks
                        activeCategories={activeCategories}
                        searchText={searchText}
                    />
                </View>
                <View style={searchStyles.allBooksContainer}>
                    <AllBooks
                        activeCategories={activeCategories}
                        searchText={searchText}
                    />
                </View>
            </View>
        </View>
    );
}
