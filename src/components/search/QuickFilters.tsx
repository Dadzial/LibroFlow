import {StyleSheet, View, FlatList,TouchableOpacity,Text} from 'react-native';
import {getColor} from "../../utils/ColorsParser";
import { useTheme } from '../../context/ThemeContext';

type QuickFiltersProps = {
    activeCategories: string[];
    onCategoriesChange: (categories: string[]) => void;
    categories: string[];
}

export default function QuickFilters({activeCategories, onCategoriesChange, categories}: QuickFiltersProps) {
    const { themeColors } = useTheme();

    const handleClearFilters = () => {
        onCategoriesChange([]);
    }

    const toggleCategory = (category: string) => {
        if (activeCategories.includes(category)) {
            onCategoriesChange(activeCategories.filter(c => c !== category));
        } else {
            onCategoriesChange([...activeCategories, category]);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: themeColors.textPrimaryColor }]}>Quick Filters</Text>
                <TouchableOpacity onPress={handleClearFilters}>
                    <Text style={[styles.clearFilters, { color: themeColors.accent }]}>Clear Filters</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={categories}
                keyExtractor={(item) => item}
                numColumns={4}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            { backgroundColor: themeColors.secondColor },
                            activeCategories.includes(item) && { backgroundColor: themeColors.accent }
                        ]}
                        onPress={() => toggleCategory(item)}
                    >
                        <Text style={[
                            styles.filterText,
                            { color: themeColors.textPrimaryColor },
                            activeCategories.includes(item) && { color: themeColors.primaryColor }
                        ]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        marginBottom: 2
    },
    headerTitle:{
        fontSize: 15,
        fontWeight: 'bold',
    },
    clearFilters:{
        fontSize: 15,
        fontWeight: 'bold',
    },
    filterButton: {
        flex: 1,
        height: 35,
        margin: 3,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
})