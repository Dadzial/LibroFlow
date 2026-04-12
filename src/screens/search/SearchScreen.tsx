import { Text, View } from 'react-native';
import {searchStyles} from "./SearchScreen.styles";
import SearchBar from "../../components/search/SearchBar"
import QuickFilters from "../../components/search/QuickFilters";
import NewBooks from "../../components/search/NewBooks";
import AllBooks from "../../components/search/AllBooks";
import {useState} from "react";

export default function SearchScreen() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    return (
        <View style={searchStyles.mainContainer}>
            <View style={searchStyles.screenTitleContainer}>
                <Text style={searchStyles.screenTitle}>Search</Text>
            </View>
            <View style={searchStyles.searchBarContainer}>
                <SearchBar />
            </View>
            <View style={searchStyles.quickFiltersContainer}>
                <QuickFilters
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />
            </View>
            <View style={searchStyles.newBooksContainer}>
                <NewBooks activeCategory={activeCategory} />
            </View>
            <View style={searchStyles.allBooksContainer}>
                <AllBooks activeCategory={activeCategory} />
            </View>
        </View>
    );
}
