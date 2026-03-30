import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {libraryStyles} from "./LibraryScreen.styles";


export default function LibraryScreen() {
    return (
        <View style={libraryStyles.container}>
            <View style={libraryStyles.screenTitleContainer}>
                <Text style={libraryStyles.screenTitle}>Library</Text>
            </View>
        </View>
    );
}
