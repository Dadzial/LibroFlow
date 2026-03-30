import { Text, View } from 'react-native';
import {searchStyles} from "./SearchScreen.styles";
import SearchBar from "../../components/SearchBar"
import QuickFilters from "../../components/QuickFilters";
import NewBooks from "../../components/NewBooks";
import AllBooks from "../../components/AllBooks";

export default function SearchScreen() {
    return (
        <View style={searchStyles.mainContainer}>
            <View style={searchStyles.screenTitleContainer}>
                <Text style={searchStyles.screenTitle}>Search</Text>
            </View>
            <View style={searchStyles.searchBarContainer}>
                <SearchBar />
            </View>
            <View style={searchStyles.quickFiltersContainer}>
                <QuickFilters />
            </View>
            <View style={searchStyles.newBooksContainer}>
                <NewBooks />
            </View>
            <View style={searchStyles.allBooksContainer}>
                <AllBooks />
            </View>
        </View>
    );
}
