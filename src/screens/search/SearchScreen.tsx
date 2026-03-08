import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {searchStyles} from "./SearchScreen.styles";

export default function SearchScreen() {
    return (
        <View style={searchStyles.container}>
            <Text>This is search!</Text>
        </View>
    );
}
