import {StyleSheet, View, FlatList,TouchableOpacity,Text} from 'react-native';
import {getColor} from "../../utils/ColorsParser";

type QuickFiltersProps = {
    activeCategory: string | null;
    onCategoryChange: (category: string | null) => void;
    categories: string[];
}

export default function QuickFilters({activeCategory, onCategoryChange, categories}: QuickFiltersProps) {
    const handleClearFilters = () => {
        onCategoryChange(null);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Quick Filters</Text>
                <TouchableOpacity onPress={handleClearFilters}>
                    <Text style={styles.clearFilters}>Clear Filters</Text>
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
                            activeCategory === item && styles.filterButtonActive
                        ]}
                        onPress={() => onCategoryChange(item)}
                    >
                        <Text style={[
                            styles.filterText,
                            activeCategory === item && styles.filterTextActive
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
        color: getColor('textPrimaryColor'),
    },
    clearFilters:{
        fontSize: 15,
        fontWeight: 'bold',
        color: getColor('accent'),
    },
    filterButton: {
        flex: 1,
        height: 35,
        margin: 3,
        borderRadius: 20,
        backgroundColor: getColor('secondColor'),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
    },
    filterButtonActive: {
        backgroundColor: getColor('accent'),
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: getColor('textPrimaryColor'),
        textAlign: 'center',
    },
    filterTextActive: {
        color: getColor('primaryColor'),
    },
})