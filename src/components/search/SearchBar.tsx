import {StyleSheet, View, TextInput, Image} from 'react-native';
import {getColor} from "../../utils/ColorsParser";
import {getIcon} from "../../utils/IconParser";
import { useTheme } from '../../context/ThemeContext';

interface SearchBarProps {
    searchText: string;
    onSearch: (text: string) => void;
}

export default function SearchBar({ searchText, onSearch }: SearchBarProps) {
    const { themeColors } = useTheme();
    return (
        <View style={[styles.searchBarContainer, { backgroundColor: themeColors.secondColor }]}>
            <Image source={getIcon('seeIcon')} style={[styles.icon, { tintColor: themeColors.textPrimaryColor }]} />
            <TextInput
                style={[styles.input, { color: themeColors.textPrimaryColor }]}
                placeholder="What do you want to read ..."
                placeholderTextColor={themeColors.scrollbarColor}
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
    },
})