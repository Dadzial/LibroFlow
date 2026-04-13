import {StyleSheet, View, TextInput,Image} from 'react-native';
import {getColor} from "../../utils/ColorsParser";
import {getIcon} from "../../utils/IconParser";

interface SearchBarProps {
    searchText: string;
    onSearch: (text: string) => void;
}

export default function SearchBar({ searchText, onSearch }: SearchBarProps) {
    return (
        <View style={styles.searchBarContainer}>
            <Image source={getIcon('seeIcon')} style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder="What do you want to read ..."
                placeholderTextColor={getColor('scrollbarColor')}
                value={searchText}
                onChangeText={onSearch}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        height: 45,
        alignItems: 'center',
        backgroundColor: getColor('secondColor'),
        borderRadius: 20,
        marginHorizontal: 15,
        paddingHorizontal: 10,
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
        color: getColor('textPrimaryColor'),
    },
})