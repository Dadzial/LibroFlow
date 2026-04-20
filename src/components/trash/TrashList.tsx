import {StyleSheet, Text, TouchableOpacity, View, Image, FlatList} from 'react-native';
import {getColor} from "../../utils/ColorsParser";
import {useBooks, Book} from "../../context/BooksContext";
import {getIcon} from "../../utils/IconParser";

export default function TrashList() {
    const { trashBooks, permanentDeleteFromTrash, clearTrash , restoreFromTrash } = useBooks();
    const trashIcon = getIcon('deleteIcon');
    const restoreIcon = getIcon('restoreIcon');

    const renderTrashItem = ({ item }: { item: Book }) => (
        <View style={styles.trashItem}>
            <Image source={{ uri: item.cover }} style={styles.cover} />
            <View style={styles.bookInfo}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.author}>{item.author}</Text>
            </View>
            <TouchableOpacity
                onPress={() => restoreFromTrash(item.id)}
                style={styles.restoreButton}
            >
                <Image source={restoreIcon} style={styles.restoreIcon} />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => permanentDeleteFromTrash(item.id)}
                style={styles.deleteButton}
            >
                <Image source={trashIcon} style={styles.deleteIcon} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{trashBooks.length} Items found</Text>
                {trashBooks.length > 0 && (
                    <TouchableOpacity onPress={clearTrash}>
                        <Text style={styles.cleanTrash}>Clean Trash</Text>
                    </TouchableOpacity>
                )}
            </View>
            
            <FlatList
                data={trashBooks}
                renderItem={renderTrashItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Trash is empty.</Text>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        marginBottom: 15
    },
    headerTitle:{
        fontSize: 15,
        fontWeight: '600',
        color: getColor('textPrimaryColor'),
    },
    cleanTrash:{
        fontSize: 15,
        fontWeight: 'bold',
        color: getColor('accentRed') || '#FF3B30',
    },
    listContent: {
        paddingBottom: 20,
    },
    trashItem:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: getColor('secondColor'),
        borderRadius: 12,
        padding: 10,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cover: {
        width: 50,
        height: 75,
        borderRadius: 6,
    },
    bookInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: getColor('textPrimaryColor'),
        marginBottom: 4,
    },
    author: {
        fontSize: 14,
        color: 'gray',
    },
    deleteButton: {
        padding: 10,
    },
    restoreButton:{
        padding: 10,
    },
    deleteIcon: {
        width: 20,
        height: 20,
        tintColor: getColor('accentRed') || '#FF3B30',
    },
    restoreIcon:{
        width: 20,
        height: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        color: 'gray',
        fontSize: 16,
    }
})
