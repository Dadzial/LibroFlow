import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {trashStyles} from "./TrashScreen.styles";

export default function TrashScreen() {
    return (
        <View style={trashStyles.container}>
            <Text>This is trash!</Text>
            <StatusBar style="auto" />
        </View>
    );
}
