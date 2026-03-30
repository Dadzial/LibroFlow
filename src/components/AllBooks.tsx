import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getColor} from "../utils/ColorsParser";

type Book = {
    cover:string,
    title:string,
    author:string,
}

const allBooks: Book[] = []

export default function AllBooks() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>All Books</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View all</Text>
                </TouchableOpacity>
            </View>
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
        marginBottom: 5
    },
    headerTitle:{
        fontSize: 15,
        fontWeight: 'bold',
        color: getColor('textPrimaryColor'),
    },
    viewAll:{
        fontSize: 15,
        fontWeight: 'bold',
        color: getColor('accent'),
    },
})