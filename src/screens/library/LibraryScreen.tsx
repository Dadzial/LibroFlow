import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {libraryStyles} from "./LibraryScreen.styles";

export default function LibraryScreen() {
    return (
        <View style={libraryStyles.container}>
            <Text>This is library!</Text>
            <StatusBar style="auto" />
        </View>
    );
}
