import {StyleSheet, View, TextInput,Image} from 'react-native';
import {getColor} from "../utils/ColorsParser";
import {useState} from "react";
import {getIcon} from "../utils/IconParser";

export default function SearchBar() {
    const [searchText, setSearchText] = useState('');

    return (
        <View style={styles.searchBarContainer}>
            <Image source={getIcon('seeIcon')} style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder="What do you want to read ..."
                placeholderTextColor={getColor('scrollbarColor')}
                value={searchText}
                onChangeText={setSearchText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        backgroundColor: getColor('secondColor'),
        borderRadius: 20,
        marginHorizontal: 15,
        paddingHorizontal: 12,
        elevation: 25,

    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
        resizeMode: 'contain',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: getColor('secondColor'),
    },
})