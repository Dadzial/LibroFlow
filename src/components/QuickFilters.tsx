import {StyleSheet, View, FlatList,TouchableOpacity,Text} from 'react-native';
import {getColor} from "../utils/ColorsParser";
import {useState} from "react";

type Filter = {
    id: string;
    name: string;
}

const Filters: Filter[] = [
    { id: '1', name: 'Fantasy' },
    { id: '2', name: 'Sci-Fi' },
    { id: '3', name: 'Classics' },
    { id: '4', name: 'Mystery' },
    { id: '5', name: 'Criminal' },
    { id: '6', name: 'Horror' },
    { id: '7', name: 'Romance' },
    { id: '8', name: 'Historical' },
]

type QuickFiltersProps = {
    activeCategory: string | null;
    onCategoryChange: (category: string | null) => void;
}

export default function QuickFilters({activeCategory, onCategoryChange}: QuickFiltersProps) {

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
                data={Filters}
                keyExtractor={(item) => item.id}
                numColumns={4}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            activeCategory === item.name && styles.filterButtonActive
                        ]}
                        onPress={() => onCategoryChange(item.name)}
                    >
                        <Text style={[
                            styles.filterText,
                            activeCategory === item.name && styles.filterTextActive
                        ]}>
                            {item.name}
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