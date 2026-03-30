import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getColor} from "../utils/ColorsParser";

export default function TrashList() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>4 Items found</Text>
                <TouchableOpacity>
                    <Text style={styles.cleanTrash}>Clean Trash</Text>
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
        fontWeight: '600',
        color: getColor('textPrimaryColor'),
    },
    cleanTrash:{
        fontSize: 15,
        fontWeight: 'bold',
        color: getColor('accentRed'),
    },
})